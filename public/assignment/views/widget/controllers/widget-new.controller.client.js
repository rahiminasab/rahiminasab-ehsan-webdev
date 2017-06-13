/**
 * Created by ehsan on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetNewController', WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService, currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.createNewHeading = createNewHeading;
        model.createNewImage = createNewImage;
        model.createNewYoutube = createNewYoutube;
        model.createNewHTML = createNewHTML;
        model.createNewTextInput = createNewTextInput;

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

        function createNewHTML() {
            var widget = {
                "widgetType": "HTML"
            };
            createNewWidget(widget);
        }

        function createNewTextInput() {
            var widget = {
                "widgetType": "TEXT"
            };
            createNewWidget(widget);
        }

        function createNewWidget(widget) {
            WidgetService
                .createWidget(model.pageId, widget)
                .then(
                    function (widget) {
                        $location.url("/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
                    },
                    function (err) {
                        model.error = "cannot create new widget!"
                    }
                );

        }

    }


})();