import { I18nLocales } from 'i18n-mini/lib/types';

const app: I18nLocales = {
    a_cancel: 'Cancel',
    a_dashboard: 'Dashboard',
    a_delete: 'Delete',
    a_filter_by: 'Filter by',
    a_filter_field: 'Filter field',
    a_filter: 'Filter',
    a_home: 'Home',
    a_login: 'Login',
    a_logout: 'Logout',
    a_order_by: 'Order by',
    a_order_field: 'Order field',
    a_reset: 'Reset',
    a_save: 'Save',
    a_search: 'Search',
    a_view_more: 'View more',
    a_email: 'Email',
    a_password: 'Password',
    a_your_email: 'Your email',
    a_your_password: 'Your password',
};

const en: I18nLocales = {
    user_list_title: 'User List',
    user_remove_title: 'Are you sure you want to delete this user?',
    ...app,
};

export default en;
