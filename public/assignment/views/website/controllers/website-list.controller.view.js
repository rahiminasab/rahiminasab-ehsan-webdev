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

            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(
                    function (res) {
                        model.websites = res.data;
                    },
                    function (err) {
                        model.error = "cannot fetch websites for user!"
                    }
                );
        }
        init();

    }
})();