/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('PageService',PageService);

    function PageService($http) {

        return {
            createPage:          createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById:        findPageById,
            updatePage:          updatePage,
            deletePage:          deletePage
        };

        function createPage(websiteId, page) {
            return $http
                .post("/api/website/" + websiteId + "/page", page)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }
        
        function findPageByWebsiteId(websiteId) {
            return $http
                .get("/api/website/" + websiteId + "/page")
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }
        
        function findPageById(pageId) {
            return $http
                .get("/api/page/" + pageId)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }
        
        function updatePage(pageId, page) {
            return $http
                .put("/api/page/" + pageId, page)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }
        
        function deletePage(pageId) {
            return $http
                .delete("/api/page/" + pageId)
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
