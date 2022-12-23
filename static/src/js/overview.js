odoo.define('todo.overview', function (require) {
    'use strict';
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    // Create widget for overvew section in dashboard
    const overview = Widget.extend({
        events: {
            'click .today-task': '_onClickOverViewTask' // To navigate between today's task, upcoming task and overdue task
        },
        init: function (parent) {
            var self = this;
            this._super(parent);
            this.all_tasks = [];
            this.today_tasks = [];
            this.upcoming_tasks = [];
            this.overdue_tasks = [];
            // For count of today's task, upcoming task and overdue task
            this.count = {}
        },
        willStart: function () {
            var self = this;
            // Get all list name and assign to list_names
            var listName = this._rpc({
                model: 'todo.list',
                method: "get_all_tasks_list",
                args: [{}]
            }).then(response => {
                self.list_names = response.data;
            });
            // Get all tasks and assign to all_task variable
            var allTask = this._rpc({
                model: 'todo.task',
                method: "get_all_tasks",
                args: [{}]
            }).then(response => {
                self.all_tasks = response.data;
                // Assign today,upcoming and overdue tasks on the basic of todo date
                self._getTasks(self.all_tasks)
            });
            return Promise.all([listName, allTask]);
        },
        start: function () {
            var self = this;
            self.count = { 'today': self.today_tasks.length, 'upcoming': self.upcoming_tasks.length, 'overdue': self.overdue_tasks.length };
            // Render overview section in dashboard
            this.$overview = $(QWeb.render('todo.overview', { "count": self.count }));
            this.$overview.appendTo(this.$el);
        },
        // To trigger custom event and also pass event 
        _onClickOverViewTask: function (e) {
            this.trigger_up('quickSectionChange',e);
        },
        // Function to seperate tasks to today, upcoming and overdue on the basic of todo date
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
