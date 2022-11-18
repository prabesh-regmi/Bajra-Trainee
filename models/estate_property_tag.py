from odoo import models, fields


class EstatePropertyTag(models.Model):
    _name = 'estate.property.tag'
    _description = 'Estate Property Tag'
    _sql_constraints = [
        ('check_tag_name', 'UNIQUE(name)',
         'Tag name already exist!!')
    ]
    _order = 'name'

    name = fields.Char(string='Property Tag', required=True)
    color = fields.Integer("Color Index")
