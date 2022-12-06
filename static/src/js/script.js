odoo.define("trainee.actionClient", function (require) {
    // We use the require() to import the widgets we need for our own widget.
    const AbstractAction = require("web.AbstractAction");
    const Widget = require("web.Widget");
    const core = require("web.core"); // Extend the AbstractAction (base class) to define our own template
    var QWeb = core.qweb;
    const traineeAction = AbstractAction.extend({
        template: 'trainee',

    });


    core.action_registry.add("trainee.action", traineeAction);
});