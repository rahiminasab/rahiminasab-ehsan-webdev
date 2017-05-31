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
            return $http.post("/api/website/" + websiteId + "/page", page);
        }
        
        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page");
        }
        
        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
        }
        
        function updatePage(pageId, page) {
            return $http.put("/api/page/" + pageId, page);
        }
        
        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
        }
    }

})();
