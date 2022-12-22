odoo.define('todo.action.client', function (require) {
    // We use the require() to import the widgets we need for our own widget.
    const AbstractAction = require("web.AbstractAction");
    const core = require("web.core"); // Extend the AbstractAction (base class) to define our own template
    var QWeb = core.qweb;
    const NavbarWidget = require('todo.navbar');
    const OverviewWidget = require('todo.overview');
    const ListNameWidget = require('todo.list.name');
    const QuickTaskListWidget = require('todo.quick.task.list');
    // Client action 
    const todoAction = AbstractAction.extend({
        contentTemplate: 'todo.action',

        // listener for events
        events: {
            'submit .create-task-form': '_onTaskFormSubmit', // Handle on submit create task form 
            'submit .create-list-form': '_onListFormSubmit', // Handle on submit create list form
            'click .new-task-btn,.create-new-list': '_showModal',   // Show modal to create task and list
            'click .cancel, .modal-close': '_closeModal'    // Close modal
        },
        custom_events: {
            'quickSectionChange': '_onQuickSectionChange' // Custom event to handle today's tasks, upcoming tasks or overdue tasks
        },

        init: function (parent, action) {
            var self = this;
            this._super.apply(this, arguments);

            // Assign elements in variable

            this.$taskForm = $('.create-task-form');
            this.$listForm = $('.create-list-form');
            this.list_names = [];
        },
        willStart: function () {
            var self = this;
            // Get all  list names and assign to list_names variable
            var listName = this._rpc({
                model: 'todo.list',
                method: "get_all_tasks_list",
                args: [{}]
            }).then(response => {
                self.list_names = response.data;
            });
            return Promise.all([this._super.apply(this, arguments), listName]);
        },
        start: function () {
            var self = this;
            // Hide odoo default navbar
            $('header').css("display", 'none');

            // Navbar widget create and append to client action
            this.navbar = new NavbarWidget(self);
            this.navbar.appendTo(self.$('.nav-section'));

            // Overview section widget create and append to client action
            this.overview = new OverviewWidget(self);
            this.overview.appendTo(self.$('.overview-section'));

            // quick task list widget create and append to client action
            this.task_list = new QuickTaskListWidget(self, 'today');
            this.task_list.appendTo(self.$('.quick-task-list-section'));

            // list name widget create and append to client action
            this.task_list = new ListNameWidget(self);
            this.task_list.appendTo(self.$('.list-name-section'));

            // Render modal 
            var task_modal = $(QWeb.render('task-modal', { "lists": this.list_names }))
            task_modal.appendTo(self.$('.modal-task'));

            return Promise.all([this._super.apply(this, arguments)]);
        },

        // Function to handle list form submit
        _onListFormSubmit: function (e) {
            e.preventDefault();
            var self = this;
            // Get input value
            var nameInput = $('.list-name').val();
            // If value in not null
            if (nameInput.length) {
                $('.create-list-form').trigger("reset");
                // Create new list name
                this._rpc({
                    model: 'todo.list',
                    method: 'create_task_list',
                    args: [{ "name": nameInput }]
                }).then(response => {
                    // Show notification on creation of new list name
                    self.do_notify("Success!", "New list Created!!");
                    // Append new list to list_names
                    self.list_names.push(response[0]);
                    self.$('.list-name-section').empty();
                    self.$('.modal-task').empty();
                    // Also update new list name in task list form 
                    var task_modal = $(QWeb.render('task-modal', { "lists": this.list_names }))
                    task_modal.appendTo(self.$('.modal-task'));
                    // To update list name section with newly created list name
                    self.task_list_name = new ListNameWidget(self);
                    self.task_list_name.appendTo(self.$('.list-name-section'));
                    self._closeModal();

                });
            } 
            // Show error message 
            else {
                $('.create-list-form small').addClass('d-block');
            }
        },

        // Function to handle task form submit
        _onTaskFormSubmit: function (e) {
            e.preventDefault();
            var self = this;
            // Remove all error message before validate
            $('.task-name').next().removeClass('d-block');
            $('.select-task-list').next().removeClass('d-block');
            $('.select-priority').next().removeClass('d-block');
            $('.date-input').next().removeClass('d-block');
            var data = {
                "name": $('.task-name').val(),
                "priority": $('.task-priority').val(),
                "date_time": $('.date-input').val(),
                "task_list_id": $('.task-list-input').val(),
            }
            // Validate input and if error show error 
            if (!data.name.length) {
                $('.task-name').next().addClass('d-block');
            } else if (!data.task_list_id.length) {
                $('.select-task-list').next().addClass('d-block');
            } else if (!data.priority.length) {
                $('.select-priority').next().addClass('d-block');
            } else if (!data.date_time.length) {
                $('.date-input').next().addClass('d-block');
            } else {
                // If no error create new tasks
                this._rpc({
                    model: 'todo.task',
                    method: 'create_task',
                    args: [data]
                }).then((response) => {
                    this._closeModal();
                    // Show notification on creation of new tasks
                    self.do_notify("Success!", "New Task Created!!");
                    // Rerender the page with updated values
                    self._renderAll();
                    $('.create-task-form').trigger("reset");
                });
            }
        },

        // Function to handle which tasks to show on changing today's tasks, upcoming tasks or overdue tasks
        _onQuickSectionChange: function (e) {
            var self = this;
            $('.quick-task-list-section').empty();
            // Find today,upcoming or overdue element if click event is occurred in its child elements
            if ($(e.data.target).hasClass("upcoming-task") || $(e.data.target.parentElement.parentElement).hasClass("upcoming-task")) {
                // Show upcoming tasks if user click in upcoming section 
                this.task_list = new QuickTaskListWidget(self, 'upcoming');
            } else if ($(e.data.target).hasClass("overdue-task") || $(e.data.target.parentElement.parentElement).hasClass("overdue-task")) {
                // Show overdue tasks if user click in overdue section 
                this.task_list = new QuickTaskListWidget(self, 'overdue');
            }
            else {
                // Show today list if user click in today section 
                this.task_list = new QuickTaskListWidget(self, 'today');
            }
            this.task_list.appendTo(self.$('.today-task-list'));
        },

        // function to display modal
        _showModal: function (e) {
            if ($(e.target).hasClass("new-task-btn")) {
                // Show task form modal
                $('.modal-task').addClass("show-modal");
            } else if ($(e.target).hasClass("create-new-list")) {
                // Show list name modal
                $('.modal-list').addClass("show-modal");
            }
        },

        // Function to close modal
        _closeModal: function (e) {
            if ($('.modal-task').hasClass("show-modal")) {
                // Hide task form modal
                $('.modal-task').removeClass("show-modal");
            } else if ($('.modal-list').hasClass("show-modal")) {
                // Hide list form modal
                $('.modal-list').removeClass("show-modal");
            }
        },

        // Function to rerender all elements
        _renderAll: function () {
            var self = this;
            self.$('.overview-section').empty();
            self.$('.quick-task-list-section').empty();
            self.$('.list-name-section').empty();
            self.$('.modal-task').empty();

            // Overview section widget create and append to client action

            this.overview = new OverviewWidget(self);
            this.overview.appendTo(self.$('.overview-section'));

            // task list widget create and append to client action
            this.task_list = new QuickTaskListWidget(self, 'today');
            this.task_list.appendTo(self.$('.today-task-list'));

            // list name widget create and append to client action
            this.task_list_name = new ListNameWidget(self);
            this.task_list_name.appendTo(self.$('.list-name-section'));

            // render  modal using qweb
            var task_modal = $(QWeb.render('task-modal', { "lists": this.list_names }));
            task_modal.appendTo(self.$('.modal-task'));
        },
    });
    core.action_registry.add('todo.action', todoAction);
});