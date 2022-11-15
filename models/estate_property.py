from odoo import models, fields


class EstateModel(models.Model):
    _name = "estate.property"
    _description = "Estate Model"

    name = fields.Char('Name', required=True)
    description = fields.Text('Description')
    postcode = fields.Char('Postcode')
    date_availability = fields.Date('Availability Date')
    expected_price = fields.Float('Expected price', required=True)
    selling_price = fields.Float('Selling price')
    bedrooms = fields.Integer('Bedrooms')
    living_area = fields.Integer('Living area')
    facades = fields.Integer('Facades')
    garage = fields.Boolean('Garage')
    garden = fields.Boolean('Garden')
    garden_area = fields.Integer('Garden area')
    garden_orientation = fields.Selection(
        string='Garden Orientation',
        selection=[('north', 'North'), ('south', 'South'),
                   ('east', 'East'), ('west', 'West')],
        default='north'
    )
    property_type = fields.Many2one('estate.property.type')
    buyer = fields.Many2one('res.partner', string='Buyer')
    seller = fields.Many2one('res.users', default=lambda self: self.env.user)
    property_tag = fields.Many2many('estate.property.tag')
    offer_ids = fields.One2many('estate.property.offer')
