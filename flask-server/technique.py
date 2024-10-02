from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, supports_credentials=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']

def studying_techniquee():
    response = list(request.json)
    A = response.count("A")
    B = response.count("B")
    C=response.count("C")

    if A>=3:
        return jsonify(["sq3r"]), 200
    elif B>=3:
        return jsonify(["retrieval"]), 200
    elif C>=3:
        return jsonify(["spaced"]), 200
    else:
        return jsonify(["sq3r"]), 200