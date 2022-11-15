from odoo import models, fields, api


class EstateModel(models.Model):
    _name = "estate.property"
    _description = "Estate Model"

    # Basic

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

    # Relational

    property_type_id = fields.Many2one(
        'estate.property.type', string='Property Type')
    buyer_id = fields.Many2one('res.partner', string='Buyer')
    seller_id = fields.Many2one(
        'res.users', default=lambda self: self.env.user)
    tag_id = fields.Many2many('estate.property.tag')
    offer_ids = fields.One2many(
        'estate.property.offer', 'property_id', string='Offer Id')
    # Computed
    total_area = fields.Integer('Total Area', compute='_compute_total_area')
    best_price = fields.Float(
        string='Best Price', compute='_compute_best_price')

    # Compute methods

    @api.depends('living_area', 'garden_area')
    def _compute_total_area(self):
        for record in self:
            record.total_area = record.living_area + record.garden_area

    @api.depends('offer_ids.price')
    def _compute_best_price(self):
        for record in self:
            record.best_price = max(record.offer_ids.mapped(
                "price")) if record.offer_ids else 0.0
    
    # OnChange Method
    
    @api.onchange('garden')
    def _onchange_garden(self):
        if self.garden:
            self.garden_area = 10
            self.garden_orientation = 'north'
        else:
            self.garden_area = None
            self.garden_orientation = None
