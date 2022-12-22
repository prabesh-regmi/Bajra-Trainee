from odoo import models, fields, api
from odoo.exceptions import UserError

# class of task list


class Task_list(models.Model):
    _name = "todo.list"
    _description = "Todo.List"

    _sql_constraints = [

        (
            'unique_name', 'unique(name)',
            'This List is already present'
        ),

    ]

    name = fields.Char(string='List Name', required=True)
    tasks_ids = fields.One2many('todo.task', 'task_list_id', string='Tasks')

    # Create new Task List
    @api.model
    def create_task_list(self, vals):
        # Save data if name is not null
        if vals["name"]:
            list_name = super(Task_list, self).create(vals)
            return list_name.read()
        else:
            raise UserError("Null value")

    # Get all Tasks List
    def get_all_tasks_list(self):
        return {"data": self.env['todo.list'].search([]).read()}
