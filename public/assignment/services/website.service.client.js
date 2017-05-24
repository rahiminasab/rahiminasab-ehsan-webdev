/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('WebsiteService', WebsiteService);

    function WebsiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            createWebsite:      createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById:    findWebsiteById,
            updateWebsite:      updateWebsite,
            deleteWebsite:      deleteWebsite
        };

        return api;

        function createWebsite(userId, website) {
            if(findWebsiteById(website._id) === null) {
                website.developerId = userId;
                websites.push(website);
            }
        }

        function findWebsitesByUser(userId) {
            var userWebsites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId)
                    userWebsites.push(websites[w]);
            }
            return userWebsites;

        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId)
                    return websites[w];
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            var index = null;
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    index = w;
                    break;
                }
            }

            if(index !== null) {
                websites.splice(index, 1);
                websites.push(website);
            }
        }

        function deleteWebsite(websiteId) {
            var index = null;
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    index = w;
                    break;
                }
            }

            if(index !== null) {
                websites.splice(index, 1);
            }
        }

    }
})();