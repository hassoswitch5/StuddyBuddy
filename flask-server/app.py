from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
from bson.objectid import ObjectId
import os
from werkzeug.utils import secure_filename
import re
import google.generativeai as genai

app = Flask(__name__)
CORS(app, supports_credentials=True)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']
users_collection = db.users
topics_collection = db.topics
todos_collection = db.todos
comments_collection = db.comments

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(stored_password, provided_password):
    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if not email or not password or not name:
        return jsonify({'error': 'Email, password, and name are required'}), 400

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):  # Validate email format
        return jsonify({'error': 'Please enter a valid email'}), 400

    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 400

    hashed_password = hash_password(password)
    users_collection.insert_one({'email': email, 'password': hashed_password, 'name': name})

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = users_collection.find_one({'email': email})
    if not user or not check_password(user['password'], password):
        return jsonify({'error': 'Invalid email or password'}), 401

    return jsonify({'message': 'Login successful', 'name': user['name']}), 200

@app.route('/topic/add', methods=['POST'])
def add_topic():
    data = request.json
    topic = data.get('topic')

    if not topic:
        return jsonify({'error': 'Topic is required'}), 400

    topics_collection.insert_one({'topic': topic})
    return jsonify({'message': 'Topic added successfully'}), 201

@app.route('/topic/<string:topic_name>', methods=['DELETE'])
def delete_topic(topic_name):
    result = topics_collection.delete_one({'topic': topic_name})
    if result.deleted_count > 0:
        return jsonify({'message': 'Topic deleted successfully'}), 200
    return jsonify({'error': 'Topic not found'}), 404

@app.route('/topics', methods=['GET'])
def get_topics():
    topics = list(topics_collection.find({}, {'_id': 0, 'topic': 1}))
    return jsonify(topics), 200

@app.route('/todos', methods=['GET'])
def get_todos():
    todos = list(todos_collection.find({}, {'_id': 1, 'text': 1, 'completed': 1}))
    for todo in todos:
        todo['_id'] = str(todo['_id'])
    return jsonify(todos), 200

@app.route('/todo', methods=['POST'])
def add_todo():
    data = request.json
    text = data.get('text')

    if not text:
        return jsonify({'error': 'Todo text is required'}), 400

    new_todo = {'text': text, 'completed': False}
    result = todos_collection.insert_one(new_todo)

    return jsonify({'message': 'Todo added successfully', '_id': str(result.inserted_id)}), 201

@app.route('/todo/<string:id>', methods=['DELETE'])
def delete_todo(id):
    result = todos_collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count > 0:
        return jsonify({'message': 'Todo deleted successfully'}), 200
    return jsonify({'error': 'Todo not found'}), 404

@app.route('/todo/<string:id>', methods=['PUT'])
def update_todo(id):
    data = request.json
    completed = data.get('completed')

    result = todos_collection.update_one({'_id': ObjectId(id)}, {'$set': {'completed': completed}})
    if result.matched_count > 0:
        return jsonify({'message': 'Todo updated successfully'}), 200
    return jsonify({'error': 'Todo not found'}), 404

@app.route('/comments/<string:topic>', methods=['GET'])
def get_comments(topic):
    comments = list(comments_collection.find({'topic': topic}))
    for comment in comments:
        comment['_id'] = str(comment['_id'])
    return jsonify(comments), 200

@app.route('/comments', methods=['POST'])
def add_comment():
    topic = request.form.get('topic')
    text = request.form.get('text', '')
    file = request.files.get('file')

    if not topic:
        return jsonify({'error': 'Topic is required'}), 400

    file_url = None
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        file_url = f"/uploads/{filename}"

    new_comment = {
        'topic': topic,
        'text': text,
        'file': file_url,
        'replies': []
    }

    result = comments_collection.insert_one(new_comment)
    return jsonify({'message': 'Comment added successfully', '_id': str(result.inserted_id)}), 201

@app.route('/comments/<string:id>', methods=['DELETE'])
def delete_comment(id):
    result = comments_collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count > 0:
        return jsonify({'message': 'Comment deleted successfully'}), 200
    return jsonify({'error': 'Comment not found'}), 404

@app.route('/comments/<string:id>/reply', methods=['POST'])
def add_reply(id):
    data = request.json
    reply_text = data.get('text')

    if not reply_text:
        return jsonify({'error': 'Reply text is required'}), 400

    result = comments_collection.update_one(
        {'_id': ObjectId(id)},
        {'$push': {'replies': {'text': reply_text}}}
    )
    if result.matched_count > 0:
        return jsonify({'message': 'Reply added successfully'}), 201
    return jsonify({'error': 'Comment not found'}), 404

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


API_KEY = 'AIzaSyDCobCTV0vpaH-YdDix4k5sWx0JWGNx-pI'  # Ensure you handle this securely in production
genai.configure(api_key=API_KEY)  # Corrected to use the API_KEY variable directly

@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
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

@app.route('/summarize-text', methods=['POST'])
def summarize_text():
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


@app.route('/generate-personalized-study-plan', methods=['POST'])
def generate_personalized_study_plan():
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

@app.route('/studyingtechnique/get', methods=['GET'])
def studying_technique():
    try:
        A = int(request.args.get('A', 0))
        B = int(request.args.get('B', 0))
        C = int(request.args.get('C', 0))
    except ValueError:
        return jsonify({'error': 'A, B, and C must be valid integers'}), 400

    # Compare values and return appropriate studying technique
    if A >= 3:
        return "your studying technique is SQ3R"
    elif B >= 3:
        return "your studying technique is retrieval practice"
    elif C >= 3:
        return "your studying technique is spaced practice"
    elif A == 2 and B == 2:
        return "your studying techniques are SQ3R and retrieval practice"
    elif C == 2 and B == 2:
        return "your studying techniques are retrieval and spaced practice"
    elif A == 2 and C == 2:
        return "your studying techniques are SQ3R and spaced practice"
    else:
        return "No dominant studying technique identified"


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
