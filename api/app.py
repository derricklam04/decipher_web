from flask import Flask, jsonify, request, json
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from algorithm import *
import os

app = Flask(__name__ ,static_folder='./build',static_url_path='/')
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api')
@cross_origin()
def Welcome():
    return "Welcome to the API!!!"

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/create', methods=["POST"])
@cross_origin()
def create():
    request_data = json.loads(request.data)
    translateType = request_data['type']
    freqTable = request_data['freqTable']

    translated = ""
    if translateType == "#encrypt":
        translated = encode(request_data['content'], request_data['key'])
    elif translateType == "#decrypt":
        try:
            if request_data['key'] != "": # if key is known
                translated = decode(request_data['content'], request_data['key'])
            elif request_data['keyLength'] != "": # if keyLength is known
                key, translated = decode1(request_data['content'], request_data['keyLength'], freqTable)
                request_data['key'] = key
            else:  # both unknown
                ic = request_data['ic']
                results = decode2(request_data['content'], ic, freqTable)

                if len(results) == 0:
                    return {'error': 'true', 'multiple': 'false'}
                elif len(results) == 1: # if only 1 result
                    translated = results.values()[0]
                    request_data['key'] = results.keys()[0]
                else:
                    return {'multiple': 'true', 'results': results, 'error': 'false'}
        except:
            return {'error': 'true', 'multiple': 'false'}
    
    # request_data['key'] = request_data['key'].upper()
    # card = Card(content=request_data['content'],key=request_data['key'], keyLength=request_data['keyLength'], translated=translated, translateType=request_data['type'])

    # if request_data['save']:
    #     db.session.add(card)
    #     db.session.commit()
    # message = 'Card '+str(card.id)+' created'

    return {'translatedText': translated, 'key':request_data['key'], 'error':'false', 'multiple': 'false'}


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=False, port=os.environ.get('PORT', 80))