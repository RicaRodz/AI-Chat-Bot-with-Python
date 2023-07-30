# Electrabot

Ai Chat bot with Python.
This project is a conversational AI chatbot with web-scraping/summary features. 
Inside the backend folder is where the magic happens, all the ai logic and web-scraping is in there.

Built with:
 Python - AI logic  
 Flask - Backend  
 React - Frontend  
 Postgres - Database  

## Installation

### BACKEND FOLDER
 
Cd into the backend folder.  
cd backend  

Start by creating a virtual enviorment.  
python3 -m venv env   

Start the venv:  
source env/bin/activate or  . env/bin/activate  

Install all libreries:  
pip install beatifulsoup4 gensim flask requests torch torchvision nltk bs4  

Run this once in your terminal:  
$ python  
>>> import nltk  
>>> nltk.download('punkt')  

### FRONTEND FOLDER
 
Cd into the frontend folder.  
cd frontend  

Install all dependencies.  
npm i or npm install  

## Usage
 
After installing everything, cd into the backend and start the sever:  

(activate virtual enviorment first)  
source env/bin/activate or  . env/bin/activate  

run: 
python train.py <- ( Most run this everytime to train the bot. )  
python chat.py <- ( Runs in your terminal )  

python main.py <- ( Runs on localhost with React UI )  

## Contributing

Have a look at intents.json Define a new tag, possible patterns, and possible responses for the chat bot. You have to re-run the training whenever this file is modified.  

You can also look at the web_scraper.py and customize to your needs.  

## PICTURES 
