from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, supports_credentials=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']
todos_collection = db.todos

def add_todoo():
    data = request.json
    text = data.get('text')

    if not text:
        return jsonify({'error': 'Todo text is required'}), 400

    new_todo = {'text': text, 'completed': False}
    result = todos_collection.insert_one(new_todo)

    return jsonify({'message': 'Todo added successfully', '_id': str(result.inserted_id)}), 201
