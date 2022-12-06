# -*- coding: utf-8 -*-

from odoo import models, fields, api

# Creating model of Trainee

# Basic


class TraineeDetails(models.Model):

    name = "trainee.details"
    _description = "Model of Trainee"

    name = fields.Char(string="Name", required=True)

    address = fields.Char(string="Address")
