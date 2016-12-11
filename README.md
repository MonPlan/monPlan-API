# monPlan API
This is an API Testing Server built on of Node.js for monPlan as an alternative (with server side logic)

API Version: `v0.2.10`

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
| /units/(unitCode)      | Returns descriptive (same as course/ext details about the course                                          |


# License
MIT License

Copyright (c) 2016 Monash University (eSolutions)
Developed by Eric Jiang

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
