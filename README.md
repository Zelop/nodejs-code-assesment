# nodejs-code-assesment

I was tasked to develop a WebAPI for querying the data found on both "mocky.io" links.
I went as vanilla node as possible to avoid getting into 3rd party licensing, only external dependency in use in production is express.js.

The use of Authentication was required. As the provided jsons were missing any kind of hash or password I decided to just "fake" the authorization header, 
and use the user ID as token. Of course this is not suitable in a real life implementation and a proper authorization (JWT, OAuth..) should have been set up
according the project/client needs.

You can find the main express application on main.js, it will handle authentication and load each route. The "database queries" can be found on utils.js, 
they are there somewhat as a placeholder, as in a real life environment I expect the use of a proper database and some kind of ORM.

There are also Jest tests for each function to be found inside test/test.js

After I set up the authorization, I decided to build a quick script (see poc.js) to query the API without needing external tools (like Postman) for authentication.

### Dev environment
This mockup has been developed and tested on Debian 11 using node.js v20.0 and npm v9.6.4

### Installation instructions
Clone the repo if you haven't already
```
git clone https://github.com/Zelop/nodejs-code-assesment
cd nodejs-code-assesment
```

Install dependencies
```
npm install
```

Run the express application
```
node main.js
```
### Test instructions

Make sure you have installed dev dependencies (jest, supertest), then run

```
npm test
```

### PoC Usage
With the express server running, open a new terminal and run
```
node poc.js
```

You'll be prompted with the usage help:
```
Usage: node poc.js USERID OPTION ARGUMENT
Possible options are: userid, username, policyname, policynumber         
Example: node poc.js ce70aa35-912b-47a8-9cb6-386c5bc2be03 userid ce70aa35-912b-47a8-9cb6-386c5bc2be03
```

Please note test requests are hardcoded on port 8000. If you change the port on main.js and want to run the same tests make sure to edit those on the 
urls constant.

### Contact info:
You can contact me on zelopdotnet@proton.me