/**
 * Created by ehsan on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetEditController', WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.widgetEditUrl = "";

        function init() {
            WidgetService
                .findWidgetById(model.widgetId)
                .then(
                    function (res) {
                        model.widget = res.data;
                        model.widgetEditUrl = 'views/widget/templates/components/widget-' + model.widget.widgetType.toLocaleLowerCase() + '-edit.view.client.html';
                    },
                    function (err) {
                        model.error = "cannot fetch widget!";
                    }
                );
        }
        init();

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .then(
                    function (res) {
                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                    },
                    function (err) {
                        model.error = "cannot delete widget!"
                    }
                );

        }

        function updateWidget(widgetId, widget) {
            WidgetService
                .updateWidget(widgetId, widget)
                .then(
                    function (res) {
                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                    },
                    function (err) {
                        model.error = "cannot update widget!"
                    }
                );

        }
    }

})();