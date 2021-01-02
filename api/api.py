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
    translated = db.Column(db.Text, nullable=True)
    translateType = db.Column(db.Text, nullable=True)

    def __str__(self):
        return f'{self.id} {self.content} {self.key} {self.translated} {self.translateType}'

def card_to_json(card):
    return{
        'id': card.id,
        'content': card.content,
        'key': card.key,
        'translated': card.translated,
        'translatedType': card.translateType
    }

@app.route('/api', methods =['GET'])
def index():
    return jsonify([*map(card_to_json, Card.query.all())])

@app.route('/api/create', methods = ['POST'])
def create():
    request_data = json.loads(request.data)
    translated = encode(request_data['content'], "key")

    card = Card(content=request_data['content'],key="key", translated=translated, translateType=request_data['type'])

    db.session.add(card)
    db.session.commit()
    
    message = 'Card '+str(card.id)+' created'
    return {'201': message, 'translatedText': translated}

@app.route('/api/<int:id>', methods = ['POST'])
def delete(id):
    request_data = json.loads(request.data)
    Card.query.filter_by(id=request_data['id']).delete()
    db.session.commit()

    message = 'Card '+str(id)+' deleted successfully'
    return {'204': message}


if __name__ == '__main__':
    app.run(debug=True)