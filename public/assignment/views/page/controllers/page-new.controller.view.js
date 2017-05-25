/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('PageNewController', PageNewController);

    function PageNewController($location, $routeParams, PageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        model.createPage = createPage;

        function createPage(page) {
            PageService.createPage(model.websiteId, page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }
})();