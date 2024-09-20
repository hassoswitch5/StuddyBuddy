from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
from bson.objectid import ObjectId
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']
users_collection = db.users
topics_collection = db.topic
tasks_collection = db.tasks
community_collection = db.community

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
    if topic:
        topics_collection.insert_one({'topic': topic})
        return jsonify({'message': 'Topic added successfully'}), 201
    return jsonify({'error': 'Topic is required'}), 400

@app.route('/topic/get', methods=['GET'])
def get_topic():
    tpc = topics_collection.find()
    topics_list = [{'topic': i['topic']}]
    for i in tpc:
        return jsonify(topics_list)
    
@app.route('/topic/<string:topic_name>', methods=['DELETE'])
def delete_topic(topic_name):
    result = topics_collection.delete_one({'topic': topic_name})
    if result.deleted_count > 0:
        return jsonify({'message': 'Topic deleted successfully'}), 200
    return jsonify({'error': 'Topic not found'}), 404

@app.route('/task/add', methods=['POST'])
def add_task():
    data = request.json
    task = data.get('task')
    tasks_collection.insert_one({'task':task})
    return jsonify({'Task added successfully'})

@app.route('/task/get', methods=['GET'])
def get_task():
    tsk = tasks_collection.find()
    tasks_list = [{'task': j['task']}]
    for j in tsk:
        return jsonify(tasks_list)

@app.route('/task/<string:id>', methods=['PUT'])
def update_task(id):
    data = request.json
    completed = data.get('completed')
    result = tasks_collection.update_one({'_id': ObjectId(id)}, {'$set': {'completed': completed}})
    if result.matched_count > 0:
        return jsonify({'message': 'Todo updated successfully'}), 200
    return jsonify({'error': 'Todo not found'}), 404

@app.route('/task/delete', methods=['DELETE'])
def delete_task():
    tasks_collection.delete_one()
    return jsonify("Task deleted")

@app.route('/community/get', methods=['GET'])
def get_posts():
    topic = request.args.get('topic')
    if topic:
        posts = community_collection.find({'topic': topic})
    else:
        posts = community_collection.find()
    
    posts_list = []
    for post in posts:
        post['_id'] = str(post['_id'])
        posts_list.append(post)

    return jsonify(posts_list)

@app.route('/community/create', methods=['POST'])
def create_post():
    data = request.json
    file = data.get('file')
    text = data.get('text')
    topic= data.get('topic')
    if not file or not text or not topic:
        return jsonify({'error': 'file, text, topic and are required'}), 400
    
    community_collection.insert_one({'file': file, 'text': text, 'topic':topic})
    return jsonify('Post created successfully')

@app.route('/community/delete', methods=['DELETE'])
def delete_post():
    community_collection.delete_one()
    return jsonify("post deleted")

@app.route('/comments/<string:id>/reply', methods=['POST'])
def add_reply(id):
    data = request.json
    reply_text = data.get('text')

    if not reply_text:
        return jsonify({'error': 'Reply text is required'}), 400

    result = community_collection.update_one(
        {'_id': ObjectId(id)},
        {'$push': {'replies': {'text': reply_text}}}
    )
    if result.matched_count > 0:
        return jsonify({'message': 'Reply added successfully'}), 201
    return jsonify({'error': 'Comment not found'}), 404

@app.route('/uploads/<filename>', methods=['GET'])
def get_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/studyingtechnique/get', methods=['POST'])
def studying_technique():
    response = list(request.json)
    A = response.count("A")
    B = response.count("B")
    C=response.count("C")


    
    if A>=3:
        return jsonify("your studying technique is sq3r"), 200
    elif B>=3:
        return jsonify("your studying technique is retrieval practice"), 200
    elif C>=3:
        return jsonify("your studying technique is spaced practice"), 200
    elif A==2 and B==2:
        return jsonify("your studying techniques are sq3r and retrieval practice"), 200
    elif C==2 and B==2:
        return jsonify("your studying techniques are retrieval and spaced practice"), 200
    elif A==2 and C==2:
        return jsonify("your studying techniques are sq3r and spaced practice"), 200
    else:
        return jsonify("your studying technique is sq3r"), 200
    
if __name__ == '__main__':
    app.run(debug=True)
