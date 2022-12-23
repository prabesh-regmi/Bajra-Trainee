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
            this._super.apply(this, arguments);
            this.tasks = data;
            console.log(this.tasks)
        },
        start: function () {
            var self = this;
            // Render all tasks in this.tasks
            this.$task_list = $(QWeb.render('todo.task', { "tasks": this.tasks }));
            this.$task_list.appendTo(this.$el);
            return Promise.all([this._super.apply(this, arguments)])
        },
        onChecked: function (e) {
            var self = this;
            // self.checked_data = e.target;
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

            // self.checked_data = $(self.checked_data).siblings();
            // if (self.checked_data[0].style.textDecoration === "line-through") {
            //     self.checked_data.css("text-decoration", "none");
            //     this.vals = { 'state': 'new' };
            // } else {
            //     self.checked_data.css("text-decoration", "line-through");
            //     this.vals = { 'state': 'completed' };
            // }
            // self.id = self.checked_data.find('.id').val();
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
