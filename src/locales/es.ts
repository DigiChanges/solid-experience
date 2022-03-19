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
    av_one_item: 'Debe contener al menos un elemento',
    av_required: 'Requerido',
    av_too_long: 'Demasiado Largo!',
    av_too_short: 'Demasiado Corto!',
    av_password_match: 'Las contraseñas deben coincidir',
};

const entities: I18nLocales = {
    User: 'Usuario',
};

const errors: I18nLocales = {
    'app.domain.exceptions.uniqueAttribute': 'Ya existe un registro con el mismo valor de `{field}`.',
    'app.presentation.exceptions.duplicateEntity': 'Ya existe un registro con {field} {value}.',
    'auth.domain.exceptions.badCredentials': 'Correo electrónico o contraseña incorrectos.',
    'Bad Request': 'Error en la petición',
    'err_login_description': 'No se pudo iniciar sesión. Verifique su correo electrónico y contraseña o vuelva a intentar mas tarde.',
    'err_login': 'Error al iniciar sesión',
    'err_save_role': 'Error al guardar el rol',
    'err_save_user': 'Error al guardar el usuario',
    'err_save': 'Error al guardar',
    'err_server': 'Error del servidor',
    'err': 'Error',
    'shared.exceptions.notFound': 'No se encuentra el recurso `{entity}`.',
    'Unprocessable Entity': 'Error al procesar los datos',
};

const properties: I18nLocales = {
    document_number: 'número de documento',
};

const roles: I18nLocales = {
    r_close: 'Cerrar',
    r_create_role: 'Crear Rol',
    r_create: 'Crear',
    r_created: 'Rol Creado',
    r_enable: 'Habilitar',
    r_enter_name: 'Ingresar Nombre',
    r_enter_permissions: 'Seleccionar Permisos',
    r_enter_slug: 'Ingresar Slug',
    r_home: 'Listado',
    r_list_title: 'Listado de Roles',
    r_name: 'Nombre',
    r_no_roles: 'No Roles',
    r_roles: 'Roles',
    r_save: 'Guardar',
    r_search: '{count, plural, one {Buscar rol} other {Buscar roles}}',
    r_select_permissions: 'Permisos',
    r_slug: 'Slug',
    r_update_role: 'Editar Rol',
    r_update: 'Editar Rol',
    r_updated: 'Rol Actualizado',
};

const user: I18nLocales = {
    u_address: 'Dirección',
    u_birthday: 'Fecha de nacimiento',
    u_choose_birthday: 'Ingresar Fecha de Nacimiento...',
    u_close: 'Cerrar',
    u_confirm_password: 'Confirmar Contraseña',
    u_contact_information: 'INFORMACION DE CONTACTO',
    u_country: 'Pais',
    u_create_user: 'Crear Usuario',
    u_create: 'Crear',
    u_created: 'Usuario',
    u_edit_password: 'Cambiar Contraseña',
    u_email: 'Email',
    u_enable: 'Habilitar',
    u_enter_address: 'Tú dirección',
    u_enter_country: 'Ingresar País',
    u_enter_email: 'Ingresar Email',
    u_enter_first_name: 'Ingresar Nombre',
    u_enter_id_number: 'Ingresar ID',
    u_enter_last_name: 'Ingresar Apellido',
    u_enter_password: 'Ingresar Contraseña',
    u_enter_permissions: 'Seleccionar Permisos',
    u_enter_phone: 'Ingresar Teléfono',
    u_enter_roles: 'Seleccionar Roles',
    u_first_name: 'Nombre',
    u_gender_other: 'otro',
    u_gender: 'Género',
    u_home: 'Listado',
    u_id_number: 'Número ID',
    u_last_name: 'Apellido',
    u_list_title: 'Listado  de Usuarios',
    u_new_password: 'Nueva Contraseña',
    u_no_users: 'Sin usuarios',
    u_password: 'Contraseña',
    u_personal_information: 'INFORMACION PERSONAL',
    u_phone: 'Teléfono',
    u_remove_title: '¿Está seguro que desea eliminar este usuario?',
    u_repeat_password: 'Repetir Contraseña',
    u_role_assigned: 'Role/s asignados',
    u_save: 'Guardar',
    u_search: '{count, plural, one {Buscar usuario} other {Buscar usuarios}}',
    u_select_permissions: 'Permisos',
    u_select_roles: 'Roles',
    u_type_id: 'Tipo',
    u_update_user: 'Editar Usuario',
    u_update: 'Editar Usuario',
    u_users: 'Usuarios',
    u_view: 'Ver Usuario',
};

const es: I18nLocales = {
    ...app,
    ...appValidations,
    ...auth,
    ...entities,
    ...errors,
    ...properties,
    ...roles,
    ...user,
};

export default es;
