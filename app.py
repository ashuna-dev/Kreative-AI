from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define the upload directory
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided.'}), 400

    image = request.files['image']

    # Save the uploaded image file
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    return jsonify({'message': 'Upload successful!', 'image_path': image_path}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
