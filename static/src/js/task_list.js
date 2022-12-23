odoo.define('todo.task.list', function (require) {
    'use strict';
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    // Widget to display tasks
    const task_list = Widget.extend({
        events: {
            'click .check-box': 'onChecked'
        },
        init: function (parent, data) {
            var self = this;
            this._super(parent);
            this.tasks = data;
        },
        start: function () {
            var self = this;
            // Render all tasks in this.tasks
            this.$task_list = $(QWeb.render('todo.task', { "tasks": this.tasks }));
            this.$task_list.appendTo(this.$el);
        },
        onChecked: function (e) {
            var self = this;
            var $target = $(e.target);
            var task_id = $target.val();
            var status = {}
            if($target.prop("checked") == true){
                status = {'status':"completed"};
                $target.next().css('text-decoration','line-through');
            } else{
                status = {'status':"todo"};
                $target.next().css('text-decoration','none');
            }
            this._rpc({
                model: 'todo.task',
                method: 'change_task_state',
                args: [task_id, status],
            }).then(() => {
                self.do_notify('success', 'Task Updated');
            });
        },
    });
    return task_list;
});
