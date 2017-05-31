/**
 * Created by ehsan on 5/30/17.
 */
module.exports = function(app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    function createWebsite(req, res) {
        var website = req.body;
        website.developerId = req.params.userId;
        website._id = ""+Math.floor((Math.random() * 100) + 1);
        websites.push(website);
        res.json(website);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var result = [];
        for(var w in websites) {
            if(websites[w].developerId === userId)
                result.push(websites[w]);
        }
        res.json(result);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                res.json(websites[w]);
                return;
            }

        }
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        var index = -1;
        for(var w in websites) {
            if( websites[w]._id === websiteId ) {
                index = w;
                break;
            }
        }

        if(index > -1) {
            newWebsite._id = websites[index]._id;
            websites.splice(index, 1);
            websites.push(newWebsite);
            res.json(newWebsite);
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var index = -1;
        for(var w in websites) {
            if( websites[w]._id === websiteId ) {
                index = w;
                break;
            }
        }

        if(index > -1) {
            websites.splice(index, 1);
            res.sendStatus(200);
        }
        res.sendStatus(404);
    }
};