import requests
from bs4 import BeautifulSoup
import time
from selenium import webdriver


#Get all links from main site and save into list
def getlinks(s):
    for ahref in s:
        text = ahref.text
        text = text.strip() if text is not None else ""

        href = ahref.get('href')
    
        href = href.strip() if href is not None else ""
    
        links.append(href)
    print(links)

#paste all links into txt file
def linkpaste():
    with open('datafiles/links.txt', 'w') as file:
        for href in links:
            file.write(href+"\n")

#shove data into a list to be shoved into a datafile
def getDataInfo(link):
    data = requests.get(link)

    browser = webdriver.Chrome()
    browser.get(link)
    html = browser.page_source
    soup = BeautifulSoup(html, 'html.parser')

    s = soup.find_all("p")
    
    print(s)
    
    longstring = ''
    for txt in soup.find_all("p"):
        to_append = txt.get_text()
        longstring += to_append + " "

    to_train.append(link + " " + longstring)

        






links = []
to_train = []
data = requests.get("https://www.ucc.edu/")
soup = BeautifulSoup(data.content, 'html.parser')
s = soup.select('a')
getlinks(s)
linkpaste()

with open("datafiles/links.txt") as file:
    for link in file:
        if link.find('https' or 'http') != -1:
            print(link)
            try:
                getDataInfo(link)
            except:
                print("link error")

    with open("datafiles/data.txt", 'w') as f2:
        for d in to_train:
            try:
                f2.write(str(d)+"\n")   
            except:
                print("save error")








