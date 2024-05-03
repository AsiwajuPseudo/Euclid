import chromadb
import os

from gpt import GPT
from file import File

class Euclid:
  def __init__(self):
    self.name="Euclid 1"
    self.handle=chromadb.PersistentClient(path="/euclid/")
    self.gpt=GPT()
    self.files=File()
    self.size=0

  #list all tables in the database
  def tables(self):
    li=self.handle.list_collections()

    return li

  #create a new table
  def create_table(self, name,metric="cosine"):
    try:
      table=self.handle.create_collection(name=name,metadata={"hnsw:space": metric})

      return "success"
    except Exception as e:

      return "Table already exist"
  
  #delete a table
  def delete_table(self,name):
    try:
      self.handle.delete_collection(name=name)
      return "success"
    except Exception as e:
      return "failed: "+str(e)
  
  #add document into table
  def add_document(self,table,pointers):
    vectors=self.files.process(pointers)
    if vectors=="error":
      return "Error loading file"
    #no error
    ids=[]
    values=[]
    metadata=[]
    for row in vectors:
      values.append(row['values'])
      metadata.append(row['metadata'])
      ids.append(row['id'])
      #end for
    #end for
    new_ids=[ids[i:i+10000] for i in range(0, len(ids), 10000)]
    new_values=[values[i:i+10000] for i in range(0, len(values), 10000)]
    new_metadata=[metadata[i:i+10000] for i in range(0, len(metadata), 10000)]
    try:
      size=len(new_ids)
      n=0
      table=self.handle.get_collection(table)
      while n<size:
        table.add(embeddings=new_values[n],metadatas=new_metadata[n],ids=new_ids[n])
        n=n+1

      return "success"
    except Exception as e:
      return "table does not exist: "+str(e)

  #insert documents from folder path
  def add_folder(self,folder_path,table,pointers):
    # Check if the folder path exists
    if not os.path.exists(folder_path):
      return "folder does not exist"
    contents = os.listdir(folder_path)
    # Filter out directories from the list of contents
    files = [item for item in contents if os.path.isfile(os.path.join(folder_path, item))]
    status=[]
    for item in files:
      meta=dict(pointers)
      file_name, file_extension = os.path.splitext(item)
      meta['name']=file_name
      meta['path']=folder_path+item
      add=self.add_document(table,meta)
      status.append({"file":item,"message":add})

    return status

  #delete a file from the table using the file name
  def delete_file(self,name,file_name):
    try:
      table=self.handle.get_collection(name)
      deli=table.delete(where={"name": file_name})
      return "success"
    except Exception as e:
      return "Error"+str(e)

  #search for top results
  def search(self,name,q,k=1):
    try:
      table=self.handle.get_collection(name)
      values=self.gpt.embedd_text(q)
      results=table.query(query_embeddings=[values],n_results=k)
      distances=results['distances'][0]
      metadata=results['metadatas'][0]
      if len(metadata)==0:
        return []
      res=[]
      seen_chunks = set()  # Keep track of encountered chunks
      n = 0
      while n < k:
        # Check if the chunk has already been seen, if so, skip it
        if metadata[n]['chunk_id'] not in seen_chunks:
          res.append({"score": 1-distances[n], "text": metadata[n]['text'], 'name': metadata[n]['name'],'category': metadata[n]['category'],'chunk': metadata[n]['chunk_id']})
          seen_chunks.add(metadata[n]['chunk_id'])  # Add the chunk to seen_chunks
        n = n + 1

      return sorted(res, key=lambda x: x["score"], reverse=True)
    except Exception as e:
      print("Error: "+ str(e))
      return []

  #load a full document
  def document(self,table,name):
    try:
      documents=self.handle.get_collection(table)
      results=documents.get(where={"name":name},include=["metadatas"])
      metadata=results['metadatas']
      res=[]
      seen_chunks = set()  # Keep track of encountered chunks
      n = 0
      for data in metadata:
        # Check if the chunk has already been seen, if so, skip it
        if data['chunk_id'] not in seen_chunks:
          res.append({"text": data['text'],'chunk': data['chunk_id']})
          seen_chunks.add(data['chunk_id'])

      result=sorted(res, key=lambda x: x["chunk"], reverse=False)
      text=""
      for item in result:
        text=text+item['text']

      return text
    except Exception as e:
      return "Failed: "+str(e)