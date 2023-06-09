/*
Roberto López (zelopdotnet@proton.me)
*/

const https = require('https');

module.exports = {
    // We are using https for the requests so we require the minimum on external libraries.
    // In case we had the need to authenticate I'd have probably used Axios instead.
    get_url: function(url) { // Queries url and returns the response
        return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let response = '';
        
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

    // We should be querying a database. I'm making the assumption every user and policy uuid is unique and there are no duplicates.
    // So I will be using .find() instead of .filter() (except on get_policies_from_user)

    get_user_by_id: function(userid, userlist){
        // Return user, or undefined if id doesn't exist.
        return userlist.find(function(item) {
            return item.id == userid;
        })
    },

    get_user_role: function(userid, userlist){
        // Return user role
        let user = this.get_user_by_id(userid, userlist)
        if (!user) return null
        return user.role
    },

    get_user_by_name: function(name, userlist){
        // Return user, or undefined if name doesn't exist.
        return userlist.find(function(item) {
            return item.name == name;
        })
    },

    get_user_from_policy: function(id, policies, userlist){
        // We find the policy, if any.
        let policy = policies.find(function(item) {
            return item.id == id;
        })
        // We then return the linked user, if any.
        if (!policy) return null;
        return this.get_user_by_id(policy.clientId, userlist);
    },

    get_policies_from_user: function(name, policies, userlist){
        // We get the user from name
        let user = this.get_user_by_name(name, userlist);
        // We then find and return all the policies linked to that user
        if (!user) return null;
        return policies.filter(function(item) {
            return item.clientId == user.id;
        })
    }
}