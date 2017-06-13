/**
 * Created by ehsan on 5/24/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController);

    function WidgetListController($location, $sce, $routeParams, WidgetService, currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.reorderWidgets = reorderWidgets;
        model.trust = trust;
        model.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        model.widgetTemplateUrl = widgetTemplateUrl;

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pageId)
                .then(
                    function (widgets) {
                        model.widgets = widgets;
                    },
                    function (err) {
                        model.error = "failed to fetch widgets!"
                    }
                );
        }
        init();

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(url) {
            var embedUrl = 'https://youtube.com/embed/';
            var linkUrlParts = url.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function widgetTemplateUrl(widget) {
            return 'views/widget/templates/components/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
        }

        function reorderWidgets(initialIndex, finalIndex) {
           WidgetService
               .reorderWidget(model.pageId, initialIndex, finalIndex)
               .then(
                   function (success) {

                   }
               );
        }
    }
})();