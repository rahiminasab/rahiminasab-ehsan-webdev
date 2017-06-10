/**
 * Created by ehsan on 5/30/17.
 */

var app = require("../../express");

var WebsiteModel = require("../models/website/website.model.server");

app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);


function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    WebsiteModel
        .createWebsite(userId, website)
        .then(
            function (website) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;

    WebsiteModel
        .findAllWebsitesForUser(userId)
        .then(
            function (websites) {
                res.json(websites);
            },
            function (err) {
                res.sendStatus(404);
            }
        );
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    WebsiteModel
        .findWebsiteById(websiteId)
        .then(
            function (website) {
                res.json(website);
            },
            function (err) {
                res.sendStatus(404);
            }
        );
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var newWebsite = req.body;

    WebsiteModel
        .updateWebsite(websiteId, newWebsite)
        .then(
            function (website) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    WebsiteModel
        .removeWebsite(websiteId)
        .then(
            function (success) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}
