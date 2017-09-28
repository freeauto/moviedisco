from datetime import datetime, timedelta # @UnusedImport
import logging # @UnusedImport
from flask import abort, render_template, redirect, url_for, request, make_response, jsonify, flash, Response # @UnusedImport

from database import db # @UnusedImport
from main import app
from models import * # @UnusedWildImport
from com.front import escapejs, js_hot_include


app.template_filter()(escapejs)
app.template_filter()(js_hot_include)


@app.route('/react/')
def react_view():
    server_data = dict(test="Test server_data here.")
    return render_template('react.html', server_data=server_data)


@app.route('/')
def home_view():
    return render_template('home.html')
