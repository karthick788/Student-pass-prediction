# Student Pass Prediction

A full-stack web application that predicts whether a student will pass or fail based on their study hours, attendance, and internal marks.

## Features

- **Machine Learning Model**: Logistic Regression model trained on synthetic student data
- **RESTful API**: Flask backend serving predictions
- **Modern UI**: Responsive React frontend with Material-UI components
- **Real-time Predictions**: Get instant pass/fail predictions with probability scores

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

## Setup Instructions

### 1. Backend Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Train and save the model:
   ```bash
   python train_model.py
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend will be available at `http://localhost:5000`

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## Project Structure

```
student-pass-prediction/
├── app.py                # Flask backend
├── train_model.py        # Model training script
├── student_pass_model.joblib  # Trained model
├── scaler.joblib         # Feature scaler
├── requirements.txt      # Python dependencies
├── README.md            # This file
└── frontend/            # React frontend
    ├── public/
    └── src/
        ├── App.js       # Main React component
        ├── App.css      # Styles
        └── ...
```

## Usage

1. Open the application in your browser at `http://localhost:3000`
2. Fill in the student's details:
   - Study Hours (0-10)
   - Attendance Percentage (30-100%)
   - Internal Marks (20-100)
3. Click "Predict" to see the result
4. Use "Reset" to clear the form

## API Endpoints

- `POST /predict` - Get a prediction
  - Request body: `{"study_hours": number, "attendance": number, "internal_marks": number}`
  - Response: `{"prediction": 0|1, "probability": number, "status": string}`

## License

This project is licensed under the MIT License.
