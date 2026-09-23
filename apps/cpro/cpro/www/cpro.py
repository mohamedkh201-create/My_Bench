# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

"""Serves the CPro staff SPA at ``/cpro`` (POS) and ``/cpro/kds`` (Kitchen).

Both routes require a logged-in user — Guests are redirected to ``/login`` and
returned here afterwards. The client-side router picks the screen from the path.
"""

from cpro.spa_boot import build_spa_context

no_cache = 1


def get_context(context):
	return build_spa_context(context, require_login=True)
