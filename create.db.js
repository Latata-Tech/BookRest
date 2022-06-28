const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('data.db')
db.run('CREATE TABLE IF NOT EXISTS author (id TEXT PRIMARY KEY, nama TEXT, jk TEXT, tahun_lahir INTEGER)')
db.run('CREATE TABLE IF NOT EXISTS book (isbn TEXT PRIMARY KEY, judul TEXT, author TEXT)')
//191111291 - Farhan Ismul Afriza
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY,name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)')
db.run('ALTER TABLE author ADD COLUMN created_at TEXT')
db.run('ALTER TABLE book ADD COLUMN created_at TEXT')
db.run('ALTER TABLE author ADD COLUMN updated_at TEXT')
db.run('ALTER TABLE book ADD COLUMN updated_at TEXT')
db.run('CREATE TABLE IF NOT EXISTS oauth_access_token (id INTEGER PRIMARY KEY,user_id INTEGER NOT NULL, access_token TEXT NOT NULL, valid INTEGER DEFAULT 1, FOREIGN KEY(user_id) REFERENCES user(id))')