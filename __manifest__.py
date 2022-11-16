{
    'name': "estate",
    'application': True,
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/menu.xml',
        'views/view_property_type.xml',
        'views/view_property_tag.xml',
        'views/view.xml',
        'views/property_offer_view.xml'
    ],
    'sequence': -1
}
