from odoo import models, fields, api

# class of task list


class Task_list(models.Model):
    _name = "todo.list"
    _description = "Todo.List"

    name = fields.Char(string='List Name', required=True)
    tasks_ids = fields.One2many('todo.task', 'task_list_id', string='Tasks')
