# monPlan API
This is the API Server built on of Node.js used by monPlanR for server side logic.

API Version: `v0.3.20`

## What is an API?
> An API is a set of functions and procedures that allow the creation of applications which access the features or data of an operating system, application, or other service.

# Usage
To use this simply, install npm
```
npm install
```
This will install all the required dependencies

To run, simply type in
```
node server.js
```

The use of POSTman (A Chrome Extension) is suggested. To test it out on Postman type

The default address (when accessing it locally) is `https://localhost:3000`, we use the 3000 port to prevent conflict with port 8080.

## Instructions

| Instruction            | Returns                                                                                                   |
|------------------------|-----------------------------------------------------------------------------------------------------------|
| /units/                | Returns _every course_ with descriptive details (Name, Description, Faculty, Prerequisites, Prohibitions) |
| /units/(unitCode)      | Returns descriptive (same as course/ext details about the course  (uses data from the v0.3 API)           |
| /spec/(specCode)       | Returns JSON response for specialisations                                                                 |
| /v0.2/                 | This is the older version of the API designed to respond with more data                                   |
| /courses/(courseCode)  | Returns course maps based off study.monash courses                                                        |

# What's Coming
We are please to announce we are continuing to support and update our API! Here's a list of what's coming in **v0.4.x**
- oauth authentication layer for server response
- interaction with a mongodb database to store unit feedback
- upgrades to our system with better response code system (404, 200, etc.) for better API handling

# License
MIT License

Copyright (c) 2016 Monash University (eSolutions)

_This is developed by Eric Jiang and Saurabh Joshi_

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
