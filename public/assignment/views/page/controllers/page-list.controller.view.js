/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);

    function PageListController($routeParams, PageService, currentUser) {

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

    }
})();