from odoo.addons.auth_signup.controllers.main import AuthSignupHome
from odoo.tools.translate import _
from odoo.http import request
from odoo.addons.web.controllers.main import SIGN_UP_REQUEST_PARAMS
from odoo.http import request
from odoo.exceptions import UserError

SIGN_UP_REQUEST_PARAMS.update({'country_id','phone','dob','gender'})

# Inherit AuthSignupHome class and modified do_signup function to signup with extra fields attribute
class AuthSignupHome(AuthSignupHome):
        def do_signup(self, qcontext):
            """ Shared helper that creates a res.partner out of a token """
            values = { key: qcontext.get(key) for key in ('login', 'name', 'password','phone','dob','gender') }
            if not values:
                raise UserError(_("The form was not properly filled in."))
            if values.get('password') != qcontext.get('confirm_password'):
                raise UserError(_("Passwords do not match; please retype them."))
            supported_lang_codes = [code for code, _ in request.env['res.lang'].get_installed()]
            lang = request.context.get('lang', '')
            if lang in supported_lang_codes:
                values['lang'] = lang
            self._signup_with_values(qcontext.get('token'), values)
            request.env.cr.commit()