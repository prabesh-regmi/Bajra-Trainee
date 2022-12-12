# -*- coding: utf-8 -*-
{
    'name': "Todo",
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        'views/assets.xml',
    ],
    'qweb': ['static/src/xml/todo_action.xml'],
    'application': True,
    'installable': True,
    'sequence': -10
}
