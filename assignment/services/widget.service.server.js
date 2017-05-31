/**
 * Created by ehsan on 5/30/17.
 */
module.exports = function(app) {

    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": "2", "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Gather all the knowledge you need to learn a new skill or refine an existing one with online courses from <a href="http://click.linksynergy.com/fs-bin/click?id=G5Efv5Bc9nM&amp;offerid=323057.7152&amp;type=3&amp;subid=0" target="_blank" rel="noopener"><strong>Udemy</strong></a>. Gizmodo readers can get over 40,000 courses for just <a href="http://click.linksynergy.com/fs-bin/click?id=G5Efv5Bc9nM&amp;offerid=323057.7152&amp;type=3&amp;subid=0" target="_blank" rel="noopener">$10 a piece</a> with code <strong>UDLEARNFEST</strong> and save hundreds while you learn at your own pace.<br></p>'},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": '<p>Following a ban of in cabin electronic devices that are <a href="http://gizmodo.com/us-bans-electronic-devices-on-flights-from-8-muslim-cou-1793472925#_ga=2.17001913.1691964445.1496008438-776204539.1477142915" rel="nofollow">“larger than a smartphone”</a> on flights coming to the US from locations in eight majority-Muslim countries, it appears the White House wants to expand its <a href="http://gizmodo.com/trumps-electronics-ban-on-airplanes-makes-less-sense-ev-1793518279#_ga=2.191279020.760292626.1496006477-776204539.1477142915" rel="nofollow">curious policy</a>. This morning, U.S. Homeland Security Secretary John Kelly told Fox News’ Chris Wallace that he…<span class="read-more-placeholder"></span></p>'}
    ];
    
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    
    function createWidget(req, res) {
        var widget = req.body;
        widget._id = ""+Math.floor(Math.random()*100+1);
        widget.pageId = req.params.pageId;
        widgets.push(widget);
        res.json(widget);
    }
    
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var result = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId)
                result.push(widgets[w]);
        }
        res.json(result);
    }
    
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                return;
            }

        }
    }
    
    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
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
            widgets.push(newWidget);
            res.json(newWidget);
        }
        res.sendStatus(404);
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
        }
        res.sendStatus(404);
    }
    
    
};