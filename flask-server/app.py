from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
import google.generativeai as genai
from signup import signupp
from login import loginn
from add_topic import add_topicc
from delete_topic import delete_topicc
from get_topic import get_topicc
from get_task import get_todoss
from add_task import add_todoo
from delete_task import delete_todoo
from update_task import update_todoo
from get_comments import get_commentss
from post_comment import post_commentt
from delete_comment import delete_commentt
from post_reply import post_replyy
from delete_reply import delete_replyy
from upload import uploaded_filee
from gen_quiz import generate_quizz
from summerize import summarize_textt
from study_plan import generate_personalized_study_plann
from technique import studying_techniquee


app = Flask(__name__)
CORS(app, supports_credentials=True)

MONGO_URI = 'mongodb://localhost:27017'
client = MongoClient(MONGO_URI)
db = client['StudyBuddy']

@app.route('/signup', methods=['POST'])
def signup():
    return signupp()

@app.route('/login', methods=['POST'])
def login():
    return loginn()

@app.route('/topic/add', methods=['POST'])
def add_topic():
    return add_topicc()

@app.route('/topic/<string:topic_name>', methods=['DELETE'])
def delete_topic():
    return delete_topicc()

@app.route('/topics', methods=['GET'])
def get_topics():
    return get_topicc()

@app.route('/todos', methods=['GET'])
def get_todos():
    return get_todoss()

@app.route('/todo', methods=['POST'])
def add_todo():
    return add_todoo()

@app.route('/todo/<string:id>', methods=['DELETE'])
def delete_todo():
    return delete_todoo()

@app.route('/todo/<string:id>', methods=['PUT'])
def update_todo():
    return update_todoo()

@app.route('/comments/<topic>', methods=['GET'])
def get_comments():
    return get_commentss()

@app.route('/comments', methods=['POST'])
def post_comment():
    return post_commentt()

@app.route('/comments/<id>', methods=['DELETE'])
def delete_comment():
    return delete_commentt()

@app.route('/comments/reply', methods=['POST'])
def post_reply():
    return post_replyy()

@app.route('/comments/reply/<comment_id>/<reply_index>', methods=['DELETE'])
def delete_reply():
    return delete_replyy()

@app.route('/uploads/<filename>', methods=['GET'])
def uploaded_file():
    return uploaded_filee()

API_KEY = 'AIzaSyDCobCTV0vpaH-YdDix4k5sWx0JWGNx-pI'  # Ensure you handle this securely in production
genai.configure(api_key=API_KEY)  # Corrected to use the API_KEY variable directly

@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    return generate_quizz()

@app.route('/summarize-text', methods=['POST'])
def summarize_text():
    return summarize_textt()

@app.route('/generate-personalized-study-plan', methods=['POST'])
def generate_personalized_study_plan():
    return generate_personalized_study_plann()

@app.route('/studyingtechnique/get', methods=['POST'])
def studying_technique():
    return studying_techniquee()


if __name__ == '__main__':
    app.run(debug=True)
