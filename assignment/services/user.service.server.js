/**
 * Created by ehsan on 5/30/17.
 */
module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var user = req.body;
        user._id = ""+Math.floor((Math.random() * 100) + 1);
        user.created = new Date();
        users.push(user);
        res.json(user);
    }

    function getUsers(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);

        } else {
            findAllUsers(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        var user = users.find(
            function (user) {
                return user.username === username;
            }
        );
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByCredentials(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        var user = users.find(
            function(user){
                return user.password === password && user.username === username;
            }
        );

        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        var user = users.find(
            function (user) {
                return user._id === userId;
            }
        );
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findAllUsers(req, res) {
        res.send(users);
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        var index = -1;
        for(var u in users) {
            if( users[u]._id === userId ) {
                index = u;
                break;
            }
        }

        if(index > -1) {
            newUser._id = users[index]._id;
            users.splice(index,1);
            users.push(newUser);
            res.json(newUser);
        }
        res.sendStatus(404);
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];
        var index = -1;
        for(var u in users) {
            if(users[u]._id === userId) {
                index = u;
                break;
            }
        }

        if(index > -1) {
            users.splice(index, 1);
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);

    }
};