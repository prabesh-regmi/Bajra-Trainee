# -*- coding: utf-8 -*-
{
    'name': "Trainee  Details",
    'application': True,
    'installable': True,

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        'views/assets.xml',

    ],
    'qweb': ['static/src/xml/trainee_detail.xml'],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'sequence': -4,
}
