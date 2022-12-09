odoo.define('trainee.form.widget', function (require) {
    'use strict';

    var Widget = require('web.Widget');
    var core = require('web.core');
    var rpc = require('web.rpc');
    var QWeb = core.qweb;

    var TraineeFormWidget = Widget.extend({
        events: { 'click .submit-btn': '_onSubmitForm' },
        custom_events: {
            editClick: '_enableEdit'
        },
        init: function (parent, data) {
            this._super.apply(this, arguments);
            this.traineeData = data;
        },
        start: function () {
            var self = this;
            this.$widget = $(QWeb.render('trainee.input'));
            this.$traineeForm = this.$widget.find('.trainee-form');
            this.$widget.appendTo(this.$el);
            console.log("length", this.traineeData)
            self.$traineeForm.find('.form-control').prop('required', true);
            self.$traineeForm.find('.submit-btn').prop('hidden', true);
            if (this.traineeData) {
                self.$traineeForm.find('.form-control').attr("disabled", true);
                this.$traineeForm.find('.trainee-name').val(this.traineeData.name);
                this.$traineeForm.find('.trainee-address').val(this.traineeData.address);
                this.$traineeForm.find('.trainee-phone_number').val(this.traineeData.phone_number);
                this.$traineeForm.find('.trainee-stack').val(this.traineeData.stack);
                this.$traineeForm.find('.trainee-dob').val(this.traineeData.dob);
            }
        },
        _onSaveClick: function () {
            this.$traineeForm.trigger('submit');
        },
        _enableEdit: function () {
            // debugger
            var self = this;
            self.$traineeForm.find('.form-control').attr("disabled", false)
        },
        _onSubmitForm: function (e) {
            // e.preventDefault();
            var self = this;
            const name = this.$traineeForm.find('.trainee-name').val();
            const address = this.$traineeForm.find('.trainee-address').val();
            const phone_number = this.$traineeForm.find('.trainee-phone_number').val();
            const stack = this.$traineeForm.find('.trainee-stack').val();
            const dob = this.$traineeForm.find('.trainee-dob').val();
            if (self.traineeData) {
                self.traineeData.name = name
                self.traineeData.address = address
                self.traineeData.phone_number = phone_number
                self.traineeData.stack = stack
                self.traineeData.dob = dob

            } else {
                self.traineeData = {};
                if (name.length) {
                    _.extend(self.traineeData, { 'name': name })
                }
                if (address.length) {
                    _.extend(self.traineeData, { 'address': address })
                }
                if (phone_number.length) {
                    _.extend(self.traineeData, { 'phone_number': phone_number })
                }
                if (stack.length) {
                    _.extend(self.traineeData, { 'stack': stack })
                }
                if (dob.length) {
                    _.extend(self.traineeData, { 'dob': dob })
                }
                console.log("date length", dob.length, this.traineeData)
            }
            this._rpc({
                model: 'trainee.details',
                method: 'create_trainee',
                args: [self.traineeData]
            }).then((response) => {
                self.$traineeForm.trigger("reset");
                // console.log("response.data", response.data)
                self.trigger_up('formSubmit', { item: response.data });
                // location.reload()
                return response.data
            });

        },
    });

    return TraineeFormWidget;
});
