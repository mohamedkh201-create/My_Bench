# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Shared boot-context builder for the CPro single-page-app pages.

``cpro.html`` (POS + KDS) and ``menu.html`` (guest portal) are the *same* Vite
bundle; each ``www`` page injects a fresh CSRF token and the session boot
payload so the same-origin ``frappe-js-sdk`` client is authorized. Staff pages
require a login (Guest is bounced to ``/login``); the public menu allows guests.
"""

import json
import re

import frappe
import frappe.sessions
import frappe.website.utils

# Boot JSON is embedded in the page; strip any script tags to prevent breakout.
SCRIPT_TAG_PATTERN = re.compile(r"\<script[^<]*\</script\>")
CLOSING_SCRIPT_TAG_PATTERN = re.compile(r"</script\>")


def build_spa_context(context, *, require_login: bool = False):
	"""Populate ``context`` with build_version, boot, csrf_token and app_name.

	When ``require_login`` is set and the visitor is a Guest, redirect them to
	the login page (returning here afterwards) instead of booting the app.
	"""
	if require_login and frappe.session.user == "Guest":
		frappe.local.flags.redirect_location = f"/login?redirect-to={frappe.request.path}"
		raise frappe.Redirect

	csrf_token = frappe.sessions.get_csrf_token()
	# Commit so the freshly generated CSRF token is persisted for the session.
	frappe.db.commit()  # nosemgrep

	if frappe.session.user == "Guest":
		boot = frappe.website.utils.get_boot_data()
	else:
		try:
			boot = frappe.sessions.get()
		except Exception as e:
			raise frappe.SessionBootFailed from e

	if "server_script_enabled" in frappe.conf:
		enabled = frappe.conf.server_script_enabled
	else:
		enabled = True
	boot["server_script_enabled"] = enabled

	boot_json = frappe.as_json(boot, indent=None, separators=(",", ":"))
	boot_json = SCRIPT_TAG_PATTERN.sub("", boot_json)
	boot_json = CLOSING_SCRIPT_TAG_PATTERN.sub("", boot_json)
	boot_json = json.dumps(boot_json)

	context.update(
		{
			"build_version": frappe.utils.get_build_version(),
			"boot": boot_json,
			"csrf_token": csrf_token,
			"app_name": "cpro",
		}
	)
	return context
