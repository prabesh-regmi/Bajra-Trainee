import odoo
from odoo.addons.auth_signup.controllers.main import AuthSignupHome
import odoo.modules.registry
from odoo.tools.translate import _
from odoo import http
from odoo.http import request
from odoo.addons.web.controllers.main import SIGN_UP_REQUEST_PARAMS
# import models
from odoo import http
from odoo.http import request
from odoo.exceptions import UserError

SIGN_UP_REQUEST_PARAMS.update({'country_id','phone','dob','gender'})


class CustomLogin(http.Controller):
    @http.route('/', type='http', auth="none")
    def index(self, s_action=None, db=None, **kw):
        action = (request.env['ir.actions.client'].search(
            [('name', '=', 'Todo')]).read())[0]['id']
        return http.local_redirect(f'/web#action={action}', query=request.params, keep_hash=True)

    @http.route('/web/login', type='http', auth="none")
    def web_login(self, redirect=None, **kw):
        request.params['login_success'] = False
        if request.httprequest.method == 'GET' and request.session.uid:
            return self._login_redirect(request.session.uid)

        values = {
            "error": []
        }
        if request.httprequest.method == 'POST':
            old_uid = request.uid
            try:
                uid = request.session.authenticate(
                    request.session.db, request.params['login'], request.params['password'])
                request.params['login_success'] = True
                return http.redirect_with_hash(self._login_redirect(uid, redirect=redirect))
            except odoo.exceptions.AccessDenied as e:
                request.uid = old_uid
                values['error'] = (
                    _("Wrong Email/password")
                    if e.args == odoo.exceptions.AccessDenied().args
                    else e.args[0]
                )
        return request.render('todo.custom_login', values)  

    def _login_redirect(self, uid, redirect=None):
        return redirect or http.redirect_with_hash('/')



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
        # def get_auth_signup_qcontext(self):
        #     """ Shared helper returning the rendering context for signup and reset password """
        #     qcontext = {k: v for (k, v) in request.params.items() if k in SIGN_UP_REQUEST_PARAMS}
        #     qcontext.update(self.get_auth_signup_config())
        #     if not qcontext.get('token') and request.session.get('auth_signup_token'):
        #         qcontext['token'] = request.session.get('auth_signup_token')
        #     if qcontext.get('token'):
        #         try:
        #             # retrieve the user info (name, login or email) corresponding to a signup token
        #             token_infos = request.env['res.partner'].sudo().signup_retrieve_info(qcontext.get('token'))
        #             for k, v in token_infos.items():
        #                 qcontext.setdefault(k, v)
        #         except:
        #             qcontext['error'] = _("Invalid signup token")
        #             qcontext['invalid_token'] = True
        #     return qcontext
# class CustomSignup(http.Controller):
#     @http.route('/web/signup', type='http', auth='public', website=True, sitemap=False)
#     def web_auth_signup(self, *args, **kw):
#         values = {k: v for (k, v) in request.params.items() if k in SIGN_UP_REQUEST_PARAMS}
#         if request.httprequest.method == "POST":
#             token = request.params.get('token')
#             try:
#                 db, login, password = request.env['res.users'].sudo().signup(
#                     values, token)
#                 request.env.cr.commit()
#                 uid = request.session.authenticate(db, login, password)
#                 return http.redirect_with_hash('/')
#             except odoo.exceptions:
#                 values["error"] = "Cannot login"
#         return request.render('todo.custom_signup', values)
