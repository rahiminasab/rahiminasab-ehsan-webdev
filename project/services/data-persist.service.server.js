/**
 * Created by ehsan on 6/14/17.
 */

var ChannelModel = require('../models/channel/channel.model.server');
var PostModel    = require('../models/post/post.model.server');

module.exports = function() {
    return {
        persistImportedData: persistImportedData
    };

    function persistImportedData(importedData) {
        for (var i in importedData) {
            var up = importedData[i].channel_post;
            console.log(up);
            if (up) {
                var channelObj = fetchChannelObj(up);
                var postObj = fetchPostObj(up);
                if(channelObj !== 0 && postObj !== 0)
                    persistInfo(channelObj, postObj);
            }
        }
    }

    function fetchChannelObj(up) {
        var chat = up.chat;
        if(!chat)
            return 0;

        return {
            telegram_id: chat.id,
            title: chat.title,
            author: chat.username
        };
    }

    function fetchPostObj(up) {
        if(!up.text)
            return 0;
        return {
            telegram_creation_date: up.date,
            telegram_message_id: up.message_id,
            text: up.text
        }
    }

    function persistInfo(channelObj, postObj) {

        ChannelModel
            .createChannelIfNotExists(channelObj)
            .then(
                function (channel) {
                    postObj._channel = channel._id;
                    PostModel
                        .createPost(postObj);
                }
            );
    }
};
