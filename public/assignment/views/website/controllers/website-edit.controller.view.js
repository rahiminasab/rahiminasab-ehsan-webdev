/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteEditController', WebsiteEditController);

    function WebsiteEditController($location, $routeParams, WebsiteService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

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

            WebsiteService
                .findWebsiteById(model.websiteId)
                .then(
                    function (res) {
                        model.website = res.data;
                    },
                    function (err) {
                        model.error = "cannot retrieve website!";
                    }
                );
        }
        init();

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            WebsiteService
                .updateWebsite(model.website)
                .then(
                    function (res) {
                        $location.url('/user/' + model.userId + '/website');
                    },
                    function (err) {
                        model.error = "cannot update the website!"
                    }
                );

        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(model.website._id)
                .then(
                    function (res) {
                        $location.url('/user/' + model.userId + '/website');
                    },
                    function (err) {
                        model.error = "cannot delete the website!"
                    }
                );
        }
    }

})();