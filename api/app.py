from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/redline', methods=['GET'])
def redline():
    textv1 = request.args.get('textv1')
    textv2 = request.args.get('textv2')
    return jsonify(message=f"The first version of the text is \"{textv1}\" and the second is \"{textv2}\".")
