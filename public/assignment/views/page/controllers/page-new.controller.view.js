/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('PageNewController', PageNewController);

    function PageNewController($location, $routeParams, PageService, currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];

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
        }
        init();

        model.createPage = createPage;

        function createPage(page) {
            if(page === null || typeof page === 'undefined' || !isValidString(page.name)) {
                model.error = 'page name cannot be empty!';
                return;
            }
            PageService
                .createPage(model.websiteId, page)
                .then(
                    function (page) {
                        $location.url('/website/' + model.websiteId + '/page');
                    },
                    function (err) {
                        model.error = "cannot create page " + page.name;
                    }
                );

        }

        function isValidString(s) {
            return (s !== null && s !== '' && typeof s !== 'undefined');
        }
    }
})();