# nodejs-code-assesment

I was tasked to develop a WebAPI for querying the data found on both "mocky.io" links.
I went as vanilla node as possible to avoid getting into 3rd party licensing, only external dependency used was express.js. (And nodemon on dev environment)

The use of Authentication was required. As the provided jsons were missing any kind of hash or password I decided to just "fake" the authorization header, 
and use the user ID as token. Of course this is not suitable in a real life implementation and a proper authorization (JWT, OAuth..) should have been set up
according the project/client needs.

You can find the application on both files, main.js and utils.js. I wanted to keep the "database queries" away from the main express application, as in a
real life environment I expect the use of a proper database and some kind of ORM.

After I set up the authorization, I decided to build a quick script (see tests.js) to make sure everything was working as expected. You can use it to test the application.

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
With the express server running, open a new terminal and run
```
node tests.js
```

You'll be prompted with the usage help:
```
Usage: node tests.js USERID OPTION ARGUMENT
Possible options are: userid, username, policyname, policynumber         
Example: node tests.js ce70aa35-912b-47a8-9cb6-386c5bc2be03 userid ce70aa35-912b-47a8-9cb6-386c5bc2be03
```

Example of tests from an admin user:
```
node tests.js ce70aa35-912b-47a8-9cb6-386c5bc2be03 userid e8fd159b-57c4-4d36-9bd7-a59ca13057bb
node tests.js ce70aa35-912b-47a8-9cb6-386c5bc2be03 username Odonnell
node tests.js ce70aa35-912b-47a8-9cb6-386c5bc2be03 policyname Cox
node tests.js ce70aa35-912b-47a8-9cb6-386c5bc2be03 policynumber 64cceef9-3a01-49ae-a23b-3761b604800b
```

Please note test requests are hardcoded on port 8000. If you change the port on main.js and want to run the same tests make sure to edit those on the 
urls constant.