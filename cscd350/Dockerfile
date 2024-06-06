FROM ubuntu
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt -y install python3
RUN apt -y install python3-flask
COPY app.py ./
COPY static/ ./static/
COPY templates ./templates/ 
EXPOSE 8090
CMD ["python3", "app.py"]