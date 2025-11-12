import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import joblib

# Set random seed for reproducibility
np.random.seed(42)

# Generate sample data (similar to your notebook)
def generate_data(n=200):
    study_hours = np.random.normal(loc=5, scale=2, size=n)
    study_hours = np.clip(study_hours, 0, 10)
    
    attendance = np.random.normal(loc=75, scale=10, size=n)
    attendance = np.clip(attendance, 30, 100)
    
    internal_marks = np.random.normal(loc=60, scale=15, size=n)
    internal_marks = np.clip(internal_marks, 20, 100)
    
    logit = (-8.5 + 1.0 * study_hours + 0.05 * attendance + 0.07 * internal_marks)
    prob = 1 / (1 + np.exp(-logit))
    passed = (prob > 0.5).astype(int)
    
    df = pd.DataFrame({
        "study_hours": np.round(study_hours, 2),
        "attendance": np.round(attendance, 1),
        "internal_marks": np.round(internal_marks, 1),
        "passed": passed
    })
    
    return df

# Generate and save data
df = generate_data()
df.to_csv("student_pass.csv", index=False)
print("✅ Generated and saved sample data to 'student_pass.csv'")

# Prepare features and target
X = df[["study_hours", "attendance", "internal_marks"]]
y = df["passed"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = LogisticRegression(random_state=42, max_iter=1000)
model.fit(X_train_scaled, y_train)

# Save model and scaler
joblib.dump(model, 'student_pass_model.joblib')
joblib.dump(scaler, 'scaler.joblib')
print("✅ Model and scaler saved successfully!")

# Print model accuracy
train_accuracy = model.score(X_train_scaled, y_train)
test_accuracy = model.score(X_test_scaled, y_test)
print(f"\nModel Performance:")
print(f"Training Accuracy: {train_accuracy:.4f}")
print(f"Test Accuracy: {test_accuracy:.4f}")
