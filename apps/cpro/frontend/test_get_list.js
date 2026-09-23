import { call } from './src/lib/frappe.js';
call.get('frappe.client.get_list', { doctype: 'Item Group', fields: '["name"]' })
  .then(console.log)
  .catch(console.error);
