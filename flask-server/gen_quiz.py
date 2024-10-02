from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
import google.generativeai as genai

app = Flask(__name__)
CORS(app, supports_credentials=True)


MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']

API_KEY = 'AIzaSyDCobCTV0vpaH-YdDix4k5sWx0JWGNx-pI'  # Ensure you handle this securely in production
genai.configure(api_key=API_KEY)  # Corrected to use the API_KEY variable directly

def generate_quizz():
    data = request.json
    text = data.get('text')
    if not text:
        return jsonify({'error': 'Text is required'}), 400
    model = genai.GenerativeModel("gemini-1.5-flash")
    try:
        # Call the model to generate quiz content
        response = model.generate_content(f"Create a quiz based on the following text: {text}")
        # Check if the response contains text
        if response and hasattr(response, 'text'):
            questions = response.text.strip().split('\n')  # Adjust this based on the expected response format
            return jsonify(questions), 200
        else:
            return jsonify({'error': 'No questions generated'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500