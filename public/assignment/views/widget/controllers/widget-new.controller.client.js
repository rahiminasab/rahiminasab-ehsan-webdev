/**
 * Created by ehsan on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetNewController', WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.createNewHeading = createNewHeading;
        model.createNewImage = createNewImage;
        model.createNewYoutube = createNewYoutube;

        function createNewHeading() {
            var widget = {
                "widgetType": "HEADING",
                "size" : 3
            };
            createNewWidget(widget);
        }

        function createNewImage() {
            var widget = {
                "widgetType": "IMAGE",
                "width" : "100%"
            };
            createNewWidget(widget);
        }

        function createNewYoutube() {
            var widget = {
                "widgetType": "YOUTUBE",
                "width" : "100%"
            };
            createNewWidget(widget);
        }

        function createNewWidget(widget) {
            WidgetService
                .createWidget(model.pageId, widget)
                .then(
                    function (widget) {
                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
                    },
                    function (err) {
                        model.error = "cannot create new widget!"
                    }
                );

        }

    }


})();