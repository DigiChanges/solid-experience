import { I18nLocales } from 'i18n-mini/lib/types';

const app: I18nLocales = {
    a_cancel: 'Cancelar',
    a_dashboard: 'Panel de control',
    a_delete: 'Eliminar',
    a_email: 'Correo electrónico',
    a_filter_by: 'Filtrar por',
    a_filter_field: 'Campo de filtro',
    a_filter: 'Filtrar',
    a_home: 'Inicio',
    a_loading: 'Cargando',
    a_login: 'Iniciar sesión',
    a_logout: 'Cerrar sesión',
    a_order_by: 'Ordenar por',
    a_order_field: 'Campo de ordenación',
    a_password: 'Contraseña',
    a_reset: 'Reiniciar',
    a_save: 'Guardar',
    a_search: 'Buscar',
    a_view_more: 'Ver más',
    a_your_email: 'Tu correo electrónico',
    a_your_password: 'Tu contraseña',
};

const auth: I18nLocales = {
    au_forgot_password: '¿Olvidaste tu contraseña?',
};

const appValidations: I18nLocales = {
    av_required: 'Requerido',
};

const errors: I18nLocales = {
    'err_save_user': 'Error al guardar el usuario',
    'err_save': 'Error al guardar',
    'err_server': 'Error del servidor',
    'err': 'Error',
    'Unprocessable Entity': 'Error al procesar los datos',
};

const roles: I18nLocales = {
    r_create: 'Crear Rol',
    r_home: 'Inicio de Roles',
    r_roles: 'Roles',
    r_update: 'Editar Rol',
};

const user: I18nLocales = {
    u_create_user: 'Crear Usuario',
    u_create: 'Crear Usuario',
    u_edit_password: 'Cambiar Contraseña',
    u_home: 'Inicio de Usuarios',
    u_list_title: 'Lista de Usuarios',
    u_no_users: 'Sin usuarios',
    u_remove_title: '¿Está seguro que desea eliminar este usuario?',
    u_search: '{count, plural, one {Buscar usuario} other {Buscar usuarios}}',
    u_update: 'Editar Usuario',
    u_users: 'Usuarios',
    u_view: 'Ver Usuario',
};

const es: I18nLocales = {
    ...app,
    ...auth,
    ...appValidations,
    ...errors,
    ...roles,
    ...user,
};

export default es;
