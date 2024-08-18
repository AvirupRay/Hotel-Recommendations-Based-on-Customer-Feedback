from flask import Flask

app=Flask(__name__)

@app.get("/status")
def status():
    return "Flask API Working"

if __name__ == "__main__":
    app.run(debug=True,port=5000)