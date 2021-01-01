from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.db"
db = SQLAlchemy(app)

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False) # cannnot be empty

    def __str__(self):
        return f'{self.id} {self.content}'

def card_to_json(card):
    return{
        'id': card.id,
        'content': card.content
    }

@app.route('/api', methods =['GET'])
def index():
    return jsonify([*map(card_to_json, Card.query.all())])

@app.route('/api/create', methods = ['POST'])
def create():
    request_data = json.loads(request.data)
    card = Card(content=request_data['content'])

    db.session.add(card)
    db.session.commit()

    return {'201': 'History Card created successfully'}


if __name__ == '__main__':
    app.run(debug=True)