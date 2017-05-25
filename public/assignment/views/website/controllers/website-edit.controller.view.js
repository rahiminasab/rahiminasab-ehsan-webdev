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
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
            model.website = WebsiteService.findWebsiteById(model.websiteId);
        }
        init();

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            WebsiteService.updateWebsite(model.website);
            $location.url('/user/' + model.userId + '/website');
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.website._id);
            $location.url('/user/' + model.userId + '/website');
        }
    }

})();