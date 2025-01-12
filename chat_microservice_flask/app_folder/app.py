# all the imports
# coding=utf-8

#import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
import chat_psj as oc
from contextlib import closing
import os
from werkzeug.utils import secure_filename


# configuration
DATABASE = 'mysql+pymysql://entries:entries@localhost/entries'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'
MESSAGES = []
UPLOAD_FOLDER = 'static/images/'

ALLOWED_EXTENSIONS = set(['jpg'])
  
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)
	
# Create the database from command line with the following commands:
# >>> from flaskr import init_db
# >>> init_db()

@app.before_request
def before_request():
	#
	pass 

@app.teardown_request
def teardown_request(exception):
	#db = getattr(g, 'db', None)
	#if db is not None:
	#	db.close()
	pass	
	
@app.route('/')
def chat():
	oc.run()
	messages = app.config["MESSAGES"]
	entries = [dict(who=row[0], text=row[1]) for row in messages]
	return render_template('chat.html', entries=entries)
	
@app.route('/add', methods=['POST'])
def add_entry():
	res = oc.query_text(request.form['text'])
	app.config["MESSAGES"] += res
	return redirect(url_for('chat'))

@app.route('/query/<char>/<pers>/<quest>', methods=['GET'])
def get_response(char, pers, quest):
	res = oc.get_response_personality(char, pers, quest)
	return res

# run the app executing: python flaskr.py
if __name__ == '__main__':
	app.run(debug=True)