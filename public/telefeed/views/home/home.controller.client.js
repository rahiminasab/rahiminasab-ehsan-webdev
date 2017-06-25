/**
 * Created by ehsan on 6/18/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('HomeController', HomeController);

    function HomeController($location, ChannelService) {
        var model = this;

        model.searchChannels = searchChannels;
        model.bckUrl = '';

        function init() {
        }
        init();



        function searchChannels(searchTerm) {
            $location.url('/channel?q=' + searchTerm);

        }
    }

})();