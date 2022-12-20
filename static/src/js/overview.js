odoo.define('todo.overview', function (require) {
    'use strict';
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    const QuickTaskListWidget = require('todo.quick.task.list');
    const overview = Widget.extend({
        events: {
            'click .today-task': '_onClickOverViewTask'
        },
        init: function (parent) {
            var self = this;
            this._super.apply(this, arguments);
            this.all_tasks = [];
            this.today_tasks = [];
            this.upcoming_tasks = [];
            this.overdue_tasks = [];
            this.count = {}
        },
        willStart: function () {
            var self = this;
            var listName = this._rpc({
                model: 'todo.list',
                method: "get_all_tasks_list",
                args: [{}]
            }).then(response => {
                self.list_names = response.data;
                // response.data.forEach(i=>self.list_names.push(i))
                // console.log("list names", response.data)
            });
            var allTask = this._rpc({
                model: 'todo.task',
                method: "get_all_tasks",
                args: [{}]
            }).then(response => {
                self.all_tasks = response.data;
                self._getTasks(self.all_tasks)
            });
            return Promise.all([this._super.apply(this, arguments), listName, allTask]);
        },
        start: function () {
            var self = this;
            // debugger
            self.count = { 'today': self.today_tasks.length, 'upcoming': self.upcoming_tasks.length, 'overdue': self.overdue_tasks.length };
            this.$overview = $(QWeb.render('todo.overview', { "count": self.count }));
            // debugger
            this.$overview.appendTo(this.$el);
            return Promise.all([this._super.apply(this, arguments)])
        },
        _onClickOverViewTask: function (e) {
            this.trigger_up('quickSectionChange',e);
            console.log("from overview", e.target)
        },
        _getTasks: function (tasks) {
            var self = this;
            var today = new Date();
            tasks.forEach(task => {
                var tasks_date = new Date(task.date_time)
                if (today.toDateString() == tasks_date.toDateString()) {
                    self.today_tasks.push(task);
                }
                else if (today < tasks_date) {
                    self.upcoming_tasks.push(task);
                }
                else if (today > tasks_date) {
                    self.overdue_tasks.push(task);
                }
            });
        },
    })
    return overview;
});
