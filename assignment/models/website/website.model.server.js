/**
 * Created by ehsan on 6/7/17.
 */
var mongoose = require('mongoose');
var UserModel = require("../user/user.model.server");

var WebsiteSchema = require("./website.schema.server");
var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

WebsiteModel.createWebsite = createWebsite;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.removeWebsite = removeWebsite;
WebsiteModel.addPage = addPage;
WebsiteModel.removePage = removePage;

module.exports = WebsiteModel;

function createWebsite(userId, website) {
    website._user = userId;
    return WebsiteModel
        .create(website)
        .then(
            function (website) {
                return UserModel
                    .addWebsite(userId, website._id);
            }
        );
}

function findWebsiteById(websiteId) {
    return WebsiteModel.findById(websiteId);
}

function findAllWebsitesForUser(userId) {
    return WebsiteModel.find({_user: userId});
}

function updateWebsite(websiteId, newWebsite) {
    return WebsiteModel.update({_id: websiteId}, {$set: newWebsite});
}

function removeWebsite(websiteId) {

    return WebsiteModel
        .findWebsiteById(websiteId)
        .then(
            function (website) {
                WebsiteModel
                    .remove({_id: websiteId})
                    .then(
                        function (ok) {
                            return UserModel
                                .removeWebsite(website._user, websiteId);
                        }
                    )
            }
        );
}

function addPage(websiteId, pageId) {
    WebsiteModel
        .findWebsiteById(websiteId)
        .then(
            function (website) {
                website.pages.push(pageId);
                return website.save();
            }
        )
}

function removePage(websiteId, pageId) {
    WebsiteModel
        .findWebsiteById(websiteId)
        .then(
            function (website) {
                var index = website.pages.indexOf(pageId);
                website.pages.splice(index, 1);
                return website.save();
            }
        )
}