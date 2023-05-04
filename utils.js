const https = require('https');

// We are using https for the requests so we require the minimum on external libraries.
// In case we had the need to authenticate I'd have probably used Axios instead.
module.exports = {
get_url: function(url) { // Queries url and returns the response
    return new Promise((resolve, reject) => {
    https.get(url, (res) => {
        let response = '';
        //console.log(res.statusCode);
        //console.log(res.headers);
    
        res.on('data', (d) => {
            response += d;
        });

        res.on('end', () => {
            resolve(response);
        })
    
    }).on('error', (e) => {
        reject(e);
    }); 

    
}
)},

get_user: function(userid, userlist){
    // Return user, or empty if user doesn't exist.
    // TODO /CHECK, probably just return user_role 
    return userlist.filter(function(item) {
        return item.id == userid;
    })
}}