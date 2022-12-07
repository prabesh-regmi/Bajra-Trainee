odoo.define('trainee.list.widget', function (require) {
    'use strict';

    var Widget = require('web.Widget');

    var core = require('web.core');
    var QWeb = core.qweb;

    var ShowTraineeListWidget = Widget.extend({
        init: function (parent, state) {
            console.log("state", state.trainee_list)
            this._super.apply(this, arguments);
            this.trainee_list = state.trainee_list;
            // console.log("showtraineeData", data)
        },

        start: function () {
            this._render();
        },
        _render: function () {
            var self = this;
            this.$widget = $(QWeb.render('trainee.list', { "data": this.trainee_list }));
            console.log("display data", this.trainee_list)
            // this.$traineeForm = this.$widget.find('.trainee-form');
            this.$widget.appendTo(this.$el);
            _.each(this.$('.delete'), function (btn, index) {
                // btn.bind("click", () => { console.log("delete") })
                btn.addEventListener("click", () => {
                    self._rpc({
                        model: 'trainee.details',
                        method: 'delete_trainee',
                        args: [self.trainee_list[index].id]
                    }).then(() => {
                        self.do_warn("Deletion", "You just deleted a trainee record")
                        location.reload()
                    })
                })
            });
        }
    });

    return ShowTraineeListWidget;
});
