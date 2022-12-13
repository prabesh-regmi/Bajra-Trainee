odoo.define('todo.action.client', function (require) {
    // We use the require() to import the widgets we need for our own widget.
    const AbstractAction = require("web.AbstractAction");
    const Widget = require("web.Widget");
    const core = require("web.core"); // Extend the AbstractAction (base class) to define our own template
    var QWeb = core.qweb;
    var ajax = require('web.ajax');
    // ajax.loadXML('/todo/static/src/xml/navbar.xml', QWeb)
    const todoAction = AbstractAction.extend({
        contentTemplate: 'todo.action',
        events: {
            'submit .create-task-form': '_onTaskFormSubmit',
            'submit .create-list-form': '_onListFormSubmit',
        },
        init: function (parent, action) {
            var self = this;
            this._super.apply(this, arguments);
            this.$taskForm = $('.create-task-form');
            this.$listForm = $('.create-list-form');
        },
        _onListFormSubmit:function(e){
            var self =this;
            e.preventDefault();
            var nameInput= $('.list-name').val().trim();
            $('.create-list-form').trigger("reset")

            
        },
        // _onListFormSubmit:function(){},

    })
    core.action_registry.add('todo.action', todoAction)
});