from flask import Flask, request, jsonify
import jwt
from datetime import datetime, timedelta
from functools import wraps
import hashlib
import os
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Get secret key from environment variable
SECRET_KEY = os.getenv('SECRET_KEY', 'your_strong_secret_key_here')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin_password')

# Hash password for secure storage
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Store hashed password
HASHED_ADMIN_PASSWORD = hash_password(ADMIN_PASSWORD)

# Mock database with initial data
portfolio_data = {
    "name": "Anshuman Singh",
    "title": "Python Backend Developer & Aspiring Software Engineer",
    "sections": {
        "hero": True,
        "about": True,
        "projects": True,
        "skills": True,
        "contact": True
    },
    "projects": [
        {
            "id": 1,
            "title": "Telegram JSON DB Manager",
            "description": "A Flask-based Telegram bot that manages a JSON database allowing users to store and retrieve data via Telegram commands.",
            "tags": ["Flask", "Telegram Bot", "JSON"]
        },
        {
            "id": 2,
            "title": "E-commerce Store",
            "description": "A full-fledged e-commerce platform built with Flask and SQLite, hosted on Render with product listings, cart, and user authentication.",
            "tags": ["Flask", "SQLite", "Render"]
        },
        {
            "id": 3,
            "title": "AI-powered Exam Result Bot",
            "description": "A bot that scrapes university websites and uses AI to detect result updates, then notifies students via Telegram.",
            "tags": ["Python", "Web Scraping", "AI", "Telegram"]
        },
        {
            "id": 4,
            "title": "Dream & Soul Journal",
            "description": "An audio-guided journaling tool that helps users reflect on their dreams and daily experiences with calming background sounds.",
            "tags": ["Flask", "Audio Processing", "Journaling"]
        }
    ]
}

# JWT authentication decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(" ")[1]
        
        if not token:
            logger.warning("Missing token in request")
            return jsonify({"error": "Token is missing"}), 401
            
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            logger.warning("Expired token used")
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            logger.warning("Invalid token used")
            return jsonify({"error": "Invalid token"}), 401
            
        return f(*args, **kwargs)
    return decorated

@app.route('/verify', methods=['POST'])
def verify():
    try:
        data = request.get_json()
        password = data.get('password')
        
        if not password:
            logger.warning("Password missing in request")
            return jsonify({"success": False, "message": "Password required"}), 400
        
        # Compare hashed passwords
        if hash_password(password) != HASHED_ADMIN_PASSWORD:
            logger.warning("Invalid password attempt")
            return jsonify({"success": False, "message": "Invalid password"}), 401
        
        # Generate token valid for 1 hour
        token = jwt.encode({
            'exp': datetime.utcnow() + timedelta(hours=1)
        }, SECRET_KEY)
        
        logger.info("Admin login successful")
        return jsonify({
            "success": True, 
            "token": token,
            "message": "Authentication successful"
        })
        
    except Exception as e:
        logger.error(f"Error in verify endpoint: {str(e)}")
        return jsonify({
            "success": False,
            "message": "Internal server error"
        }), 500

@app.route('/data', methods=['GET'])
@token_required
def get_data():
    try:
        logger.info("Portfolio data requested")
        return jsonify(portfolio_data)
    except Exception as e:
        logger.error(f"Error fetching data: {str(e)}")
        return jsonify({
            "error": "Failed to fetch data"
        }), 500

@app.route('/update', methods=['POST'])
@token_required
def update_data():
    try:
        data = request.get_json()
        if not data:
            logger.warning("No data in update request")
            return jsonify({
                "success": False,
                "message": "No data provided"
            }), 400
            
        # Validate data structure
        required_fields = ['name', 'title', 'sections', 'projects']
        if not all(field in data for field in required_fields):
            logger.warning("Invalid data structure in update")
            return jsonify({
                "success": False,
                "message": "Invalid data structure"
            }), 400
        
        # Update portfolio data
        global portfolio_data
        portfolio_data = data
        logger.info("Portfolio data updated successfully")
        
        return jsonify({
            "success": True,
            "message": "Portfolio updated successfully"
        })
        
    except Exception as e:
        logger.error(f"Error updating data: {str(e)}")
        return jsonify({
            "success": False,
            "message": "Internal server error"
        }), 500

if __name__ == '__main__':
    # Run with production-ready server
    from waitress import serve
    logger.info("Starting backend server on port 5000")
    serve(app, host="0.0.0.0", port=5000)