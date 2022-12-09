# -*- coding: utf-8 -*-

from odoo import models, fields, api

# Creating model of Trainee


class TraineeDetails(models.Model):

    _name = "trainee.details"
    _description = "Trainee Details"

    # Basic

    name = fields.Char(string="Name", required=True)
    address = fields.Char(string="Address")
    phone_number = fields.Char(string="Phone Number")
    stack = fields.Selection(string="Stack", selection=[('python', 'Python'), (
        'ror', 'Ruby On Rails'), ('qa', 'Quality Assurance'), ('angular', 'Angular')])
    dob = fields.Date(string="Date of Birth")

    # Create new trainee and save to database
    @api.model
    def create_trainee(self, vals):
        if("id" in vals):
            self.env['trainee.details'].search([("id", '=', vals['id'])]).write(vals)
            return {'data': vals}
        super(TraineeDetails, self).create(vals)
        return {'data': vals}

    # Delete trainee from database with id=id
    def delete_trainee(self):
        return super(TraineeDetails, self).unlink()

    # Get all trainees
    def get_all_trainees(self):
        return {"data": self.env['trainee.details'].search([]).read()}

    def edit_trainee(self, vals):
        self.env['trainee.details'].search([("id", '=', vals.id)]).write(vals)
        return {'data': vals}
