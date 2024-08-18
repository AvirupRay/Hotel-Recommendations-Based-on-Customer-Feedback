from flask import Flask, jsonify, request
import pickle
from hotel_utils import methods
from hotel_utils import findMyHotel

app=Flask(__name__)

hotelModel=pickle.load(open("hotelModelPickle.pkl","rb"))


@app.post("/findHotel")
def findHotel():
    data=request.get_json()
    country=data['country']
    tags=data['tags']
    sortBy=data['sortBy']
    stars=data['stars']
    print(country,tags,sortBy,stars)
    result_df=findMyHotel(hotelModel,country,tags,sortBy,stars)
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