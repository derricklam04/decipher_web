from flask import Flask, jsonify
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

if __name__ == '__main__':
    app.run(debug=True)