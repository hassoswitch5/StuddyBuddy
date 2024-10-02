from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, supports_credentials=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']
topics_collection = db.topics

def add_topicc():
    data = request.json
    topic = data.get('topic')

    if not topic:
        return jsonify({'error': 'Topic is required'}), 400

    topics_collection.insert_one({'topic': topic})
    return jsonify({'message': 'Topic added successfully'}), 201