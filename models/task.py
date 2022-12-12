# -*- coding: utf-8 -*-

from odoo import models, fields, api

# Class for todo task


class Task(models.Model):
    _name = 'todo.task'
    _description = 'todo.task'

    name = fields.Char(string="Task Name", required=True)
    priority = fields.Selection(
        [('high', 'High'), ('medium', 'Medium'), ('low', 'Low')])
    date_time = fields.Datetime(string="Date and time")
    task_list_id = fields.Many2one(
        'todo.list',
        string="Todo list"
    )
