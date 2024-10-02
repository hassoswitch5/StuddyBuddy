from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, supports_credentials=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']
topics_collection = db.topics

def delete_topicc(topic_name):
    result = topics_collection.delete_one({'topic': topic_name})
    if result.deleted_count > 0:
        return jsonify({'message': 'Topic deleted successfully'}), 200
    return jsonify({'error': 'Topic not found'}), 404
