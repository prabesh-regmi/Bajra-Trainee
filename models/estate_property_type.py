from odoo import models, fields


class EstatePropertyType(models.Model):
    _name = 'estate.property.type'
    _description = 'Estate Property Type'
    _order = "sequence, name"
    _sql_constraints = [
        ("check_name", "UNIQUE(name)", "The name must be unique"),
    ]

    name = fields.Char(string='Property type', required=True)
    sequence = fields.Integer("Sequence", default=10)

    # Relational
    property_ids = fields.One2many(
        'estate.property', 'property_type_id', string='Properties')
