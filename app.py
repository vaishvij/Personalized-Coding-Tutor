from flask import Flask, request, jsonify, render_template, send_from_directory
import subprocess
import json
import uuid
import tempfile
import os

app = Flask(__name__)

print("Current working directory:", os.getcwd())

with open('problems.json') as f:
    questions = json.load(f)

@app.route('/')
def home():
    return render_template('learn.html')

@app.route('/editor')
def editor():
    return render_template('editor.html')

@app.route('/questions')
def get_questions():
    return jsonify(questions)

@app.route('/questions/<qid>')
def get_question(qid):
    for q in questions:
        if q['id'] == qid:
            return jsonify(q)
    return jsonify({'error': 'Not found'}), 404

@app.route('/run', methods=['POST'])
def run_code():
    code = request.json.get('code', '')
    
    # ✅ Generate a temporary file path (cross-platform)
    temp_dir = tempfile.gettempdir()
    file_name = os.path.join(temp_dir, f"{uuid.uuid4().hex}.py")

    with open(file_name, 'w') as f:
        f.write(code)

    try:
        result = subprocess.run(
            ['python', file_name],  # use 'python' on Windows, not 'python3'
            capture_output=True,
            text=True,
            timeout=5
        )
        output = result.stdout if result.returncode == 0 else result.stderr
    except Exception as e:
        output = f"Execution error: {str(e)}"
    finally:
        if os.path.exists(file_name):
            os.remove(file_name)

    return jsonify({'output': output})

if __name__ == '__main__':
    app.run(debug=True)
