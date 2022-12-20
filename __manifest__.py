# -*- coding: utf-8 -*-
{
    'name': "Todo",
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'security/access_right.xml',
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/assets.xml',
        'views/nav.xml',
        'views/login.xml',
    ],
    'qweb': [
        'static/src/xml/todo_action.xml',
        'static/src/xml/navbar.xml',
        'static/src/xml/overview.xml',
        'static/src/xml/task_list.xml',
        'static/src/xml/list_name.xml',
        'static/src/xml/task_list_section.xml'

    ],
    'application': True,
    'installable': True,
    'sequence': -10
}
