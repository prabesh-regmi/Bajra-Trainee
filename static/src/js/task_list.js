odoo.define('todo.task.list', function (require) {
    'use strict';
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    const task_list = Widget.extend({
        init: function (parent, data) {
            var self = this;
            this._super.apply(this, arguments);
            this.tasks = data;
            console.log(this.tasks)
        },
        start: function(){
            var self = this;
            this.$task_list = $(QWeb.render('todo.task',{"tasks":this.tasks}));
            this.$task_list.appendTo(this.$el);
            return Promise.all([this._super.apply(this,arguments)])
        },
    })
    return task_list;
});
