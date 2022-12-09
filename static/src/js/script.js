odoo.define("trainee.actionClient", function (require) {
    // We use the require() to import the widgets we need for our own widget.
    const AbstractAction = require("web.AbstractAction");
    const Widget = require("web.Widget");
    const core = require("web.core"); // Extend the AbstractAction (base class) to define our own template
    const TraineeFormWidget = require('trainee.form.widget');
    const TraineeListWidget = require('trainee.list.widget');
    var QWeb = core.qweb;
    // Action client 
    const traineeAction = AbstractAction.extend({
        contentTemplate: 'trainee',
        events: {
            'click .create': '_onClickCreate',
            'click .save': '_onClickSave',
            'click .cancel': '_onClickCancel',
            'click .edit': '_onClickEdit',
        },
        custom_events: {
            itemDelete: '_onItemDelete',
            rowClick: '_onClickTableRow',
            formSubmit: '_onFormSubmit'
        },

        init: function (parent, action) {
            var self = this;
            this._super.apply(this, arguments);
            this.$traineeForm = $('.c_container');
            this.viewMode = 'list';
            self.selectedListTrainee = null;
        },
        willStart: function () {
            var self = this
            let trainees = Promise.all([this._rpc({
                model: 'trainee.details',
                method: 'get_all_trainees',
                args: [{}]
            }).then(function (response) {
                self.trainee_data = response.data
                console.log("willStart", self.trainee_data)
                // Create new widget to display trainee list
                self.traineesListWidget = new TraineeListWidget(self, { 'trainee_list': self.trainee_data })
            })]);
            // this.formWidget = new TraineeFormWidget(self)
            return Promise.all([this._super.apply(this, arguments), trainees])
        },
        start: function () {
            var self = this;
            // console.log("start", this.trainee_data)
            return Promise.all([this.traineesListWidget.appendTo(self.$('.c_container'))])
        },
        _onClickCreate: function () {
            // console.log("Create",this.$('.c_container').empty())
            var self = this;
            self.viewMode = 'form';
            return this._render();

        },
        _onClickCancel: function () {
            var self = this;
            console.log("selected", self.selectedListTrainee)
            if (self.selectedListTrainee) {
                this.$('.create-save-btn').empty();
                var $defEditButton = $(QWeb.render('edit.btn'));
                Promise.all([$defEditButton.appendTo(self.$('.create-save-btn'))]);
            } else {
                self.viewMode = 'list';
                self.selectedListTrainee = null;
            }
            return this._render();
        },
        _onClickSave: function () {
            console.log("here",this.$('.trainee-form'))
            this.$('.submit-btn').trigger('click');
        },
        _onFormSubmit: async function (event) {
            var self = this;
            // self.viewMode = 'list'
            // console.log("promise res", response)
            if (!event.data.id) {
                self.trainee_data.push(event.data)
                self.do_notify("Success!", "New Trainee Registered!!")
            } else {
                var index = self.trainee_data.findIndex(p => p.id == event.data.id);
                self.do_notify("Success!", "Trainee Modify!!");
                self.trainee_data[index] = event.data;
            }
            self.viewMode = 'list'
            self.selectedListTrainee = null;
            return self._render()
            // console.log("outside response", response)
            // return this._render();
        },
        _onItemDelete: function (event) {
            console.log("delete from outside", event.data)
            this.trainee_data.splice(event.data.index, 1); // 2nd parameter means remove one item only
            return this._render()
        },
        _onClickEdit: function () {
            var self = this;
            // self.def._enableEdit();
            // self.trigger_up('editClick', {});

            // console.log("edit click",Promise.all([self.def._enableEdit()]))
            self.def._enableEdit();
            self.$('.create-save-btn').empty();
            var $defSaveButton = $(QWeb.render('save.btn'));
            var $defCancelButton = $(QWeb.render('cancel.btn'));
            Promise.all([$defSaveButton.appendTo(self.$('.create-save-btn')), $defCancelButton.appendTo(self.$('.create-save-btn'))])

            // this._render(false);
            // this._onClickTableRow();

        },
        _render: function () {
            var self = this;
            this.$widget = $(QWeb.render('trainee.input'));
            this.$('.c_container').empty();
            this.$('.create-save-btn').empty();
            // this.def && this.def.destroy();
            if (this.viewMode === 'list') {
                this.def = new TraineeListWidget(self, { 'trainee_list': self.trainee_data });
                var $defCreateButton = $(QWeb.render('create.btn'));
                Promise.all([$defCreateButton.appendTo(self.$('.create-save-btn'))])

            } else if (this.viewMode === 'form') {
                self.def = new TraineeFormWidget(self, self.selectedListTrainee)
                if (!self.selectedListTrainee) {
                    var $defSaveButton = $(QWeb.render('save.btn'));
                    var $defCancelButton = $(QWeb.render('cancel.btn'));
                    Promise.all([$defSaveButton.appendTo(self.$('.create-save-btn')), $defCancelButton.appendTo(self.$('.create-save-btn'))])
                }
                else {
                    var $defEditButton = $(QWeb.render('edit.btn'));
                    Promise.all([$defEditButton.appendTo(self.$('.create-save-btn'))])
                }
            }
            return Promise.all([self.def.appendTo(self.$('.c_container'))])
        },
        _onClickTableRow: function (event) {
            var self = this;
            console.log("clicked", this.trainee_data[event.data.index])
            self.viewMode = 'form';
            self.selectedListTrainee = this.trainee_data[event.data.index]
            return this._render();
        },
    });
    core.action_registry.add("trainee.action", traineeAction);
});