odoo.define('todo.list.name', function (require) {
    'use strict';
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    const SingleListNameWidget = require('todo.single.list.name');

    // Widget to display list in dashboard
    const list_name = Widget.extend({
        init: function (parent, data) {
            var self = this;
            this._super(parent);
            this.list_names = []
            this.list_names_widget = []
        },
        willStart: function () {
            var self = this;
            // Get all list names
            var listName = Promise.all([this._rpc({
                model: 'todo.list',
                method: "get_all_tasks_list",
                args: [{}]
            }).then(response => {
                // Array of list name save in list_name
                self.list_names = response.data;
            })]);
            return Promise.all([listName])
        },
        start: function () {
            var self = this;
            // Render template using qweb
            this.$list_name = $(QWeb.render('todo.list.name',{'list_length':self.list_names.length}));
            this.$list_name.appendTo(this.$el);

            // Task list widget create and append to client action
            // Create widget for every list names
            this.list_names.forEach(item=>{
                var list_name = new SingleListNameWidget(self,item);
                list_name.appendTo(self.$('.single-list-name-section'));
            });
        },
    })
    return list_name;
});
