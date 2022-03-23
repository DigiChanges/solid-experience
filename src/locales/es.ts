import { I18nLocales } from 'i18n-mini/lib/types';

const app: I18nLocales = {
    a_cancel: 'Cancelar',
    a_change_password: 'Cambiar Contraseña',
    a_choose_birthday: 'Ingresar Fecha de Nacimiento...',
    a_clear: 'Limpiar',
    a_close: 'Cerrar',
    a_contact_information: 'INFORMACION DE CONTACTO',
    a_create: 'Crear',
    a_dashboard: 'Panel de control',
    a_delete: 'Eliminar',
    a_enter_first_name: 'Ingresar Nombre',
    a_enter_id_number: 'Ingresar ID',
    a_enter_last_name: 'Ingresar Apellido',
    a_enter_name: 'Ingresar Nombre',
    a_enter_permissions: 'Seleccionar Permisos',
    a_enter_phone: 'Ingresar Teléfono',
    a_enter_slug: 'Ingresar Slug',
    a_filter_by: 'Filtrar por',
    a_filter_field: 'Campo de filtro',
    a_filter: 'Filtrar',
    a_gender_other: 'otro',
    a_home: 'Inicio',
    a_list: 'Listado',
    a_loading: 'Cargando',
    a_login: 'Iniciar sesión',
    a_logout: 'Cerrar sesión',
    a_order_by: 'Ordenar por',
    a_order_field: 'Campo de ordenación',
    a_password: 'Contraseña',
    a_personal_information: 'INFORMACION PERSONAL',
    a_reload: 'Recargar',
    a_repeat_password: 'Repetir Contraseña',
    a_reset: 'Reiniciar',
    a_save: 'Guardar',
    a_search: 'Buscar',
    a_select_country: 'Seleccionar País',
    a_select_roles: 'Seleccionar Roles',
    a_view_more: 'Ver más',
    a_your_address: 'Tú dirección',
    a_your_email: 'Tu correo electrónico',
    a_your_password: 'Tu contraseña',
};

const auth: I18nLocales = {
    au_forgot_password: '¿Olvidaste tu contraseña?',
};

const appValidations: I18nLocales = {
    av_one_item: 'Debe contener al menos un elemento',
    av_password_match: 'Las contraseñas deben coincidir',
    av_required: 'Requerido',
    av_too_long: 'Demasiado Largo!',
    av_too_short: 'Demasiado Corto!',
};

const entities: I18nLocales = {
    User: 'Usuario',
};

const errors: I18nLocales = {
    'app.domain.exceptions.uniqueAttribute': 'Ya existe un registro con el mismo valor de `{field}`.',
    'app.presentation.exceptions.duplicateEntity': 'Ya existe un registro con {field} {value}.',
    'auth.domain.exceptions.badCredentials': 'Correo electrónico o contraseña incorrectos.',
    'err_login_description': 'No se pudo iniciar sesión. Verifique su correo electrónico y contraseña o vuelva a intentar mas tarde.',
    'err_login': 'Error al iniciar sesión',
    'err_save_role': 'Error al guardar el rol',
    'err_save_user': 'Error al guardar el usuario',
    'err_save': 'Error al guardar',
    'err_server': 'Error del servidor',
    'err': 'Error',
    'Forbidden': 'Acceso denegado',
    'HTTP_BAD_REQUEST': 'Error en la petición',
    'HTTP_FORBIDDEN': 'Acceso denegado',
    'HTTP_UNPROCESSABLE_ENTITY': 'El registro no cumple con las reglas de validación.',
    'shared.exceptions.notFound': 'No se encuentra el recurso `{entity}`.',
    'Unprocessable Entity': 'Error al procesar los datos',
    'user.domain.exceptions.unverifiedUser': 'El usuario no ha sido verificado.',
};

const properties: I18nLocales = {
    address: 'Dirección',
    birthday: 'Fecha de nacimiento',
    confirm_password: 'Confirmar Contraseña',
    country: 'Pais',
    document_number: 'número de documento',
    email: 'Correo electrónico',
    enable: 'Habilitar',
    first_name: 'Nombre',
    gender: 'Género',
    id_number: 'Número ID',
    last_name: 'Apellido',
    name: 'Nombre',
    new_password: 'Nueva Contraseña',
    password: 'Contraseña',
    permissions: 'Permisos',
    phone: 'Teléfono',
    roles: 'Roles',
    slug: 'Slug',
    type_id: 'Tipo',
};

const roles: I18nLocales = {
    r_assigned: 'Role/s asignados',
    r_create: 'Crear Rol',
    r_created: 'Rol Creado',
    r_list: 'Listado de Roles',
    r_no_roles: 'No Roles',
    r_remove: '¿Está seguro que desea eliminar este rol?',
    r_search: '{count, plural, one {Buscar rol} other {Buscar roles}}',
    r_update: 'Editar Rol',
    r_updated: 'Rol Actualizado',
};

const user: I18nLocales = {
    u_assigned: 'Usuario/s asignados',
    u_create: 'Crear Usuario',
    u_created: 'Usuario creado',
    u_list: 'Listado  de Usuarios',
    u_no_users: 'Sin usuarios',
    u_remove: '¿Está seguro que desea eliminar este usuario?',
    u_search: '{count, plural, one {Buscar usuario} other {Buscar usuarios}}',
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
