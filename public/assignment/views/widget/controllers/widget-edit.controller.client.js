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

        function init() {
            model.widget = WidgetService.findWidgetById(model.widgetId);
        }
        init();

        model.widgetEditUrl = widgetEditUrl;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function widgetEditUrl() {
            return 'views/widget/templates/components/widget-' + model.widget.widgetType.toLocaleLowerCase() + '-edit.view.client.html';
        }

        function deleteWidget(widgetId) {
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }

        function updateWidget(widgetId, widget) {
            WidgetService.updateWidget(widgetId, widget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }
    }

})();