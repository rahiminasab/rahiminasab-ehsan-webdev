/**
 * Created by ehsan on 5/30/17.
 */
module.exports = function(app) {
    
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];
    
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId". deletePage);
    
    function createPage(req, res) {
        var page = req.body;
        pages.push(page);
        res.json(page);
    }
    
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var result = [];
        for(var p in pages) {
            if(pages[p].websiteId === websiteId)
                result.push(pages[p]);
        }
        res.json(result);
    }
    
    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                res.json(pages[p]);
                return;
            }

        }
    }
    
    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        var index = -1;
        for(var p in pages) {
            if( pages[p]._id === pageId ) {
                index = p;
                break;
            }
        }

        if(index > -1) {
            newPage._id = pages[index]._id;
            pages.splice(index, 1);
            pages.push(newPage);
            res.json(newPage);
        }
        res.sendStatus(404);
    }
    
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        var index = -1;
        for(var p in pages) {
            if( pages[p]._id === pageId ) {
                index = p;
                break;
            }
        }

        if(index > -1) {
            pages.splice(index, 1);
            res.sendStatus(200);
        }
        res.sendStatus(404);
    }
};