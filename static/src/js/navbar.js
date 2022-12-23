odoo.define('todo.navbar', function (require) {
    'use strict';
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    const navbar = Widget.extend({
        init: function (parent) {
            var self = this;
            this._super(parent);
            // Get the name of logged in user
            this.user_name = this.getSession().name
        },
        start: function(){
            var self = this;
            // Get first string of name words and create for user avatar username
            let username = this.user_name.split(" ").map(str => str[0]).join("");
            // render navbar
            this.$navbar = $(QWeb.render('navbar',{"name":username}));
            this.$navbar.appendTo(this.$el);
        },
    })
    return navbar;
});
