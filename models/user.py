from odoo import models, fields, api


class TodoUser(models.Model):
    _inherit = 'res.users'

    gender = fields.Char(string='Gender')
    dob = fields.Char(string='Date of birth')

    # Relational
    tasks_ids = fields.One2many('todo.task', 'task_list_id', string='Tasks')
