/**
 * Created by ehsan on 5/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('WidgetService',WidgetService);

    function WidgetService($http) {

        return {
            createWidget:        createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById:      findWidgetById,
            updateWidget:        updateWidget,
            deleteWidget:        deleteWidget,
            reorderWidget:      reorderWidget
        };
        
        function createWidget(pageId, widget) {
            return $http
                .post("/api/page/" + pageId + "/widget", widget)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }
        
        function findWidgetsByPageId(pageId) {
            return $http
                .get("/api/page/" + pageId + "/widget")
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }
        
        function findWidgetById(widgetId) {
            return $http
                .get("/api/widget/" + widgetId)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }
        
        function updateWidget(widgetId, widget) {
            return $http
                .put("/api/widget/" + widgetId, widget)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }
        
        function deleteWidget(widgetId) {
            return $http
                .delete("/api/widget/" + widgetId)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }

        function reorderWidget(pageId, initialIndex, finalIndex) {
            return $http
                .put(" /page/" + pageId + "/widget?initial=" + initialIndex + "&final=" + finalIndex)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                )
        }
    }
})();