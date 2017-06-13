/**
 * Created by ehsan on 6/10/17.
 */
(function () {
    angular
        .module('TeleFeed', [])
        .controller('teleFeedController', teleFeedController);

    function teleFeedController($http) {
        var model = this;
        model.getUpdates = getUpdates;


        function getUpdates() {
            $http
                .get("https://api.telegram.org/bot373205519:AAGhSpu9yi4QmkB_HgY1LedhnNDmxQkxxWc/getUpdates")
                .then(
                    function (res) {
                        model.messages =  res.data;
                    },
                    function (err) {
                        console.log("err: " + err);
                    }
                );
        }
    }

})();