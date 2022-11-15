from odoo import models, fields


class EstatePropertyOffer(models.Model):
    _name = 'estate.property.offer'
    _description = 'Estate Property Offer'

    price = fields.Float(string='Offer Price')
    status = fields.Selection(
        selection=[('accepted', 'Accepted',), ('refused', 'Refused')], string='Status',copy=False)
    partner_id = fields.Many2one('res.partner')
    property_id = fields.Many2one('estate.property')

