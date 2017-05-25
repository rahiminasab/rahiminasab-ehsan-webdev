/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('PageService',PageService);

    function PageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            createPage:          createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById:        findPageById,
            updatePage:          updatePage,
            deletePage:          deletePage
        };

        return api;

        function createPage(websiteId, page) {
            if(findPageById(page._id) === null) {
                page.websiteId = websiteId;
                page._id = ""+Math.floor((Math.random() * 100) + 1);
                pages.push(page);
            }
        }
        
        function findPageByWebsiteId(websiteId) {
            var websitePages = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    pages[p].created = new Date();
                    pages[p].accessed = new Date();
                    websitePages.push(pages[p]);
                }
            }
            return websitePages;
        }
        
        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId)
                    return pages[p];
            }
            return null;
        }
        
        function updatePage(pageId, page) {
            var index = null;
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    index = p;
                    break;
                }
            }

            if(index !== null) {
                pages.splice(index, 1);
                pages.push(page);
            }
        }
        
        function deletePage(pageId) {
            var index = null;
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    index = p;
                    break;
                }
            }

            if(index !== null) {
                pages.splice(index, 1);
            }
        }
    }

})();
