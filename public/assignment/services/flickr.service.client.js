/**
 * Created by ehsan on 6/6/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('FlickrService', FlickrService);

    function FlickrService ($http) {
        var key = "c0affc3a2e78719c17b9bf2547f591ee";//process.env.FLICKR_API_KEY;
        var secret = "e1dc8cd13fca6f93";//process.env.FLICKR_API_SECRET;
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        this.searchPhotos = searchPhotos;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);

        }
    }

})();