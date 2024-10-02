from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, supports_credentials=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']
topics_collection = db.topics

def get_topicc():
    topics = list(topics_collection.find({}, {'_id': 0, 'topic': 1}))
    return jsonify(topics), 200