const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('data.db')
db.run('CREATE TABLE IF NOT EXISTS author (id TEXT PRIMARY KEY, nama TEXT, jk TEXT, tahun_lahir INTEGER)')
db.run('CREATE TABLE IF NOT EXISTS book (isbn TEXT PRIMARY KEY, judul TEXT, author TEXT)')
//191111291 - Farhan Ismul Afriza
db.run('CREATE TABLE IF NOT EXISTS users (name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)')