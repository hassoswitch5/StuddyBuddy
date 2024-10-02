from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, supports_credentials=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']
todos_collection = db.todos

def get_todoss():
    todos = list(todos_collection.find({}, {'_id': 1, 'text': 1, 'completed': 1}))
    for todo in todos:
        todo['_id'] = str(todo['_id'])  # Convert ObjectId to string
    return jsonify(todos), 200

