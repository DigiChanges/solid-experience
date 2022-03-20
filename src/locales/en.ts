import { I18nLocales } from 'i18n-mini/lib/types';

const app: I18nLocales = {
    a_cancel: 'Cancel',
    a_dashboard: 'Dashboard',
    a_delete: 'Delete',
    a_email: 'Email',
    a_filter_by: 'Filter by',
    a_filter_field: 'Filter field',
    a_filter: 'Filter',
    a_home: 'Home',
    a_login: 'Login',
    a_logout: 'Logout',
    a_order_by: 'Order by',
    a_order_field: 'Order field',
    a_password: 'Password',
    a_reset: 'Reset',
    a_save: 'Save',
    a_search: 'Search',
    a_view_more: 'View more',
    a_your_email: 'Your email',
    a_your_password: 'Your password',

};
const auth: I18nLocales = {
    au_forgot_password: '¿Forgot your Password?',
};
const appValidations: I18nLocales = {
    av_one_item: 'Must have at least 1 items',
    av_required: 'Required',
    av_too_long: 'Too Long!',
    av_too_short: 'Too Short!',
    av_password_match: 'Passwords must match',
};

const entities: I18nLocales = {
    User: 'User',
};

const errors: I18nLocales = {
    'app.domain.exceptions.uniqueAttribute': 'Already exists a record with the same value of `{field}`.',
    'app.presentation.exceptions.duplicateEntity': 'Already exists a record with {field} {value}.',
    'auth.domain.exceptions.badCredentials': 'Email or password incorrect.',
    'err_login_description': 'Could not start session. Check your email and password or try again later.',
    'err_login': 'Error at login',
    'err_save_role': 'Error at save role',
    'err_save_user': 'Error at save user',
    'err_save': 'Error at save',
    'err_server': 'Error at server',
    'err': 'Error',
    'HTTP_BAD_REQUEST': 'Error in the request',
    'HTTP_FORBIDDEN': 'Access denied',
    'HTTP_UNPROCESSABLE_ENTITY': 'The record does not meet the validation rules.',
    'shared.exceptions.notFound': 'The resource `{entity}` was not found.',
};

const properties: I18nLocales = {
    document_number: 'document number',
};

const roles: I18nLocales = {
    r_close: 'Close',
    r_create_role: 'Create Role',
    r_create: 'Create',
    r_created: 'Created Role',
    r_enable: 'Enable',
    r_enter_name: 'Enter Name',
    r_enter_permissions: 'Select Permissions',
    r_enter_slug: 'Enter Slug',
    r_home: 'List',
    r_list_title: 'Roles List',
    r_name: 'Name',
    r_no_roles: 'Without Roles',
    r_roles: 'Roles',
    r_save: 'Save',
    r_search: '{count, plural, one {Search role} other {Search roles}}',
    r_select_permissions: 'Permissions',
    r_slug: 'Slug',
    r_update_role: 'Update Role',
    r_update: 'Edit Rol',
    r_updated: 'Role Updated',
};

const user: I18nLocales = {
    u_address: 'Address',
    u_birthday: 'Birthday',
    u_choose_birthday: 'Choose the birthday...',
    u_close: 'Close',
    u_confirm_password: 'Confirm Password',
    u_contact_information: 'CONTACT INFORMATION',
    u_country: 'Country',
    u_create_user: 'Create User',
    u_create: 'Create',
    u_created: 'Created User',
    u_edit_password: 'Change Password',
    u_email: 'Email',
    u_enable: 'Enable',
    u_enter_address: 'Your address...',
    u_enter_country: 'Select Country',
    u_enter_email: 'Enter Email',
    u_enter_first_name: 'Enter First Name',
    u_enter_id_number: 'Enter ID',
    u_enter_last_name: 'Enter Last Name',
    u_enter_password: 'Enter Password',
    u_enter_permissions: 'Select Permissions',
    u_enter_phone: 'Enter Number',
    u_enter_roles: 'Select Roles',
    u_first_name: 'First Name',
    u_gender_other: 'other',
    u_gender: 'Gender',
    u_home: 'List',
    u_id_number: 'ID number',
    u_last_name: 'Last Name',
    u_list_title: 'User List',
    u_new_password: 'New Password',
    u_no_users: 'Without User',
    u_password: 'Password',
    u_personal_information: 'PERSONAL INFORMATION',
    u_phone: 'Phone',
    u_remove_title: 'Are you sure you want to delete this user?',
    u_repeat_password: 'Repeat Password',
    u_role_assigned: 'Role/s assigned',
    u_save: 'Save',
    u_search: '{count, plural, one {Search user} other {Search users}}',
    u_select_permissions: 'Permissions',
    u_select_roles: 'Roles',
    u_type_id: 'Type',
    u_update_user: 'Update User',
    u_update: 'Edit User',
    u_users: 'Users',
    u_view: 'Show User',
};

const en: I18nLocales = {
    ...app,
    ...appValidations,
    ...auth,
    ...entities,
    ...errors,
    ...properties,
    ...roles,
    ...user,
};

export default en;
