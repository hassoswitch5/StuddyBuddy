from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app, supports_credentials=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']
todos_collection = db.todos

def update_todoo(id):
    data = request.json
    completed = data.get('completed')

    result = todos_collection.update_one({'_id': ObjectId(id)}, {'$set': {'completed': completed}})
    if result.matched_count > 0:
        return jsonify({'message': 'Todo updated successfully'}), 200
    return jsonify({'error': 'Todo not found'}), 404