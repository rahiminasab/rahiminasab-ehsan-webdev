/**
 * Created by ehsan on 6/18/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('HomeController', HomeController);

    function HomeController($location, ChannelService, Admin) {
        var model = this;

        model.searchChannels = searchChannels;
        model.bckUrl = '';

        function init() {
            model.admin = Admin;
        }
        init();



        function searchChannels(searchTerm) {
            if(!searchTerm)
                return;
            $location.url('/channel?q=' + searchTerm);

        }
    }

})();