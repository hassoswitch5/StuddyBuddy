from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']
comments_collection = db.comments

def get_commentss(topic):
    comments = list(comments_collection.find({"topic": topic}))
    for comment in comments:
        comment["_id"] = str(comment["_id"])  # Convert ObjectId to string
        if 'file' in comment and comment['file']:
            comment['file'] = f"http://localhost:5000/uploads/{os.path.basename(comment['file'])}"  # Add file URL
    return jsonify(comments), 200
