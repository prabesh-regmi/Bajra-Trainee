from odoo import models, fields, api
from dateutil.relativedelta import relativedelta

class EstatePropertyOffer(models.Model):
    _name = 'estate.property.offer'
    _description = 'Estate Property Offer'

    #Basic
    price = fields.Float(string='Offer Price')
    validity = fields.Integer(string='Validity (days)', default=7)

    #Special
    status = fields.Selection(
        selection=[('accepted', 'Accepted',), ('refused', 'Refused')], string='Status',copy=False)

    #Relational
    partner_id = fields.Many2one('res.partner')
    property_id = fields.Many2one('estate.property',required=True)

    #Computed
    date_deadline = fields.Date(string='Deadline', compute='_compute_date_deadline', inverse ='_inverse_date_deadline')

    #Compute Method

    @api.depends('validity', 'create_date')
    def _compute_date_deadline(self):
        for record in self:
            date = record.create_date.date() if record.create_date else fields.Date.today()
            record.date_deadline = date + relativedelta(days = record.validity)
    
    def _inverse_date_deadline(self):
        for record in self:
            date = record.create_date.date() if record.create_date else fields.Date.today()
            record.validity =  (record.date_deadline - date ).days


    