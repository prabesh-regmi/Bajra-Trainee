from odoo import models, fields, api
from dateutil.relativedelta import relativedelta
from odoo.exceptions import UserError, ValidationError


class EstatePropertyOffer(models.Model):
    _name = 'estate.property.offer'
    _description = 'Estate Property Offer'
    _sql_constraints = [
        ('check_offer_price', 'CHECK(price > 0)',
         'Offer Price must be positive.')
    ]
    _order = 'price desc'
    
    # Basic
    price = fields.Float(string='Offer Price')
    validity = fields.Integer(string='Validity (days)', default=7)

    # Special
    status = fields.Selection(
        selection=[('accepted', 'Accepted',), ('refused', 'Refused')], string='Status', copy=False)

    # Relational
    partner_id = fields.Many2one(
        'res.partner', string="Partner", required=True)
    property_id = fields.Many2one(
        'estate.property', string="Property", required=True)

    # Computed
    date_deadline = fields.Date(
        string='Deadline', compute='_compute_date_deadline', inverse='_inverse_date_deadline')

    

    # Compute Method

    @api.depends('validity', 'create_date')
    def _compute_date_deadline(self):
        for record in self:
            date = record.create_date.date() if record.create_date else fields.Date.today()
            record.date_deadline = date + relativedelta(days=record.validity)

    def _inverse_date_deadline(self):
        for record in self:
            date = record.create_date.date() if record.create_date else fields.Date.today()
            record.validity = (record.date_deadline - date).days

    # Action Method

    def action_confirm(self):
        # if "accepted" in self.mapped("property_id.offer_ids.state"):
        #     raise UserError("An offer as already been accepted.")
        self.status = 'accepted'
        return self.mapped("property_id").write(
            {
                "state": "offer_accepted",
                "selling_price": self.price,
                "buyer_id": self.partner_id,
            }
        )

    def action_cancel(self):
        if self.status != 'accepted':
            self.status = 'refused'
        return True
