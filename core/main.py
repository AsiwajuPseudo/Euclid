#pip install flask requests PyMuPDF python-docx langchain tiktoken chromadb openai==0.28.1 flask-cors scikit-learn beautifulsoup4 --break-system-packages
from flask import Flask, request, render_template,send_file
import requests
import json
import random
import os
from flask_cors import CORS

#local libraries
from euclid import Euclid
from file import File
from tools import Tools
from database import Database
#from vision import Vision
from temp_file import create_dir,delete_dir, generate_tree, get_dir,process_path,move_files, deli_file, search_file

collections=Euclid()
database=Database()


app = Flask(__name__)
CORS(app)

#login to account
@app.route('/login', methods=['POST'])
def render1():
  data = request.get_json()
  email=data.get('email')
  password=data.get('password')
  log=database.login(email,password)
  return log

#admin login to account
@app.route('/adminlogin', methods=['POST'])
def adminlogin():
  data = request.get_json()
  email=data.get('email')
  password=data.get('password')
  key=data.get('key')
  if key=="0000admincenter0000":
    log=database.login(email,password)
    return log
  else:
    return {'status':'Account not authorized to be admin'}

@app.route('/register', methods=['POST'])
def render2():
  data = request.get_json()
  name=data.get('name')
  email=data.get('email')
  atype=data.get('type')
  code=data.get('code')
  password=data.get('password')
  phone=data.get('phone')
  add=database.add_user(name,email,phone,atype,code,password)
  return add

#view user profile
@app.route('/profile', methods=['GET'])
def view_profile():
  user_id=request.args.get('user_id')
  profile=database.user_profile(user_id)
  return profile

#change password
@app.route('/password', methods=['POST'])
def change_password():
  data = request.get_json()
  oldpassword=data.get('oldpassword')
  newpassword=data.get('newpassword')
  user_id=data.get('user_id')
  passwd=database.passchange(user_id,oldpassword,newpassword)
  return passwd

#Load all tables in the dataset
@app.route('/tables', methods=['GET'])
def tables():
  tables=collections.tables()
  table_data=[]
  tables_list=[]
  for col in tables:
  	tables_list.append(col.name)
  if len(tables_list)>0:
  	table_data=collections.search(tables_list[0],' ',15)
  return {"status":"success","tables":tables_list,"data":table_data}

#Load a table
@app.route('/view', methods=['GET'])
def view_table():
  table=request.args.get('table')
  table_data=collections.search(table,' ',15)
  return {"status":"success","data":table_data}

 #query a table
@app.route('/query', methods=['POST'])
def query_table():
  data = request.get_json()
  q=data.get('q')
  table=data.get('table')
  k=int(data.get('k'))
  res=collections.search(table,q,k)
  return {"status":"success","results":res}

#create a table
@app.route('/create', methods=['POST'])
def create_table():
  data = request.get_json()
  name=data.get('name')
  table=collections.create_table(name)
  crt=create_dir('./files/closed/'+name)

  return {"status":table}

#delete a table
@app.route('/delete_table', methods=['GET'])
def delete_table():
  name=request.args.get('table')
  deli=collections.delete_table(name)
  tables=collections.tables()
  deli=delete_dir('./files/open/'+name)
  deli=delete_dir('./files/closed/'+name)

  return {"status":deli}

#upload files
@app.route('/upload_files', methods=['POST'])
def upload_files():
  table = request.form.get('table')
  category = request.form.get('category')
  transcript=[]
  files = request.files.getlist('files')
  if len(files) == 0:
  	return {"status":"No file part"}
  uploaded_files = []
  # Create a temporary directory
  path="./files/open/"+table+"/"+category+"/"
  folder=create_dir(path)
  if folder['message']=='error':
  	return {"status":"Error creating folder"}
  # Save each file to the temporary directory
  for file in files:
  	if file.filename == '':
  	  continue
  	filename = os.path.join(path, file.filename)
  	file.save(filename)
  	uploaded_files.append(filename)
  #upload files
  return {"status":"success"}

#process and add data to table
@app.route('/add', methods=['GET'])
def add_files():
  #retrive open directories
  transcript=[]
  paths=get_dir('./files/open')
  for path in paths:
  	table,category=process_path(path['new'])
  	pointers={"category":category}
  	up=collections.add_folder(path['new']+'/',table,pointers)
  	transcript.extend(up)
  #now move files
  for path in paths:
    table,category=process_path(path['new'])
    move_files(path['normal'],'./files/closed/'+table)
    deli=delete_dir('./files/open/'+table)

  return {"trans":transcript}

#file tree
@app.route('/tree', methods=['GET'])
def view_tree():
  path="./files/closed/"
  nodes=generate_tree(path)
  tables=collections.tables()
  table_data=[]
  tables_list=[]
  for col in tables:
  	tables_list.append(col.name)

  return {"nodes":nodes,"tables":tables_list}

#view a file from directory
@app.route('/view_file', methods=['GET'])
def view_file():
  path=request.args.get('key')
  return send_file(path, as_attachment=False)

#delete a file from directory and table
@app.route('/delete_file', methods=['GET'])
def delete_file():
  path=request.args.get('key')
  table,name=deli_file(path)
  deli=collections.delete_file(table,name)
  return deli

#retrieve all models
@app.route('/models', methods=['GET'])
def view_models():
  user=request.args.get('user_id')
  models=database.models(user)
  tables=collections.tables()
  table_data=[]
  tables_list=[]
  for col in tables:
  	tables_list.append(col.name)

  return {"models":models,"tables":tables_list}

@app.route('/add_model', methods=['POST'])
def add_model():
  data = request.get_json()
  name=data.get('name')
  user=data.get('user_id')
  table_name=data.get('table')
  model=data.get('model')
  add=database.add_model(user,name,table_name,model)
  models=database.models(user)
  return {"status":add,"models":models}

#delete a model use
@app.route('/deli_model', methods=['GET'])
def deli_model():
  model=request.args.get('model_id')
  user=request.args.get('user_id')
  deli=database.deli_model(model)
  models=database.models(user)

  return models

#view a model
@app.route('/model', methods=['GET'])
def model():
  model=request.args.get('model_id')
  data=database.model(model)
  #if there is no such model in the database
  if data=={}:
  	return {"tool":"none","inputs":"none","outputs":"none"}
  #no eeror in database
  tools=Tools(collections)
  tool_data=tools.selector(data['tool'])

  return tool_data

#run a model
@app.route('/run', methods=['POST'])
def run_model():
  data = request.get_json()
  tool=data.get('tool')
  tools=Tools(collections)
  if tool=="assistant":
  	prompt=data.get('prompt')
  	size=data.get('size')
  	answer=tools.assistant(prompt,size)
  elif tool=="rag":
  	table=data.get('table')
  	prompt=data.get('prompt')
  	k=data.get('k')
  	size=data.get('size')
  	answer=tools.rag(table,prompt,k,size)
  elif tool=="web":
  	phrase=data.get('phrase')
  	size=data.get('size')
  	answer=tools.web_search(phrase,size)
  elif tool=="frag":
  	table=data.get('table')
  	prompt=data.get('prompt')
  	k=data.get('k')
  	size=data.get('size')
  	answer=tools.frag(table,prompt,k,size)
  else:
  	answer={"answer":"Unknown model"}

  return answer

#add a chat
@app.route('/add_chat', methods=['POST'])
def add_chat():
  data = request.get_json()
  name=data.get('name')
  user=data.get('user_id')
  add=database.add_chat(user,name)
  chats=database.chats(user)
  return {"status":add,"chats":chats}

#delete a chat
@app.route('/deli_chat', methods=['GET'])
def deli_chat():
  chat=request.args.get('chat_id')
  user=request.args.get('user_id')
  deli=database.deli_chat(chat)
  chats=database.chats(user)

  return {"status":deli,"chats":chats}

#retrieve all chats belonging to a user
@app.route('/chats', methods=['GET'])
def collect_chats():
  user=request.args.get('user_id')
  chats=database.chats(user)
  tables=collections.tables()
  table_data=[]
  tables_list=[]
  for col in tables:
    tables_list.append(col.name)

  return {"chats":chats,"tables":tables_list}

#retrieve all chats belonging to a user
@app.route('/messages', methods=['GET'])
def collect_messages():
  chat=request.args.get('chat_id')
  messages=database.messages(chat)
  path="./files/uploads/"+chat+"/"
  nodes=generate_tree(path)

  return {"messages":messages,"nodes":nodes}

#playground
@app.route('/play', methods=['POST'])
def run_playground():
  data = request.get_json()
  chat=data.get('chat_id')
  user=data.get('user_id')
  prompt=data.get('prompt')
  tool=data.get('tool')
  tools=Tools(collections)
  #check if there is a valid chat or its a new one
  if chat=='' or chat==None:
    i=str(random.randint(1000,9999))
    name="space_"+i
    add=database.add_chat(user,name)
    chat=add['chat']
  #execute
  if tool=="assistant":
    history=database.messages(chat)
    answer,sources=tools.assistant(prompt,4000,history)
  elif tool=="web":
    history=database.messages(chat)
    answer,sources=tools.web_search(prompt,4000,history)
  elif tool=="documents":
    #list all files from the directory
    history=database.messages(chat)
    files = os.listdir('./files/uploads/'+chat+'/')
    text=""
    for file in files:
      t=File()
      data={"document_name":file,"content":t.download('./files/uploads/'+chat+'/'+file)}
      text=text+str(data)
    #check if there was a document
    if text=="":
      return "Please upload a document to be able to use this tool",[]
    #generate answer if document is available
    answer=tools.extracter(prompt,4000,text,history)
    sources=files
  else:
    history=database.messages(chat)
    answer,sources=tools.rag(tool,prompt,history,3,4000)
  #add answer to database
  add=database.add_message(chat,user,str(answer),prompt)
  messages=database.messages(chat)
  chats=database.chats(user)

  return {"messages":messages,"documents":sources,"chats":chats,"current":chat}


#upload files for GPT
@app.route('/cloudupload', methods=['POST'])
def upload_files_gpt():
  chat = request.form.get('chat_id')
  transcript=[]
  files = request.files.getlist('files')
  if len(files) == 0:
    return {"status":"No file part"}
  # Create a temporary directory
  path="./files/uploads/"+chat+"/"
  folder=create_dir(path)
  if folder['message']=='error':
    return {"status":"Error creating folder"}
  # Save each file to the temporary directory
  for file in files:
    if file.filename == '':
      continue
    filename = os.path.join(path, file.filename)
    file.save(filename)
    name=file.filename
    '''
    if name.endswith('.pdf'):
      new_path="./files/pdf_images/"+chat+"/"
      folder=create_dir(new_path)
      t=File()
      t.pdf_to_images(name,path,new_path)
      vis=Vision()
      pages=vis.pdf_vision(name, new_path)
      print(pages)'''
  #upload files
  nodes=generate_tree(path)
  return {"status":"success",'nodes':nodes}

@app.route('/source', methods=['GET'])
def get_source():
  tool=request.args.get('tool')
  name=request.args.get('name')
  if tool=="assistant":
    return "Load html content"
  elif tool=="web":
    return {"url":name}
  elif tool=="documents":
    chat=request.args.get('chat_id')
    file="./files/uploads/"+chat+"/"+name
    return send_file(file, as_attachment=False)
  else:
    #search for the document
    file=search_file('./files/closed/'+tool+'/',name)
    if file:
      return send_file(file, as_attachment=False)
    else:
      return "File not found"


#show cloud tree
@app.route('/cloud_tree', methods=['GET'])
def cloud_tree():
  chat=request.args.get('chat_id')
  path="./files/uploads/"+chat+"/"
  nodes=generate_tree(path)

  return {"nodes":nodes}

#delete file from cloud
@app.route('/delete_cloud', methods=['GET'])
def delete_cloud_tree():
  chat=request.args.get('chat_id')
  file=request.args.get('name')
  path="./files/uploads/"+chat+"/"
  file_path=path+file
  os.remove(file_path)
  if file.endswith('.pdf'):
    dir_name=file.replace('.','-')
    new_path="./files/pdf_images/"+chat+"/"
    n=delete_dir(new_path+dir_name+'/')
  nodes=generate_tree(path)

  return {"nodes":nodes}

@app.route('/get_pdf')
def get_pdf():
    return send_file('path/to/your/pdf/file.pdf', as_attachment=False)

#view directories
@app.route('/dir', methods=['GET'])
def dir():
  content=get_dir('./files/')

  return content

#view directories
@app.route('/t_del', methods=['GET'])
def delete_database_table():
  table=request.args.get('table')
  deli=database.delete_table(table)

  return deli
