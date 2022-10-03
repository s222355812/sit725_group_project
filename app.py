from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chat import get_response

app = Flask(__name__)
CORS(app)



@app.post("/predict")
def predict():
       text = request.get_json().get("message")
       response = get_response(text)

       # response.headers.add('Access-Control-Allow-Origin', '*')
       # response.headers.add('Access-Control-Allow-Credentials', 'true')
       # response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
       # response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

       message = {"answer": response}
       return jsonify(message)

if __name__ == "__main__":
        app.run(debug=True)