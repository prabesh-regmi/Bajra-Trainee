odoo.define('todo.single.list.name', function (require) {
    'use strict';
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    const TaskListWidget = require('todo.task.list');
    const single_list_name = Widget.extend({
        events: {
            'click .accordion': 'showDropDown'
        },
        init: function (parent, data) {
            var self = this;
            this._super.apply(this, arguments);
            this.list_name = data;
            // console.log("single list",data);
            this.tasks = [];
        },
        willStart: function () {
            var self = this;
            // console.log("______________",self.list_name.id)
            var tasks = this._rpc({
                model: 'todo.task',
                method: "get_task_with_task_list_id",
                args: [{'id':self.list_name.id}]
            }).then(response => {
                self.tasks = response.data;
                // response.data.forEach(i=>self.list_names.push(i))
                console.log("Tasks", response.data)
            });
            return Promise.all([this._super.apply(this,arguments),tasks])
        },
        start: function () {
            var self = this;
            this.$list = $(QWeb.render('todo.single.list.name',{"name":this.list_name.name,"tasks_count":self.tasks.length}));
            this.$list.appendTo(this.$el);
            
            // create and append task list widget
            this.task_list = new TaskListWidget(self,self.tasks);
            this.task_list.appendTo(self.$('.task-inside-list-section'));
            return Promise.all([this._super.apply(this, arguments)])
        },
        showDropDown: function (e) {
            var self = this;
            var event = e.target;
            // console.log($(event).hasClass("task-count"));
            if($(event).hasClass("task-count")){
                event = $(event).parent()[0];
            }            
            event.classList.toggle("active");
            var panel = event.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    })
    return single_list_name;
});
