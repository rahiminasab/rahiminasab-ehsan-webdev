/**
 * Created by ehsan on 6/25/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('AdminController', AdminController);

    function AdminController() {
        var model = this;
        model.bckUrl = '#!/';
    }
})();