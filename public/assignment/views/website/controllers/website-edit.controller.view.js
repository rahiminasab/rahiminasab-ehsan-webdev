/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteEditController', WebsiteEditController);

    function WebsiteEditController($location, $routeParams, WebsiteService, currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];

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

            WebsiteService
                .findWebsiteById(model.websiteId)
                .then(
                    function (website) {
                        model.website = website;
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
            if(typeof model.website === 'undefined' || !isValidString(model.website.name)) {
                model.error = 'website name cannot be empty!';
                return;
            }
            WebsiteService
                .updateWebsite(model.websiteId, model.website)
                .then(
                    function (success) {
                        $location.url('/website');
                    },
                    function (err) {
                        model.error = "cannot update the website!"
                    }
                );

        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(model.websiteId)
                .then(
                    function (deleted) {
                        $location.url('/website');
                    },
                    function (err) {
                        model.error = "cannot delete the website!"
                    }
                );
        }

        function isValidString(s) {
            return (s !== null && s !== '' && typeof s !== 'undefined');
        }
    }

})();