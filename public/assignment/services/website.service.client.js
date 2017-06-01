/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('WebsiteService', WebsiteService);

    function WebsiteService($http) {

            this.createWebsite =      createWebsite;
            this.findWebsitesByUser = findWebsitesByUser;
            this.findWebsiteById =    findWebsiteById;
            this.updateWebsite =      updateWebsite;
            this.deleteWebsite =      deleteWebsite;

        function createWebsite(userId, website) {
            return $http
                .post("/api/user/" + userId + "/website", website)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findWebsitesByUser(userId) {
            return $http
                .get("/api/user/" + userId + "/website")
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findWebsiteById(websiteId) {
            return $http
                .get("/api/website/" + websiteId)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function updateWebsite(websiteId, website) {
            return $http
                .put("/api/website/" + websiteId, website)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }

        function deleteWebsite(websiteId) {
            return $http
                .delete("/api/website/" + websiteId)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }

    }
})();