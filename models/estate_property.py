from odoo import api, fields, models
from odoo.exceptions import UserError, ValidationError
from odoo.tools import float_compare, float_is_zero


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

    # Special
    state = fields.Selection(
        selection=[
            ("new", "New"),
            ("offer_received", "Offer Received"),
            ("offer_accepted", "Offer Accepted"),
            ("sold", "Sold"),
            ("canceled", "Canceled"),
        ],
        string="Status",
        required=True,
        copy=False,
        default="new",
    )
    active = fields.Boolean("Active", default=True)

    # Relational

    property_type_id = fields.Many2one(
        'estate.property.type', string='Property Type')
    buyer_id = fields.Many2one(
        'res.partner', string='Buyer', readonly=True, copy=False)
    seller_id = fields.Many2one(
        'res.users', default=lambda self: self.env.user)
    tag_ids = fields.Many2many('estate.property.tag', string="Tags")
    offer_ids = fields.One2many(
        'estate.property.offer', 'property_id', string='Offers')

    # Computed

    total_area = fields.Integer(string='Total Area (sqm', compute='_compute_total_area',
                                help='Total area computed by summing the living area and the garden area')
    best_price = fields.Float(
        string='Best Price', compute='_compute_best_price')

    _sql_constraints = [
        ('check_expected_price', 'CHECK(expected_price > 0)',
         'Expected Price should be positive.'),
        ('check_selling_price', 'CHECK(selling_price >= 0)',
         'Selling Price should be positive.')
    ]

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

    # Public Method
    def action_sold(self):
        if self.state == 'canceled':
            raise UserError("Canceled properties cannot be sold.")
        return self.write({"state": "sold"})

    def action_cancel(self):
        if self.state == 'sold':
            raise UserError("Canceled properties cannot be sold.")
        return self.write({"state": "canceled"})

    @api.constrains("expected_price", "selling_price")
    def _check_price_difference(self):
        for prop in self:
            if (
                not float_is_zero(prop.selling_price, precision_rounding=0.01)
                and float_compare(prop.selling_price, prop.expected_price * 90.0 / 100.0, precision_rounding=0.01) < 0
            ):
                raise ValidationError(
                    "The selling price must be at least 90% of the expected price! "
                    + "You must reduce the expected price if you want to accept this offer."
                )
