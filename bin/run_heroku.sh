#!/usr/bin/env bash

python mvp.py cron &

gunicorn -k gunicorn.workers.ggevent.GeventWorker mvp:app
