from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
import google.generativeai as genai

app = Flask(__name__)
CORS(app, supports_credentials=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']

def generate_personalized_study_plann():
    data = request.json
    exam_dates = data.get('exam_dates')
    time_commitment = data.get('time_commitment')
    learning_style = data.get('learning_style')
    current_understanding = data.get('current_understanding')
    resources = data.get('resources')
    if not exam_dates or not time_commitment:
        return jsonify({'error': 'Exam dates and time commitment are required'}), 400
    # Generate the prompt for the AI model
    prompt = f"""
    Create a personalized study plan considering the following information:
    
    1. Exam dates: {exam_dates}.
    2. Time commitment: {time_commitment} per week/day.
    3. Learning style: {learning_style}.
    4. Current understanding of subjects: {current_understanding}.
    5. Available resources: {resources}.
    Prioritize Math and Physics, and focus on the user’s specific needs and challenging areas.
    """
    model = genai.GenerativeModel("gemini-1.5-flash")
    try:
        response = model.generate_content(prompt)
        if response and hasattr(response, 'text'):
            study_plan = response.text.strip()
            return jsonify({'study_plan': study_plan}), 200
        else:
            return jsonify({'error': 'No study plan generated'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500