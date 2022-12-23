# -*- coding: utf-8 -*-

from odoo import models, fields, api
from odoo.exceptions import UserError


# Class for todo task


class Task(models.Model):
    _name = 'todo.task'
    _description = 'todo.task'

    name = fields.Char(string="Task Name", required=True)
    priority = fields.Selection(
        [('high', 'High'), ('medium', 'Medium'), ('low', 'Low')])
    date_time = fields.Date(string="Date and time")
    task_list_id = fields.Many2one(
        'todo.list',
        string="Todo list", 
        ondelete='cascade'
    )
    user_id = fields.Many2one(
        'res.users', 'Current User', default=lambda self: self.env.user, ondelete='cascade')

    # Special
    status = fields.Selection(
        selection=[('completed', 'Completed',), ('todo', 'Todo')], string='Status', copy=False, default='todo')
    # Create new Task
    @api.model
    def create_task(self, vals):
        # Only save data if all values is present
        if vals["name"] and vals["priority"] and vals["date_time"] and vals["task_list_id"]:
            task = super(Task, self).create(vals)
            return task.read()
        else:
            raise UserError("Null value")

    # Get all Tasks
    def get_all_tasks(self):
        user_id = self.env.user.id
        return {"data": self.env['todo.task'].search([("user_id", "=", user_id)]).read()}

    # Get all data of specific list id
    @api.model
    def get_task_with_task_list_id(self,vals):
        user_id = self.env.user.id
        task_list_id = vals["id"]
        return {"data": self.env['todo.task'].search([("user_id", "=", user_id),("task_list_id", "=", task_list_id)]).read()}
    
    # Update task on completion
    @api.model
    def change_task_state(self,id,vals):
        self.env['todo.task'].search(
            [("id", "=", id)]).write(vals)
        return True