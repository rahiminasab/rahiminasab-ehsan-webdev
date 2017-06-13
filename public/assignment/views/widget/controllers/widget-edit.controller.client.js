/**
 * Created by ehsan on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetEditController', WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService, currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.widgetEditUrl = "";

        function init() {
            WidgetService
                .findWidgetById(model.widgetId)
                .then(
                    function (widget) {
                        model.widget = widget;
                        model.widgetEditUrl = 'views/widget/templates/components/widget-' + widget.widgetType.toLocaleLowerCase() + '-edit.view.client.html';
                    },
                    function (err) {
                        model.error = "cannot fetch widget!";
                    }
                );
        }
        init();

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function updateWidget(widgetId, widget) {
            WidgetService
                .updateWidget(widgetId, widget)
                .then(
                    function (success) {
                        $location.url("/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                    },
                    function (err) {
                        model.error = "cannot update widget!"
                    }
                );

        }

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .then(
                    function (deleted) {
                        $location.url("/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                    },
                    function (err) {
                        model.error = "cannot delete widget!"
                    }
                );

        }

    }

})();