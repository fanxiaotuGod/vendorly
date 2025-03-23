from flask_cors import CORS
from SQLbackend import register_user, create_users_table
import sqlite3  # or mysql.connector, depending on your DB
from flask import Flask, request, jsonify, session
from google.oauth2 import id_token
from google.auth.transport import requests as grequests

app = Flask(__name__)
app.secret_key = "super-secret-key"  # ← You can generate a better one for production
# IMPORTANT: Match your actual frontend origin here:
CORS(
    app,
    origins=["http://localhost:3001"],  # or use ["*"] for all origins (not recommended for production)
    supports_credentials=True           # only if you need cookies/credentials
)

# Initialize the database
create_users_table()

# Example: SQLite connection helper
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row  # <-- Add this line!
    return conn


@app.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        print("🔐 Login attempt with:", data)

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"message": "Missing email or password"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, password FROM users WHERE email = ?", (email,))
        row = cursor.fetchone()
        conn.close()

        print("Fetched row from DB:", row)

        if row is None:
            return jsonify({"message": "User not found"}), 401

        user_id = row["id"]
        stored_password = row["password"]

        print("Stored password:", stored_password)

        if password != stored_password:
            return jsonify({"message": "Invalid password"}), 401

        session["user_id"] = user_id
        print("✅ Login success for user_id:", user_id)
        return jsonify({"message": "Login successful"}), 200

    except Exception as e:
        print("🔥 INTERNAL SERVER ERROR:", e)
        return jsonify({"message": "Internal server error", "error": str(e)}), 500


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    try:
        register_user(data)
        return jsonify({"message": "Registered successfully"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400


@app.route("/api/google-login", methods=["POST"])
def google_login():
    try:
        data = request.get_json()
        token = data.get("credential")

        # ... verify token with Google ...
        idinfo = id_token.verify_oauth2_token(token, grequests.Request(), CLIENT_ID)

        email = idinfo["email"]
        given_name = idinfo.get("given_name", "")
        family_name = idinfo.get("family_name", "")
        if not family_name:
            family_name = "GoogleUser"  # fallback

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        row = cursor.fetchone()

        if row is None:
            # Insert user with placeholders if columns are NOT NULL
            cursor.execute("""
                INSERT INTO users (email, first_name, last_name, password)
                VALUES (?, ?, ?, ?)
            """, (email, given_name, family_name, ""))
            conn.commit()
            user_id = cursor.lastrowid
        else:
            user_id = row["id"]

        conn.close()

        session["user_id"] = user_id
        return jsonify({"message": "Login successful"}), 200

    except Exception as e:
        print("🔥 Google login failed:", e)
        return jsonify({"message": "Google login failed", "error": str(e)}), 500

if __name__ == "__main__":
    # Run on port 5000
    app.run(port=5001, debug=True)
