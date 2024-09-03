from flask import Flask, jsonify, request
from flask_cors import CORS
import pickle
from hotel_utils import methods
from hotel_utils import findMyHotel4
from hotel_utils import hotelCountry
import os

app=Flask(__name__)
CORS(app)
path=os.path.dirname(__file__)

hotelModel=pickle.load(open(path+"/hotelModel2.pkl","rb"))

@app.post("/findHotel4")
def findHotel4():
    data=request.get_json()
    country=data['country']
    sortBy=data['sortBy']
    stars=data['stars']
    range=data['range']
    description=data['description']
    print(data)
    result_df=findMyHotel4(hotelModel,country,sortBy,stars,range,description)
    return jsonify(result_df.to_dict(orient='records'))


@app.post("/hotelCountry")
def hotelCountryRoute():
    data=request.get_json()
    country=data['country']
    print(data)
    resultDf=hotelCountry(hotelModel,country)
    return jsonify(resultDf.to_dict(orient='records'))


@app.get("/status")
def status():
    return "Flask API Working"


@app.get("/methods")
def methodRoute():
    params=methods()
    return params


if __name__ == "__main__":
    app.run(debug=True,port=5000)
