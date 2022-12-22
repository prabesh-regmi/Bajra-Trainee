odoo.define('todo.single.list.name', function (require) {
    'use strict';
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    const TaskListWidget = require('todo.task.list');
    // Create widget for single list name
    const single_list_name = Widget.extend({
        events: {
            'click .accordion': 'showDropDown'  // to show tasks of this list name
        },
        init: function (parent, data) {
            var self = this;
            this._super.apply(this, arguments);
            this.list_name = data;
            this.tasks = [];
        },
        willStart: function () {
            var self = this;
            // Get all tasks of specific list id
            var tasks = this._rpc({
                model: 'todo.task',
                method: "get_task_with_task_list_id",
                args: [{'id':self.list_name.id}]
            }).then(response => {
                self.tasks = response.data;
            });
            return Promise.all([this._super.apply(this,arguments),tasks])
        },
        start: function () {
            var self = this;
            // Render list name and total numbet tasks associated with this list name
            this.$list = $(QWeb.render('todo.single.list.name',{"name":this.list_name.name,"tasks_count":self.tasks.length}));
            this.$list.appendTo(this.$el);
            
            // Create and append task list widget to show tasks of this list name
            this.task_list = new TaskListWidget(self,self.tasks);
            this.task_list.appendTo(self.$('.task-inside-list-section'));
            return Promise.all([this._super.apply(this, arguments)])
        },
        // Function to show and hide tasks associated with specific list name 
        showDropDown: function (e) {
            var self = this;
            var event = e.target;
            // If event is clicked in element that show count, change event to its parent because we have to toggle active class to its parent element
            if($(event).hasClass("task-count")){
                event = $(event).parent()[0];
            }            
            event.classList.toggle("active");
            var panel = event.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                // The scrollHeight property returns the height of an element including padding, but excluding borders, scrollbars, or margins.
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    })
    return single_list_name;
});
