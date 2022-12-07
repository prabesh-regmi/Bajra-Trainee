odoo.define('trainee.form.widget', function (require) {
    'use strict';

    var Widget = require('web.Widget');
    var core = require('web.core');
    var rpc = require('web.rpc');
    var QWeb = core.qweb;

    var TraineeFormWidget = Widget.extend({
        init: function () {
            this._super.apply(this, arguments);
        },
        start: function () {
            this.$widget = $(QWeb.render('trainee.input'));
            this.$traineeForm = this.$widget.find('.trainee-form');
            this.$widget.appendTo(this.$el);
            this.$traineeForm.submit(this._onSubmitForm.bind(this));
        },
        _onSubmitForm: function (e) {
            // e.preventDefault();
            console.log("form submitted", this.$traineeForm.find('.trainee-dob').val())
            var trainee_details = {
                name: this.$traineeForm.find('.trainee-name').val(),
                address: this.$traineeForm.find('.trainee-address').val(),
                phone_number: this.$traineeForm.find('.trainee-phone_number').val(),
                stack: this.$traineeForm.find('.trainee-stack').val(),
                dob: this.$traineeForm.find('.trainee-dob').val()
            }
            this._rpc({
                model: 'trainee.details',
                method: 'create_trainee',
                args: [trainee_details]
            }).then((response) => {
                this.do_notify("Success!", "New Trainee Registered!!")
                this.$traineeForm.trigger("reset");
                location.reload()
            });
        }
    });

    return TraineeFormWidget;
});
