/**
 * Created by ehsan on 6/6/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable() {

        function linkFunction(scope, element) {
            var initialIndex = -1;
            var finalIndex = -1;
            $(element)
                .sortable({
                    axis: 'y',
                    start: function (event, ui) {
                        initialIndex = ui.item.index();
                    },
                    stop: function (event, ui) {
                        finalIndex = ui.item.index();
                        scope.model.reorderWidgets(initialIndex, finalIndex);
                    }
                }
            );
        }

        return {
            link: linkFunction
        }

    }
})();