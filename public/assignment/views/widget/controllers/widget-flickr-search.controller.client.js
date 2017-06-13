/**
 * Created by ehsan on 6/6/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, FlickrService, WidgetService, currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {
            WidgetService
                .findWidgetById(model.widgetId)
                .then(
                    function (widget) {
                        model.widget = widget;
                    },
                    function (err) {
                        model.error = "cannot fetch widget!";
                    }
                );
        }
        init();

        function searchPhotos (searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(
                    function(response) {
                        var data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        model.photos = data.photos;
                    }
                );
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            model.widget.url = url;
            WidgetService
                .updateWidget(model.widgetId, model.widget)
                .then(
                    function (success) {
                        $location.url("/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);
                    }
                );
        }


    }
})();