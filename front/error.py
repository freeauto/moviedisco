from com.front import ShowException, handle_error, register_wildcard_error

import settings
from home import *  # @UnusedWildImport


@app.errorhandler(403)
def forbidden(error):
    return handle_error(db, 'msg.html', error=error,
                        msg="You're not allowed to access this page. The owner may have made it private.",
                        title="Forbidden from access",
                        is_display=True)


@app.errorhandler(404)
def not_found(error):
    return handle_error(db, 'msg.html', error=error,
                        msg="The page was not found",
                        title="Page not found",
                        is_display=True)


@app.errorhandler(400)
def bad_request(error):
    return handle_error(db, 'msg.html', error=error,
                        msg="Sorry, your request was either broken or not allowed. For help, contact our webmaster at: support@baylaunch.com",
                        title="Bad request",
                        is_trace=True, is_display=True)

@app.errorhandler(401)
def unauthorized_request(error):
    return handle_error(db, 'msg.html', error=error,
                        msg="Sorry, you're not authorized to do that. Perhaps you need to login?",
                        title="Not logged in",
                        is_trace=True, is_display=True)


@app.errorhandler(ShowException)
def show_exceptions(error):
    return handle_error(db, 'msg.html', error=error, is_display=True)


@register_wildcard_error(app)
def all_other_error_codes(error):
    return handle_error(db, 'msg.html',
                        msg=u"Sorry, there was an error: %s. For help, contact our webmaster at: support@baylaunch.com" % unicode(error),
                        error=error, is_trace=True)


if settings.IS_LIKE_PROD:
    @app.errorhandler(Exception) # handles all exceptions
    def all_other_exceptions(error):
        return handle_error(db, 'msg.html',
                            msg="Sorry, there's been a server error. For help, contact our webmaster at: support@baylaunch.com",
                            title='Server Error',
                            error=error,
                            is_trace=True)

