/**
 * Created by ehsan on 5/30/17.
 */
var app = require("../../express");

var PageModel = require("../models/page/page.model.server");

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    PageModel
        .createPage(websiteId, page)
        .then(
            function (page) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;
    PageModel
        .findAllPagesForWebsite(websiteId)
        .then(
            function (websites) {
                if(websites)
                    res.json(websites);
                else
                    res.sendStatus(404);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function findPageById(req, res) {
    var pageId = req.params.pageId;

    PageModel
        .findPageById(pageId)
        .then(
            function (page) {
                if(page)
                    res.json(page);
                else
                    res.sendStatus(404);
            },
            function (err) {
                res.sendStatus(500);
            }
        )
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var newPage = req.body;
    PageModel
        .updatePage(pageId, newPage)
        .then(
            function (success) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    PageModel
        .removePage(pageId)
        .then(
            function (success) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}
