from flask import Flask, request, jsonify

app = Flask(__name__)

#@app.route('/submit-code', methods=['POST'])
#def submit_code():
    #data = request.get_json()
    #code = data.get('code')
    #print("Received code:", code)
    #return jsonify({"message": "Code received successfully"}), 200

@app.route('/')
def hello_world():
    return "Hello World!"

if __name__ == '__main__':
    app.run(debug=True)
