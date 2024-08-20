from flask import Flask, jsonify, request
import pickle
from hotel_utils import methods
from hotel_utils import findMyHotel
from hotel_utils import findMyHotel3

app=Flask(__name__)

hotelModel=pickle.load(open("server_side/hotelModelPickle.pkl","rb"))


@app.post("/findHotel")
def findHotel():
    data=request.get_json()
    country=data['country']
    tags=data['tags']
    sortBy=data['sortBy']
    stars=data['stars']
    range=data['range']
    print(country,tags,sortBy,stars,range)
    result_df=findMyHotel(hotelModel,country,tags,sortBy,stars,range)
    print(len(result_df))
    return jsonify(result_df.to_dict(orient='records'))


@app.post("/findHotel3")
def findHotel3():
    data=request.get_json()
    country=data['country']
    sortBy=data['sortBy']
    stars=data['stars']
    range=data['range']
    description=data['description']
    print(data)
    result_df=findMyHotel3(hotelModel,country,sortBy,stars,range,description)
    return jsonify(result_df.to_dict(orient='records'))


@app.get("/status")
def status():
    return "Flask API Working"


@app.get("/methods")
def methodRoute():
    params=methods()
    return params


if __name__ == "__main__":
    app.run(debug=True,port=5000)