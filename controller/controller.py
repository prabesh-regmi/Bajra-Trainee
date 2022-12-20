import odoo
import odoo.modules.registry
from odoo.tools.translate import _
from odoo import http
from odoo.http import content_disposition, dispatch_rpc, request, serialize_exception as _serialize_exception, Response


import odoo
from odoo import http
from odoo.http import request


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
            "error":[]
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
        return redirect or '/'
