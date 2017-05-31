/**
 * Created by ehsan on 5/30/17.
 */
module.exports = function(app) { // app is an instance of express

    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);

    /* app.get("/say/:something", function(req, res){
     var msg = req.params['something'];
     res.send({message:msg})
     });*/


};