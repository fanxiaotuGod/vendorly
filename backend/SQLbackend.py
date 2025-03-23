import sqlite3

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def create_users_table():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            google_token TEXT
        )
    ''')
    conn.commit()
    conn.close()

def register_user(data):
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    email = data.get("email")
    password = data.get("password")
    google_token = data.get("googleToken")

    if not first_name or not last_name or not email or not password:
        raise ValueError("Missing required fields.")

    conn = get_db_connection()
    try:
        conn.execute(
            "INSERT INTO users (first_name, last_name, email, password, google_token) VALUES (?, ?, ?, ?, ?)",
            (first_name, last_name, email, password, google_token)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        raise ValueError("User with this email already exists.")
    finally:
        conn.close()

    return True

if __name__ == "__main__":
    create_users_table()
    print("Users table created successfully.")
