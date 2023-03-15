![title5](https://user-images.githubusercontent.com/56279592/104989170-d6250580-59e7-11eb-81ca-cdccff31fc22.png)

![](https://github.com/derricklam04/decipher_web/blob/master/README/decipher-demo.gif)

~~This project is deployed at [vigenere-code-cracker.herokuapp.com](http://vigenere-code-cracker.herokuapp.com).~~ *Unfortunately, this project is no longer deployed as Heroku ended free support on Nov 28th, 2022 (For more info, see [Removal of Heroku Free Product Plans FAQ](https://help.heroku.com/RSBRUH58/removal-of-heroku-free-product-plans-faq)).*

## Table of Contents
* [About](#about)
* [Demo](#demo)
* [Technologies Used](#technologies-used)
* [Features](#features)

## About 
The Vigenere Cipher is a method of encrypting alphabetic text based on letter substitution and shifting.
In this full stack application, the front-end takes encoded messages from the client and passes it to the server side algorithm to be solved/decrypted. Recent queries are stored in the database and are available to be accessed again by the client. 

*For more information about the algorithm which uses letter frequency analysis, index of coincidence, and chi-square statistics, please visit the 'Learn More' page at [vigenere-code-cracker.herokuapp.com](vigenere-code-cracker.herokuapp.com/)*

## Demo
### Encoding text (Decoding shown above)
![](https://github.com/derricklam04/decipher_web/blob/master/README/decipher-encode.gif)

### Functionalities
Viewing history, swapping textboxes, and managing settings for the decryption algorithm.
![](https://github.com/derricklam04/decipher_web/blob/master/README/decipher-functions.gif)

### Explanation Page
![](https://github.com/derricklam04/decipher_web/blob/master/README/decipher-info.gif)

## Installation and Running
To start the server:
```
cd api
python api.py
```

To start the react application:
```
npm install
npm start
```

## Technologies used
- react.js
- Python
- Flask
- SQLAlchemy
- SASS
- react-bootstrap, react-router-dom
- SciPy, NumPy
- Heroku

