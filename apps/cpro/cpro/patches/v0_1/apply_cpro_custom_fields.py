# Copyright (c) 2026, ahmed hashim and contributors
# For license information, please see license.txt

from cpro.custom_fields import apply_cpro_custom_fields


def execute():
	"""Ensure CPro custom fields exist (idempotent) after schema migrations."""
	apply_cpro_custom_fields()
