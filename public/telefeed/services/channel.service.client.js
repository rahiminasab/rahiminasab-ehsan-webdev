/**
 * Created by ehsan on 6/17/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .service('ChannelService', ChannelService);

    function ChannelService($http) {

        this.findChannels    = findChannels;
        this.findChannelById = findChannelById;
        this.updateChannel   = updateChannel;
        this.deleteChannel   = deleteChannel;

        function findChannels(searchTerm) {
            var url = '/api/telefeed/channel';
            if(searchTerm)
                url += '?title=' + searchTerm;
            $http
                .get(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                )
        }

        function findChannelById(channelId) {
            var url = '/api/telefeed/channel/' + channelId;
            $http
                .get(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                )
        }

        function updateChannel(channelId, channel) {
            var url = '/api/telefeed/channel/' + channelId;
            $http
                .put(url, channel)
                .then(
                    function (response) {
                        return response.data;
                    }
                )
        }

        function deleteChannel(channelId) {
            var url = '/api/telefeed/channel/' + channelId;
            $http
                .delete(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                )
        }
    }
})();