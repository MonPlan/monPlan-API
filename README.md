# monPlan API
This is the API Server built on of Node.js used by monPlanR for server side logic.

API Version: `v0.5.15-rc1`

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
npm start
```
Having an invalid mongoDB setup will not launch the API. MongoDB should not be setup in default configuration, security auth should be enabled as well as it being in a
non-standard port (i.e. not 27017)

For testing and development purposes, we recommend using POSTman (A Chrome Extension).

The default address (when accessing it locally) is `https://localhost:3000`, we use the 3000 port to prevent conflict with port 8080.

## Instructions

### General Requests

| T | Instruction            | Storage Type    | Intro (Current) | Returns                                                                                                                 |
|---|------------------------|-----------------|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| G | /basic/(types)         | Local JSON      | v0.3            | Returns basic type maps, based off (types), types include: units, teachingperiods, etc.                                 |
| G | /courses/(courseCode)  | Local JSON      | v0.4            | Returns course maps based off study.monash courses                                                                      |
| G | /courses/info/(code)   | mongoDB         | v0.5            | Returns course information based off
| G | /spec/(specCode)       | Local JSON      | v0.2            | Returns JSON response for specialisations        |  

### Unit Calls
| T | Instruction            | Storage Type    | Intro (Current) | Returns                                                                                                                 |
code                                                                               |
|---|------------------------|-----------------|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| G | /units/                | mongoDB         | v0.1 (v0.4)     | Returns _every unit with descriptive details (Name, Description, Faculty, Prerequisites, Prohibitions, SETU results)    |
| G | /units/(unitCode)      | mongoDB         | v0.1 (v0.4)     | Returns descriptive (same as course/ext details about the course                                                        |
| G | /rules/(unitCode)| mongoDB | v0.5.15 | Returns an array of rules based for the Unit specified UnitCode |

### User Snapshots
| T | Instruction            | Storage Type    | Intro (Current) | Returns                                                                                                                 |
|---|------------------------|-----------------|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| G | /snaps/(identifier)     | mongoDB         | v0.5.10         | Returns JavaScript object of saved course maps                                                                          |
| P  | /snaps/                 | mongoDB         | v0.5.10         | **ADD COURSESTRUCTURE ONTO BODY REQUEST under the _KEY_ COURSE**                                                        |

G - GET REQUEST
P - POST REQUEST

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
