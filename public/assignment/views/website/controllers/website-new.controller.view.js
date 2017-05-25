/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteNewController', WebsiteNewController);

    function WebsiteNewController($location, $routeParams, WebsiteService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }
        init();

        model.createWebsite = createWebsite;

        function createWebsite(website) {
            WebsiteService.createWebsite(model.userId, website);
            $location.url('/user/' + model.userId + '/website');
        }

    }
})();