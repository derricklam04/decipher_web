from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from algorithm import *

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.db"
db = SQLAlchemy(app)

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False) # cannnot be empty
    key = db.Column(db.Text, nullable=True)
    keyLength = db.Column(db.Integer, nullable=True)
    translated = db.Column(db.Text, nullable=True)
    translateType = db.Column(db.Text, nullable=True)

    def __str__(self):
        return f'{self.id} {self.content} {self.key} {self.keyLength} {self.translated} {self.translateType}'

def card_to_json(card):
    return{
        'id': card.id,
        'content': card.content,
        'key': card.key,
        'keyLength': card.keyLength,
        'translated': card.translated,
        'translateType': card.translateType
    }

@app.route('/api', methods =['GET'])
def index():
    return jsonify([*map(card_to_json, Card.query.all())])

@app.route('/api/create', methods = ['POST'])
def create():
    request_data = json.loads(request.data)
    translateType = request_data['type']

    translated = ""
    if translateType == "#encrypt":
        translated = encode(request_data['content'], request_data['key'])
    elif translateType == "#decrypt":
        if request_data['key'] != "": # if key is known
            translated = decode(request_data['content'], request_data['key'])
        elif request_data['keyLength'] != "": # if keyLength is known
            key, translated = decode1(request_data['content'], request_data['keyLength'])
            request_data['key'] = key
        else:
            key, translated = decode2(request_data['content'])
            request_data['key'] = key
    card = Card(content=request_data['content'],key=request_data['key'], keyLength=request_data['keyLength'], translated=translated, translateType=request_data['type'])

    if request_data['save']:
        db.session.add(card)
        db.session.commit()
    message = 'Card '+str(card.id)+' created'

    return {'201': message, 'translatedText': translated, 'key':request_data['key']}

@app.route('/api/<int:id>', methods = ['POST'])
def delete(id):
    request_data = json.loads(request.data)
    Card.query.filter_by(id=request_data['id']).delete()
    db.session.commit()

    message = 'Card '+str(id)+' deleted successfully'
    return {'204': message}


if __name__ == '__main__':
    app.run(debug=True)