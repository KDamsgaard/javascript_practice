module.exports = {
    attemptLogin: (username, password) => {
        console.log("A login was attempted...");
        let users = [{"username": "admin", "password": "admin"},
                     {"username": "other", "password": "nuggets"}
                    ];
        var user = null;

        users.forEach((entry) => {
            if (entry.username == username) {
                user = entry;
            }
        });

        if (user.password == password) {
            return true;
        } else {
            return false;
        }
    },

    getDB: async(url, err) => {
        await client.connect()
    },


    fetchUser: (db, username, err) => {
        if (err) throw err;


        db.close()
    }
};
