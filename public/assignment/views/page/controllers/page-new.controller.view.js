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

        model.createPage = createPage;

        function createPage(page) {
            PageService
                .createPage(model.websiteId, page)
                .then(
                    function (res) {
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                    },
                    function (err) {
                        model.error = "cannot create page " + page.name;
                    }
                );

        }
    }
})();