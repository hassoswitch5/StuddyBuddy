from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.utils import secure_filename
import os
from bson.objectid import ObjectId

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

def post_replyy():
    data = request.form
    comment_id = data.get("commentId")
    text = data.get("text")
    file = request.files.get("file")

    reply = {
        "text": text,
        "file": None
    }

    if file:
        file_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
        file.save(file_path)
        reply["file"] = file_path

    comments_collection.update_one(
        {"_id": ObjectId(comment_id)},
        {"$push": {"replies": reply}}
    )
    return jsonify({"message": "Reply added!"}), 201