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

        init: function (parent, action) {
            var self = this;
            this._super.apply(this, arguments);
            this.$traineeForm = $('.c_form_container');
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
            this.formWidget = new TraineeFormWidget(self)
            return Promise.all([this._super.apply(this, arguments), trainees])
        },
        start: function () {
            var self = this;
            // console.log("start", this.trainee_data)
            return Promise.all([this.formWidget.appendTo(self.$('.c_form_container')), this.traineesListWidget.appendTo(self.$('.c_trainees_list_container'))])
        },
    });
    core.action_registry.add("trainee.action", traineeAction);
});