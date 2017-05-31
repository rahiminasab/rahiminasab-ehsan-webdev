/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);

    function PageListController($routeParams, PageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

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
        }
        init();

    }
})();