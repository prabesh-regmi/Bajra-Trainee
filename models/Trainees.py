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
