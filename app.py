from flask import Flask, request, jsonify, render_template

# Initialize the Flask application
# We configure it to serve files from the 'static' directory
app = Flask(__name__, static_folder='static', static_url_path='')

# This is a simple in-memory dictionary to act as our user database for now.
# In a real application, you would connect to a proper database (e.g., PostgreSQL, SQLite).
users_db = {}
print("Warning: This is a demo using an in-memory database. Data will be lost on restart.")

@app.route('/')
def serve_app():
    """Serves the main HTML file of the application."""
    return render_template('index.html')

@app.route('/api/register', methods=['POST'])
def register():
    """API endpoint to register a new user."""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    if username in users_db:
        return jsonify({"message": "User already exists"}), 409

    # In a real app, you would hash the password before storing it.
    # NEVER store passwords in plain text.
    users_db[username] = password
    print(f"Registered new user: '{username}'")
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    """API endpoint to log a user in."""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    stored_password = users_db.get(username)
    if stored_password and stored_password == password:
        print(f"User '{username}' logged in successfully.")
        return jsonify({"message": "Login successful"}), 200
    else:
        print(f"Failed login attempt for user: '{username}'")
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    # Runs the Flask app
    # debug=True will automatically reload the server when you make changes
    app.run(debug=True, port=5000)