Create a virtual environment when running bot on command prompt 

1. install python
2. clone repository
3. python3 -m venv venv
4. . venv/bin/activate

install dependencies 
*     (venv) pip install Flask torch torchvision nltk

install needed nltk packages 

* import nltk
* nltk.download('punkt')

train model if the intents.json file has been changed by adding new data

* python train.py

test the chatbot in the command line 

* python chat.py




