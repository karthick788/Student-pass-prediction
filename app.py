from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler
import os

app = Flask(__name__)
CORS(app)

# Load the model and scaler
model = None
scaler = None
MODEL_PATH = 'student_pass_model.joblib'
SCALER_PATH = 'scaler.joblib'

# Load or train model
def load_model():
    global model, scaler
    try:
        if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
            model = joblib.load(MODEL_PATH)
            scaler = joblib.load(SCALER_PATH)
            print("Model and scaler loaded successfully!")
        else:
            print("Model not found. Please train the model first.")
    except Exception as e:
        print(f"Error loading model: {str(e)}")

# Initialize model when the app starts
load_model()

@app.route('/')
def home():
    return "Student Pass Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract input data
        study_hours = float(data['study_hours'])
        attendance = float(data['attendance'])
        internal_marks = float(data['internal_marks'])
        
        # Create DataFrame with the same structure as training data
        input_data = pd.DataFrame({
            'study_hours': [study_hours],
            'attendance': [attendance],
            'internal_marks': [internal_marks]
        })
        
        # Scale the input data
        input_scaled = scaler.transform(input_data)
        
        # Make prediction
        prediction = model.predict(input_scaled)[0]
        probability = model.predict_proba(input_scaled)[0][1]  # Probability of passing
        
        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability),
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
