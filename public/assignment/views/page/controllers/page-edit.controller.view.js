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
            PageService
                .findPageByWebsiteId(model.websiteId)
                .then(
                    function (res) {
                        model.pages = res.data;
                    },
                    function (err) {
                        model.error = "cannot retrieve website pages!"
                    }
                );
            PageService
                .findPageById(model.pageId)
                .then(
                    function (res) {
                        model.page = res.data;
                    },
                    function (err) {
                        model.error = "cannot retrieve page!"
                    }
                );
        }
        init();

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function updatePage() {
            PageService
                .updatePage(model.pageId, model.page)
                .then(
                    function (res) {
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                    },
                    function (err) {
                        model.error = "canot update the page!"
                    }
                );

        }

        function deletePage() {
            PageService
                .deletePage(model.pageId)
                .then(
                    function (res) {
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                    },
                    function (err) {
                        model.error = "cannot delete the page!"
                    }
                );

        }

    }
})();