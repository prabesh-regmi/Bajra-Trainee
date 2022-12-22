odoo.define('todo.action.client', function (require) {
    // We use the require() to import the widgets we need for our own widget.
    const AbstractAction = require("web.AbstractAction");
    const Widget = require("web.Widget");
    const core = require("web.core"); // Extend the AbstractAction (base class) to define our own template
    var QWeb = core.qweb;
    var ajax = require('web.ajax');
    const NavbarWidget = require('todo.navbar');
    const OverviewWidget = require('todo.overview');
    const TaskListWidget = require('todo.task.list');
    const ListNameWidget = require('todo.list.name');
    const QuickTaskListWidget = require('todo.quick.task.list');
    var session = require('web.session');

    // ajax.loadXML('/todo/static/src/xml/navbar.xml', QWeb)
    const todoAction = AbstractAction.extend({
        contentTemplate: 'todo.action',

        // listener for events

        events: {
            'submit .create-task-form': '_onTaskFormSubmit',
            'submit .create-list-form': '_onListFormSubmit',
            'click .new-task-btn': '_showModal',
            'click .create-new-list': '_showModal',
            'click .cancel, .modal-close': '_closeModal'
        },
        custom_events: {
            'quickSectionChange': '_onQuickSectionChange'
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
            var listName = this._rpc({
                model: 'todo.list',
                method: "get_all_tasks_list",
                args: [{}]
            }).then(response => {
                self.list_names = response.data;
                // response.data.forEach(i=>self.list_names.push(i))
                // console.log("list names", response.data)
            });
            return Promise.all([this._super.apply(this, arguments), listName]);
        },
        start: function () {
            var self = this;
            $('header').css("display", 'none');

            // Navbar widget create and append to client action
            debugger
            this.navbar = new NavbarWidget(self);
            this.navbar.appendTo(self.$('.nav-section'));

            // Overview section widget create and append to client action

            this.overview = new OverviewWidget(self);
            this.overview.appendTo(self.$('.overview-section'))

            // quick task list widget create and append to client action
            this.task_list = new QuickTaskListWidget(self, 'today');
            this.task_list.appendTo(self.$('.quick-task-list-section'))
            // list name widget create and append to client action
            this.task_list = new ListNameWidget(self);
            this.task_list.appendTo(self.$('.list-name-section'))
            // console.log("uid",session.uid)
            // render  modal using qweb
            var task_modal = $(QWeb.render('task-modal', { "lists": this.list_names }))
            task_modal.appendTo(self.$('.modal-task'))

            return Promise.all([this._super.apply(this, arguments)])
        },
        _onListFormSubmit: function (e) {
            e.preventDefault();
            var self = this;
            var nameInput = $('.list-name').val();
            if (nameInput.length) {
                $('.create-list-form').trigger("reset");
                this._rpc({
                    model: 'todo.list',
                    method: 'create_task_list',
                    args: [{ "name": nameInput }]
                }).then(response => {
                    self.do_notify("Success!", "New list Created!!");
                    // list name widget create and append to client action
                    self.list_names.push(response[0]);
                    self.$('.list-name-section').empty();
                    self.$('.modal-task').empty();
                    
                    var task_modal = $(QWeb.render('task-modal', { "lists": this.list_names }))
                    task_modal.appendTo(self.$('.modal-task'))
                    self.task_list_name = new ListNameWidget(self);
                    self.task_list_name.appendTo(self.$('.list-name-section'))
                    self._closeModal();

                });
            } else {
                $('.create-list-form small').addClass('d-block');
            }
        },
        _onTaskFormSubmit: function (e) {
            e.preventDefault();
            var self = this;
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
            if (!data.name.length) {
                $('.task-name').next().addClass('d-block');
            } else if (!data.task_list_id.length) {
                $('.select-task-list').next().addClass('d-block');
            } else if (!data.priority.length) {
                $('.select-priority').next().addClass('d-block');
            } else if (!data.date_time.length) {
                $('.date-input').next().addClass('d-block');
            } else {


                this._rpc({
                    model: 'todo.task',
                    method: 'create_task',
                    args: [data]
                }).then((response) => {
                    this._closeModal();
                    // self.trigger_up('listCreate', { response });
                    self.do_notify("Success!", "New Task Created!!");
                    self._renderAll();
                    $('.create-task-form').trigger("reset")

                });
            }
        },
        _onQuickSectionChange: function (e) {
            var self = this
            console.log("custom events", e.data.target.parentElement)
            $('.quick-task-list-section').empty();
            // task list widget create and append to client action
            if ($(e.data.target).hasClass("upcoming-task") || $(e.data.target.parentElement.parentElement).hasClass("upcoming-task")) {
                this.task_list = new QuickTaskListWidget(self, 'upcoming');
            } else if ($(e.data.target).hasClass("overdue-task") || $(e.data.target.parentElement.parentElement).hasClass("overdue-task")) {
                this.task_list = new QuickTaskListWidget(self, 'overdue');
            }
            else {
                this.task_list = new QuickTaskListWidget(self, 'today');
            }
            this.task_list.appendTo(self.$('.today-task-list'));
        },
        _showModal: function (e) {
            // console.log("click")
            if ($(e.target).hasClass("new-task-btn")) {
                $('.modal-task').addClass("show-modal");
            } else if ($(e.target).hasClass("create-new-list")) {
                $('.modal-list').addClass("show-modal");
            }
        },
        _closeModal: function (e) {
            // console.log("click")
            if ($('.modal-task').hasClass("show-modal")) {
                $('.modal-task').removeClass("show-modal");
            } else if ($('.modal-list').hasClass("show-modal")) {
                $('.modal-list').removeClass("show-modal");
            }
        },
        _renderAll: function () {
            var self = this;

            // self.overview.destroy();
            // self.task_list.destroy();
            // self.task_list_name.destroy();
            // Navbar widget create and append to client action
            self.$('.overview-section').empty();
            self.$('.quick-task-list-section').empty();
            self.$('.list-name-section').empty();
            self.$('.modal-task').empty();

            // Overview section widget create and append to client action

            this.overview = new OverviewWidget(self);
            this.overview.appendTo(self.$('.overview-section'))

            // task list widget create and append to client action
            this.task_list = new QuickTaskListWidget(self, 'today');
            this.task_list.appendTo(self.$('.today-task-list'))
            // console.log("hello",this.task_list)
            // list name widget create and append to client action
            this.task_list_name = new ListNameWidget(self);
            this.task_list_name.appendTo(self.$('.list-name-section'))
            // console.log("uid",session.uid)
            // render  modal using qweb
            var task_modal = $(QWeb.render('task-modal', { "lists": this.list_names }))
            task_modal.appendTo(self.$('.modal-task'))
        },
        // _onListFormSubmit:function(){},

        _getAllTasks: function () {
            var self = this;
            return this._rpc({
                model: 'todo.task',
                method: "get_all_tasks",
                args: [{}]
            }).then((response) => {
                self._getTasks(response.data)
                return response.data;
            });
        },
        _getAllListName: function () {
            return this._rpc({
                model: 'todo.list',
                method: "get_all_tasks_list",
                args: [{}]
            }).then(response => {
                return response.data;
            });
        },

    })
    core.action_registry.add('todo.action', todoAction)
});