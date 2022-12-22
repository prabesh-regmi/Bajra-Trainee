odoo.define('todo.navbar', function (require) {
    'use strict';
    var core = require('web.core');
    var Widget = require('web.Widget');
    var ajax = require('web.ajax');
    var QWeb = core.qweb;
    var session = require('web.session');
    // ajax.loadXML('/todo/static/src/xml/navbar.xml', qweb);
    const navbar = Widget.extend({
        init: function (parent, data) {
            var self = this;
            this._super.apply(this, arguments);
            this.traineeData = data;
            this.user_name = this.getSession().name
        },
        start: function(){
            var self = this;
            let username = this.user_name.split(" ").map(str => str[0]).join("");
            this.$navbar = $(QWeb.render('navbar',{"name":username}));
            this.$navbar.appendTo(this.$el);
            return Promise.all([this._super.apply(this,arguments)])
            // this.user = session.uid
        },
    })
    return navbar;
});
