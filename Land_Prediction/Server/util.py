import numpy as np
import json as js
import pickle
locations=None
columns=None

def get_location():
    load_locations()
    return locations

def load_locations():
    f = open("columns.json", "r")
    global columns
    global locations
    columns=js.load(f)['data_columns']
    locations=columns[3:]

def predict_price(loc,bhk,bath,sqft):
    load_locations()

    try:
        ind=columns.index(loc.lower())
    except:
        ind=-1
    f = open("projectmodel", "rb")
    model = pickle.load(f)
    x = np.zeros(len(columns))
    x[0]=sqft
    x[1]=bath
    x[2]=bhk
    if ind>=0:
        x[ind]=1
    return round(model.predict([x])[0],2)

