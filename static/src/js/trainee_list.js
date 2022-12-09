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
                // btn.bind("click", () => { soconle.log("delete") })
                btn.addEventListener("click", () => {
                    self._rpc({
                        model: 'trainee.details',
                        method: 'delete_trainee',
                        args: [self.trainee_list[index].id]
                    }).then(() => {
                        self.do_warn("Deletion", "You just deleted a trainee record")
                        self.trigger_up('itemDelete', { index: index });

                    })
                })
            });
            _.each(this.$('.table-row'), function (row, index) {
                // btn.bind("click", () => { console.log("delete") })
                row.addEventListener("click", () => {
                    // console.log("row", index)
                    self.trigger_up('rowClick', { index: index });
                })
            });
        }
    });

    return ShowTraineeListWidget;
});
