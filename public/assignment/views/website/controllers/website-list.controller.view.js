/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {

        var model = this;

        model.userId = $routeParams['userId'];

        function init() {

            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }
        init();

    }
})();