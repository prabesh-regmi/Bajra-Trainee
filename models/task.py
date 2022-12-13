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
    user_id = fields.Many2one(
        'res.users', 'Current User', default=lambda self: self.env.user)
    # Create new Task

    @api.model
    def create_task(self, vals):
        return super(Task, self).create(vals)

    # Get all Tasks
    def get_all_tasks(self):
        user_id = self.env.user.id
        return {"data": self.env['todo.task'].search([("user_id", "=", user_id)]).read()}
