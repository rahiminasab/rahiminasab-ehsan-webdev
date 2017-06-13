/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteNewController', WebsiteNewController);

    function WebsiteNewController($location, $routeParams, WebsiteService, currentUser) {
        var model = this;

        model.userId = currentUser._id;

        function init() {
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(
                    function (websites) {
                        model.websites = websites;
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
                    function (website) {
                        model.message = "website " + website.name + " has been created successfully";
                        $location.url('/website');
                    },
                    function (err) {
                        model.error = "website creation failed!"
                    }
                );
        }

    }
})();