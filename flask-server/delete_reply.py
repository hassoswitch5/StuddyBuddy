from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app, supports_credentials=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']
comments_collection = db.comments

def delete_replyy(comment_id, reply_index):
    result = comments_collection.update_one(
        {"_id": ObjectId(comment_id)},
        {"$pull": {"replies": {"index": int(reply_index)}}}
    )
    if result.modified_count:
        return jsonify({"message": "Reply deleted!"}), 200
    return jsonify({"message": "Reply not found!"}), 404
