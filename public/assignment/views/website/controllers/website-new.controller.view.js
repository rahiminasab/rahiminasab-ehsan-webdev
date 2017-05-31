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

        model.createWebsite = createWebsite;

        function createWebsite(website) {
            WebsiteService
                .createWebsite(model.userId, website)
                .then(
                    function (res) {
                        model.message = "website " + website.name + " has been created successfully";
                        $location.url('/user/' + model.userId + '/website');
                    },
                    function (err) {
                        model.error = "website creation failed!"
                    }
                );
        }

    }
})();