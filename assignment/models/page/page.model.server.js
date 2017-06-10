/**
 * Created by ehsan on 6/7/17.
 */
var mongoose = require('mongoose');
var WebsiteModel = require('../website/website.model.server');
var PageSchema = require("./page.schema.server");
var PageModel = mongoose.model('PageModel', PageSchema);

PageModel.createPage = createPage;
PageModel.findPageById = findPageById;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.updatePage = updatePage;
PageModel.removePage = removePage;
PageModel.addWidget = addWidget;
PageModel.removeWidget = removeWidget;

module.exports = PageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return PageModel
        .create(page)
        .then(
            function (page) {
                return WebsiteModel
                    .addPage(websiteId, page._id);
            }
        );
}

function findPageById(pageId) {
    return PageModel.findById(pageId);
}

function findAllPagesForWebsite(websiteId) {
    return PageModel.find({_website: websiteId});
}

function updatePage(pageId, newPage) {
    return PageModel.update({_id: pageId}, {$set: newPage});
}

function removePage(pageId) {
    return PageModel
        .findPageById(pageId)
        .then(
            function (page) {
                PageModel
                    .remove({_id: pageId})
                    .then(
                        function (ok) {
                            WebsiteModel
                                .removePage(page._website, pageId);
                        }
                    )
            }
        );
}

function addWidget(pageId, widgetId) {
    PageModel
        .findPageById(pageId)
        .then(
            function (page) {
                page.widgets.push(widgetId);
                return page.save();
            }
        )
}

function removeWidget(pageId, widgetId) {
    PageModel
        .findPageById(pageId)
        .then(
            function (page) {
                var index = page.widgets.indexOf(widgetId);
                page.widgets.splice(index, 1);
                return page.save();
            }
        )
}