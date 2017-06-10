/**
 * Created by ehsan on 5/30/17.
 */
var app = require("../../express");
var WidgetModel = require("../models/widget/widget.model.server");

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.put("/page/:pageId/widget",reorderWidget);
app.delete("/api/widget/:widgetId", deleteWidget);


function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    WidgetModel
        .createWidget(pageId, widget)
        .then(
            function (widget) {
                res.json(widget);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    WidgetModel
        .findAllWidgetsForPage(pageId)
        .then(
            function (widgets) {
                res.json(widgets);
            },
            function (err) {
                res.sendStatus(404);
            }
        );
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    WidgetModel
        .findWidgetById(widgetId)
        .then(
            function (widget) {
                if(widget)
                    res.json(widget);
                else
                    res.sendStatus(404)
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var newWidget = req.body;
    WidgetModel
        .updateWidget(widgetId, newWidget)
        .then(
            function (ok) {
                return WidgetModel
                            .reorderWidget(newWidget._page, newWidget.orderIdx, 0);
            }
        ).then(
            function (ok) {
                res.sendStatus(200);
            },
            function (err) {
                console.log(err);
                res.sendStatus(500);
            }
        );
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    WidgetModel
        .removeWidget(widgetId)
        .then(
            function (ok) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
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

    WidgetModel
        .findWidgetById(widgetId)
        .then(
            function (found) {
                widget = found;
                widget.name = name;
                widget.text = text;
                widget.width = width;
                widget.url = '/assignment/uploads/'+filename;
                return WidgetModel
                            .updateWidget(widgetId, widget);
            }
        ).then(
            function (ok) {
                var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId + "/page/" + pageId + "/widget/" + widgetId;
                res.redirect(callbackUrl);
            }
        );
}

function reorderWidget(req, res) {

    var pageId = req.params['pageId'];
    var initialIndex = parseInt(req.query['initial']);
    var finalIndex = parseInt(req.query['final']);

    if(finalIndex === initialIndex) {
        res.sendStatus(200);
        return;
    }

    WidgetModel
        .reorderWidget(pageId, initialIndex, finalIndex)
        .then(
            function (ok) {
                res.sendStatus(200);
            },
            function (err) {
                console.log(err);
                res.sendStatus(500);
            }
        );
}