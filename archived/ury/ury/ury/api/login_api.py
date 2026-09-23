import frappe
from frappe.auth import LoginManager
import frappe.utils.password

@frappe.whitelist(allow_guest=True)
def mobile_login_api(usr, pwd):
    """
    Authenticates a user for the mobile application and retrieves the API Key & Secret.
    Supports multiple mobile devices simultaneously (since they share the same API keys).
    """
    try:
        # Initialize the LoginManager and authenticate the provided credentials
        login_manager = LoginManager()
        login_manager.authenticate(user=usr, pwd=pwd)
        # login_manager.post_login()  <-- We no longer need this because we use Tokens, not sessions.
    except frappe.exceptions.AuthenticationError:
        # Handle authentication failure safely
        frappe.clear_messages()
        frappe.local.response["http_status_code"] = 401
        return {"status": "failed", "message": "Incorrect email address or password"}

    # Retrieve the user document
    user = frappe.get_doc("User", usr)
    
    # Get or Generate API Key and Secret
    if not user.api_key:
        api_secret = user.generate_keys()
    else:
        try:
            api_secret = frappe.utils.password.get_decrypted_password("User", user.name, "api_secret")
        except Exception:
            # If for some reason we can't decrypt it, regenerate it
            api_secret = user.generate_keys()
    
    # Return successful response with API credentials and user profile details
    return {
        "status": "success",
        "message": "Login successful",
        "data": {
            "api_key": user.api_key,
            "api_secret": api_secret,
        }
    }
