from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
CORS(app)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']
users_collection = db.users
community_collection=db.community
topics_collection=db.topic
tasks_collection=db.task

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(stored_password, provided_password):
    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password)

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

    return jsonify({'message': 'Login successful','name':user['name']}), 200

@app.route('/users/')
def get_user(name):
    return f'Hello, {name}!'

@app.route('/topic/add', methods=['POST'])
def add_topic():
    data = request.json
    topic = data.get('topic')
    topics_collection.insert_one({'topic':topic})
    return jsonify({'topic': topic})

@app.route('/topic/get', methods=['GET'])
def get_topic():
    tpc = topics_collection.find()
    topics_list = [{'topic': i['topic']}]
    for i in tpc:
        return jsonify(topics_list)

@app.route('/community/create', methods=['POST'])
def create_post():
    data = request.json
    nam = data.get('name')
    title = data.get('title')
    topic= data.get('topic')
    description = data.get('description')
    if not nam or not title or not description or not topic:
        return jsonify({'error': 'name, title, topic and description are required'}), 400
    
    community_collection.insert_one({'name': nam, 'title': title, 'description': description, 'topic':topic})
    return jsonify('Post created successfully')

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

@app.route('/community/delete', methods=['DELETE'])
def delete_post():
    community_collection.delete_one()
    return jsonify("post deleted")


@app.route('/task/add', methods=['POST'])
def add_task():
    data = request.json
    task = data.get('task')
    tasks_collection.insert_one({'task':task})
    return jsonify({'task': task})

@app.route('/task/get', methods=['GET'])
def get_task():
    tsk = tasks_collection.find()
    tasks_list = [{'task': j['task']}]
    for j in tsk:
        return jsonify(tasks_list)

@app.route('/task/delete', methods=['DELETE'])
def delete_task():
    tasks_collection.delete_one()
    return jsonify("Task deleted")

@app.route('/studyingtechnique/get', methods=['GET'])
def studying_technique():
    A = request.args.get('A')
    B = request.args.get('B')
    C = request.args.get('C')
    if A>=3:
        return ("your studying technique is sq3r")
    elif B>=3:
        return ("your studying technique is retrieval practice")
    elif C>=3:
        return ("your studying technique is spaced practice")
    elif A==2 and B==2:
        return ("your studying techniques are sq3r and retrieval practice")
    elif C==2 and B==2:
        return ("your studying techniques are retrieval and spaced practice")
    elif A==2 and C==2:
        return ("your studying techniques are sq3r and spaced practice")
    
if __name__ == '__main__':
    app.run(debug=True)
