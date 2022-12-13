from odoo import models, fields, api

# class of task list


class Task_list(models.Model):
    _name = "todo.list"
    _description = "Todo.List"

    name = fields.Char(string='List Name', required=True)
    tasks_ids = fields.One2many('todo.task', 'task_list_id', string='Tasks')

    # Create new Task List
    @api.model
    def create_task_list(self, vals):
        return super(Task_list, self).create(vals)

    # Get all Tasks List
    def get_all_tasks_list(self):
        return {"data": self.env['todo.list'].search([]).read()}
