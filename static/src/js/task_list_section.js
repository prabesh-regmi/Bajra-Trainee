odoo.define('todo.quick.task.list', function (require) {
    'use strict';
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    const TaskListWidget = require('todo.task.list');
    const quickTaskList = Widget.extend({
        init: function (parent, data) {
            var self = this;
            this._super.apply(this, arguments);
            this.all_tasks = [];
            this.today_tasks = [];
            this.upcoming_tasks = [];
            this.overdue_tasks = [];
            this.quick_task = data;
            this.show_task = [];
        },
        willStart: function () {
            var self = this;
            var allTask = this._rpc({
                model: 'todo.task',
                method: "get_all_tasks",
                args: [{}]
            }).then(response => {
                self.all_tasks = response.data;
                self._getTasks(self.all_tasks)
            });
            return Promise.all([this._super.apply(this, arguments), allTask]);
        },
        start: function () {
            var self = this;
            var renderData = {
                'displayOption':self.quick_task,
                'tasks':{
                    'today_tasks':self.today_tasks,
                    'upcoming_tasks':self.upcoming_tasks,
                    'overdue_tasks':self.overdue_tasks
                }
            }
            this.$QuickTask = $(QWeb.render('quick.task.list.section',renderData));
            this.$QuickTask.appendTo(this.$el);
            if(this.quick_task == 'today'){
                this.show_task = this.today_tasks;
            } else if(this.quick_task == 'upcoming'){
                this.show_task = this.upcoming_tasks;
            } else if(this.quick_task == 'overdue'){
                this.show_task = this.overdue_tasks;
            }
            this.task_list = new TaskListWidget(self, self.show_task);
            this.task_list.appendTo(self.$('.quick-todays-task-section'));
            return Promise.all([this._super.apply(this, arguments)])
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
    return quickTaskList;
});
