/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('PageEditController', PageEditController);

    function PageEditController($location, $routeParams, PageService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
            model.page = PageService.findPageById(model.pageId)
        }
        init();

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function updatePage() {
            PageService.updatePage(model.page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }

        function deletePage() {
            PageService.deletePage(model.page._id);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }

    }
})();