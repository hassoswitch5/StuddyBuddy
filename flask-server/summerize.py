from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
import google.generativeai as genai

app = Flask(__name__)
CORS(app, supports_credentials=True)


MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']

def summarize_textt():
    data = request.json
    text = data.get('text')
    if not text:
        return jsonify({'error': 'Text is required'}), 400
    model = genai.GenerativeModel("gemini-1.5-flash")
    try:
        response = model.generate_content(f"Summarize the following text: {text}")
        summary = response.text.strip()
        return jsonify({'summary': summary}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500