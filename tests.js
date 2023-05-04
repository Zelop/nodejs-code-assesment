/*
Roberto López (zelopdotnet@proton.net)
*/

const http = require('http')


// Function used for testing the authentication system.
// Authentication will be faked by sending the userid as a bearer token.
function query_url (url, userid) {
    const options = {
        headers: {
            'Authorization': 'Bearer ' + userid
        }
    }
    http.get(url, options, (res) => {
        let response = '';
    
        res.on('data', (d) => {
            response += d;
        });

        res.on('end', () => {
            console.log(response);
        })
    
    }).on('error', (e) => {
        console.error(e);
    }); 

    
}

// Api urls and their definition on the script usage
const urls = {
    "userid": "http://127.0.0.1:8000/user/id/",
    "username": "http://127.0.0.1:8000/user/name/",
    "policyname": "http://127.0.0.1:8000/policies/username/",
    "policynumber": "http://127.0.0.1:8000/policies/getuser/",
}

function main() {
    const args = process.argv.slice(2);
    const options = ["userid", "username", "policyname", "policynumber"]
    if (args.length != 3 || !(options.includes(args[1]))) {
        console.log("Usage: node tests.js USERID OPTION ARGUMENT\nPossible options are: userid, username, policyname, policynumber \
        \nExample: node tests.js ce70aa35-912b-47a8-9cb6-386c5bc2be03 userid ce70aa35-912b-47a8-9cb6-386c5bc2be03");
        return;
    } else {
        query_url(urls[args[1]] + args[2], args[0]);
    }
}

main();