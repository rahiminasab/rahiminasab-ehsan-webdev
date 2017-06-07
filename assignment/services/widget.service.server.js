/**
 * Created by ehsan on 5/30/17.
 */
module.exports = function(app) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": "2", "text": "GIZMODO", "orderIdx": 0},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum", "orderIdx": 1},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/", "orderIdx": 2},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Gather all the knowledge you need to learn a new skill or refine an existing one with online courses from <a href="http://click.linksynergy.com/fs-bin/click?id=G5Efv5Bc9nM&amp;offerid=323057.7152&amp;type=3&amp;subid=0" target="_blank" rel="noopener"><strong>Udemy</strong></a>. Gizmodo readers can get over 40,000 courses for just <a href="http://click.linksynergy.com/fs-bin/click?id=G5Efv5Bc9nM&amp;offerid=323057.7152&amp;type=3&amp;subid=0" target="_blank" rel="noopener">$10 a piece</a> with code <strong>UDLEARNFEST</strong> and save hundreds while you learn at your own pace.<br></p>',  "orderIdx": 3},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum", "orderIdx": 4},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E", "orderIdx": 5},
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": '<p>Following a ban of in cabin electronic devices that are <a href="http://gizmodo.com/us-bans-electronic-devices-on-flights-from-8-muslim-cou-1793472925#_ga=2.17001913.1691964445.1496008438-776204539.1477142915" rel="nofollow">“larger than a smartphone”</a> on flights coming to the US from locations in eight majority-Muslim countries, it appears the White House wants to expand its <a href="http://gizmodo.com/trumps-electronics-ban-on-airplanes-makes-less-sense-ev-1793518279#_ga=2.191279020.760292626.1496006477-776204539.1477142915" rel="nofollow">curious policy</a>. This morning, U.S. Homeland Security Secretary John Kelly told Fox News’ Chris Wallace that he…<span class="read-more-placeholder"></span></p>', "orderIdx": 6}
    ];

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/page/:pageId/widget",reorderWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);


    
    function createWidget(req, res) {
        var pageId = req.params['pageId']
        var widget = req.body;
        widget._id = ""+Math.floor(Math.random()*100+1);
        widget.pageId = pageId;
        widget.orderIdx = 0;

        for(var w in widgets) {
            if(widgets[w].pageId === pageId)
                widgets[w].orderIdx++;
        }
        widgets.unshift(widget);
        res.json(widget);
    }
    
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var result = doFindAllWidgetsForPage(pageId);
        res.json(result);
    }

    function doFindAllWidgetsForPage(pageId) {
        var result = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId)
                result.push(widgets[w]);
        }
        result.sort(function (w1, w2) {
            return w1.orderIdx - w2.orderIdx;
        });
        return result;
    }
    
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = getWidgetById(widgetId);
        if(widget !== null)
            res.json(widget);
        else
            res.sendStatus(404);
    }

    function getWidgetById(widgetId) {
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                return widgets[w];
            }
        }
        return null;
    }
    
    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        newWidget = doUpdateWidget(widgetId, newWidget);
        if(newWidget)
            res.sendStatus(200);
        else
            res.sendStatus(404);
    }

    function doUpdateWidget(widgetId, newWidget) {
        var index = -1;
        for(var w in widgets) {
            if( widgets[w]._id === widgetId ) {
                index = w;
                break;
            }
        }

        if(index > -1) {
            newWidget._id = widgets[index]._id;
            widgets.splice(index, 1);
            widgets.unshift(newWidget);
            return newWidget;
        }
    }
    
    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        var index = -1;
        for(var w in widgets) {
            if( widgets[w]._id === widgetId ) {
                index = w;
                break;
            }
        }

        if(index > -1) {
            widgets.splice(index, 1);
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var name          = req.body.name;
        var text          = req.body.text;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId    = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId    = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        widget = getWidgetById(widgetId);
        widget.name = name;
        widget.text = text;
        widget.width = width;
        widget.url = '/assignment/uploads/'+filename;

        var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId + "/page/" + pageId + "/widget/" + widgetId;

        res.redirect(callbackUrl);
    }

    function reorderWidget(req, res) {

        var pageId = req.params['pageId'];
        var initialIndex = parseInt(req.query['initial']);
        var finalIndex = parseInt(req.query['final']);

        if(finalIndex === initialIndex) {
            res.sendStatus(200);
            return;
        }


        var widgets = doFindAllWidgetsForPage(pageId);
        widgets[initialIndex].orderIdx = finalIndex;
        if(initialIndex < finalIndex) {
            for(i = initialIndex + 1; i <= finalIndex; i++) {
                widgets[i].orderIdx--;
            }
        } else if(finalIndex < initialIndex) {
            for(i = initialIndex - 1; i >= finalIndex; i--) {
                widgets[i].orderIdx++;
            }
        }
        res.sendStatus(200)

    }



};