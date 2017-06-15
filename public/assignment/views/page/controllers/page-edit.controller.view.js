/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('PageEditController', PageEditController);

    function PageEditController($location, $routeParams, PageService, currentUser) {

        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            PageService
                .findPageByWebsiteId(model.websiteId)
                .then(
                    function (pages) {
                        model.pages = pages;
                    },
                    function (err) {
                        model.error = "cannot retrieve website pages!"
                    }
                );
            PageService
                .findPageById(model.pageId)
                .then(
                    function (page) {
                        model.page = page;
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
            if(model.page === null || typeof model.page === 'undefined' || !isValidString(model.page.name)) {
                model.error = 'page name cannot be empty!';
                return;
            }
            PageService
                .updatePage(model.pageId, model.page)
                .then(
                    function (success) {
                        $location.url('/website/' + model.websiteId + '/page');
                    },
                    function (err) {
                        model.error = "cannot update the page!"
                    }
                );

        }

        function deletePage() {
            PageService
                .deletePage(model.pageId)
                .then(
                    function (deleted) {
                        $location.url('/website/' + model.websiteId + '/page');
                    },
                    function (err) {
                        model.error = "cannot delete the page!"
                    }
                );

        }

        function isValidString(s) {
            return (s !== null && s !== '' && typeof s !== 'undefined');
        }

    }
})();