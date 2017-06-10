/**
 * Created by ehsan on 6/7/17.
 */
var mongoose = require('mongoose');
var PageModel = require('../page/page.model.server');
var WidgetSchema = require("./widget.schema.server");
var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.updateWidget = updateWidget;
WidgetModel.removeWidget = removeWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    widget.orderIdx = 0;
    var persistedWidget;
    return WidgetModel
        .create(widget)
        .then(
            function (widget) {
                persistedWidget = widget;
                return PageModel.addWidget(pageId, widget._id);
            }
        ).then(
            function (ok) {
                return WidgetModel.findAllWidgetsForPage(pageId);
            }
        ).then(
            function (widgets) {
                if(widgets) {
                    for(var w in widgets) {
                        if(widgets[w]._id.toString() !== persistedWidget._id.toString()) {
                            widgets[w].orderIdx++;
                            widgets[w].save();
                        }
                    }
                    return persistedWidget;
                }
            }
        )
}

function findWidgetById(widgetId) {
    return WidgetModel.findById(widgetId);
}

function findAllWidgetsForPage(pageId) {
    return WidgetModel.find({_page: pageId}).sort({orderIdx: 1});
}

function updateWidget(widgetId, newWidget) {
    return WidgetModel.update({_id: widgetId}, {$set: newWidget});
}

function removeWidget(widgetId) {
    var removedIdx;
    var pageId;
    return WidgetModel
        .findWidgetById(widgetId)
        .then(
            function (widget) {
                removedIdx = widget.orderIdx;
                pageId = widget._page;
                return WidgetModel
                            .remove({_id: widgetId});
            }
        ).then(
            function (ok) {
                return PageModel
                        .removeWidget(pageId, widgetId);
            }
        ).then(
            function (ok) {
                return WidgetModel
                    .findAllWidgetsForPage(pageId);
            }
        ).then(
            function (widgets) {
                for(var w in widgets) {
                    if(widgets[w].orderIdx > removedIdx) {
                        widgets[w].orderIdx--;
                        widgets[w].save();
                    }
                }
                return [{}];
            }
        )
}

function reorderWidget(pageId, initialIndex, finalIndex) {
    return WidgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    widgets[initialIndex].orderIdx = finalIndex;
                    widgets[initialIndex].save();
                    if(initialIndex < finalIndex) {
                        for(i = initialIndex + 1; i <= finalIndex; i++) {
                            widgets[i].orderIdx--;
                            widgets[i].save();
                        }
                    } else if(finalIndex < initialIndex) {
                        for(i = initialIndex - 1; i >= finalIndex; i--) {
                            widgets[i].orderIdx++;
                            widgets[i].save();
                        }
                    }
                    return [{}];
                }
            )
}
