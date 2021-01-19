![title5](https://user-images.githubusercontent.com/56279592/104989170-d6250580-59e7-11eb-81ca-cdccff31fc22.png)

**This project is deployed at [vigenere-code-cracker.herokuapp.com](vigenere-code-cracker.herokuapp.com/).**

*Please note that the deployment version is built from the 'deploy' branch and does not support the persistance database (SQLAlchemy) and react-router-dom*

## Installation and Running
To start the virtual environment (server):
```bash
cd api
source ./venv/bin/activate
```
To start the react application:
```
cd my-app
npm install
npm start
```

## About 
The Vigenere Cipher is a method of encrypting alphabetic text (known as plain text) based on letter substitution and shifting.
In this full stack application, the front-end takes encoded messages from the client and passes it to the backend algorithm to be solved/decrypted. Recent queries are stored in the database and is available to be accessed again by the client. 

*For more information about the algorithm which uses frequency analysis, index of coincidence, and chi-square statistics, please visit the 'Learn More' page at [vigenere-code-cracker.herokuapp.com](vigenere-code-cracker.herokuapp.com/)*

## Technologies used
- react.js
- Python
- Flask
- SQLAlchemy
- SASS
- react-bootstrap, react-router-dom
- SciPy, NumPy
- Heroku

