/**
 * Created by ehsan on 6/25/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('AdminChannelsController', AdminChannelsController);

    function AdminChannelsController(ChannelService, $location) {
        var model = this;
        model.bckUrl = '#!/admin';

        function init() {

            ChannelService
                .findChannels()
                .then(
                    function (channels) {
                        model.channels = channels;
                    }
                )

        }
        init();
    }
})();