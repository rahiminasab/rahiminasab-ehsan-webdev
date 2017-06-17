/**
 * Created by ehsan on 6/10/17.
 */
(function () {
    angular
        .module('TeleFeed', [])
        .controller('teleFeedController', teleFeedController);

    function teleFeedController($http) {
        var model = this;
        model.searchChannelsByTitle = searchChannelsByTitle;
        model.retrievePostsForChannel = retrievePostsForChannel;


        function searchChannelsByTitle(titleKeyword) {
            $http
                .get("/api/telefeed/channel?title="+titleKeyword)
                .then(
                    function (res) {
                        model.channels =  res.data;
                    },
                    function (err) {
                        console.log( err);
                    }
                );
        }

        function retrievePostsForChannel(channel) {
            model.channel = channel;

            $http
                .get("/api/telefeed/channel/" + channel._id + "/post")
                .then(
                    function (res) {
                        model.posts = res.data;
                    },
                    function (err) {
                        console.log(err);
                    }
                )
        }
    }

})();