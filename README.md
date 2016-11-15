# nAPIServer
This is an API Testing Server built on of Node.js


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

The use of Postman (A Chrome Extension) is suggested. To test it out on Postman type

| Instruction        | Returns       |
| ------------------ | ------------- |
| /courses/          | Every course  |
| /courses/(id)      | Course with right unit code, including Unit Name and Faculty. Otherwise return 'missing' if course is N/A      |

# License
MIT License

Copyright (c) 2016 Eric Jiang & monPlan

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
