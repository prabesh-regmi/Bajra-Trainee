odoo.define('todo.list.name', function (require) {
    'use strict';
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    const SingleListNameWidget = require('todo.single.list.name');
    const list_name = Widget.extend({
        init: function (parent, data) {
            var self = this;
            this._super.apply(this, arguments);
            this.list_names = []
            this.list_names_widget = []
        },
        willStart: function () {
            var self = this;
            var listName = Promise.all([this._rpc({
                model: 'todo.list',
                method: "get_all_tasks_list",
                args: [{}]
            }).then(response => {
                self.list_names = response.data;
                // response.data.forEach(i=>self.list_names.push(i))
                // console.log("list names", response.data)
            })]);
            return Promise.all([this._super.apply(this,arguments),listName])
        },
        start: function () {
            var self = this;
            this.$list_name = $(QWeb.render('todo.list.name'));
            this.$list_name.appendTo(this.$el);

            // task list widget create and append to client action
            this.list_names.forEach(item=>{
                var list_name = new SingleListNameWidget(self,item);
                this.list_names_widget.push(list_name);
            });
            // var list_name1 = new SingleListNameWidget(self);
            // this.list_names.push(list_name1);
            this.list_names_widget.forEach(item => {
                item.appendTo(self.$('.single-list-name-section'));
            });

            return Promise.all([this._super.apply(this, arguments)])
        },
    })
    return list_name;
});
