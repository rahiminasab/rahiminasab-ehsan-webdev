/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('WebsiteService', WebsiteService);

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

            this.createWebsite =      createWebsite;
            this.findWebsitesByUser = findWebsitesByUser;
            this.findWebsiteById =    findWebsiteById;
            this.updateWebsite =      updateWebsite;
            this.deleteWebsite =      deleteWebsite;

        function createWebsite(userId, website) {
            if(findWebsiteById(website._id) === null) {
                website.developerId = userId;
                website._id = ""+Math.floor((Math.random() * 100) + 1);
                websites.push(website);
            }
        }

        function findWebsitesByUser(userId) {
            var userWebsites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    websites[w].created = new Date();
                    websites[w].accessed = new Date();
                    userWebsites.push(websites[w]);
                }
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
            var website = findWebsiteById(websiteId);
            var index = websites.indexOf(website);

            /*for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    index = w;
                    break;
                }
            }*/

            if(index !== null || typeof index !== 'undefined') {
                websites.splice(index, 1);
            }
        }

    }
})();