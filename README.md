# Sample-Register-Login-using-REST-with-Express-JS-MongoDB
Profile Registration (used with Validator) &amp; Login (used with Token) using REST with Express JS 4.16.4, Mongoose 5.3.14, BcryptJS 2.4.3, Validator 10.9.0, body-parser 1.18.3, jsonwebtoken 8.4.0, passport 0.4.0, passport-jwt 4.0.0

# Server run on port 5000.

Register REST Post command: http://localhost:5000/api/users/register
with Body Keys:

name, password and email [use x-www-form-urlencoded]

Login REST Post command: http://localhost:5000/api/users/login
with Body Keys:

email & password [use x-www-form-urlencoded]

After login a token will be given (which is valid for a number of seconds), without that code, current page cannot be accessed.
Current Page (Protected with Login Code):

REST Get command: http://localhost:5000/api/users/current
with Authorization : Token (usually starts with a string "Bearer")
