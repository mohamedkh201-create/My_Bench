# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Serves the public customer digital menu SPA at ``/menu``.

Guests are allowed — this is the QR-code landing page (``/menu?table=<slug>``).
The React portal calls only ``allow_guest`` endpoints in ``cpro.api.portal``;
ordering and the Call-Waiter button are gated server-side by Cpro Settings.
"""

from cpro.spa_boot import build_spa_context

no_cache = 1


def get_context(context):
	return build_spa_context(context, require_login=False)
