# Euclid
Version 1 of Euclid, a vector database with access to OpenAI GPT-4 and ADA-3-small access.

Euclid was started as a project to create a platform to allow businesses to be able to easily utilize generative AI using RAG.
Businesses need the ability to just upload their vast amounts of files(pdfs and docx) that relate to their enterprise knowledge and the
platform will easily break those documents into chanks, use OpenAI's ada-3-small model through their API and embedd those chunks and then add the data to our very own vector database. The platform allows the business to create a table (say Support) which will contain all the documents that relate to that table (say Support documents like guides).

The platform has a client front-end for end users to access the vector database and also upload custom pdfs. The client-side uses OpenAI's GPT-4 to create human-like text for the users.

#Folders
1. Core(python flask backend)
   contains .py files for the flask app
3. Euclid (front-end)
   contains react js code with use of antd for UX design.

#Deployment
1. set up the backend by installing the libraries: flask requests PyMuPDF python-docx langchain tiktoken chromadb openai==0.28.1 flask-cors scikit-learn beautifulsoup4.
2. upload all files in core to the backend and deploy flask app
3. from the euclid folder, take all the files in folder dist and upload them to your designate cpanel root directory.
4. deploy your cpanel app.
5. to access the client-side of the platform, use '{url}/'
6. to access the admin side which is used to upload folders then use '{url}/admin'
