/**
 * Created by ehsan on 5/24/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
        }
        model.trust = trust;
        model.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        model.widgetTemplateUrl = widgetTemplateUrl;

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
    }
})();