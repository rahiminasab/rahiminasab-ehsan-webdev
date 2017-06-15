/**
 * Created by ehsan on 6/14/17.
 */
module.exports = function() {
    return {
        persistImportedData: persistImportedData
    };

    function persistImportedData(importedData) {
        console.log("I am being called!");
        for (var i in importedData) {
            var up = importedData[i];
            if (up.channel_post) {
                var post = up.channel_post;
                console.log(post);
            }
        }
    }
};
