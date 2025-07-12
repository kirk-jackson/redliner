from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/redline')
def redline():
    return jsonify(message="The differences in the text are:")
