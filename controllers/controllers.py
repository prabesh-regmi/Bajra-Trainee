# -*- coding: utf-8 -*-
# from odoo import http


# class TraineeDetails(http.Controller):
#     @http.route('/trainee_details/trainee_details/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/trainee_details/trainee_details/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('trainee_details.listing', {
#             'root': '/trainee_details/trainee_details',
#             'objects': http.request.env['trainee_details.trainee_details'].search([]),
#         })

#     @http.route('/trainee_details/trainee_details/objects/<model("trainee_details.trainee_details"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('trainee_details.object', {
#             'object': obj
#         })
