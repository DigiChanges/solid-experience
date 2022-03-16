import { I18nLocales } from 'i18n-mini/lib/types';

const app: I18nLocales = {
    a_view_more: 'Ver más',
    a_reset: 'Reiniciar',
    a_search: 'Buscar',
    a_filter: 'Filtrar',
    a_filter_by: 'Filtrar por',
    a_order_by: 'Ordenar por',
    a_filter_field: 'Campo de filtro',
    a_order_field: 'Campo de ordenación',
    a_save: 'Guardar',
    a_cancel: 'Cancelar',
    a_delete: 'Eliminar',
};

const appValidations: I18nLocales = {
    av_required: 'Requerido',
};

const user: I18nLocales = {
    u_list_title: 'Lista de Usuarios',
    u_remove_title: '¿Está seguro que desea eliminar este usuario?',
    u_create: 'Crear Usuario',
    u_search: '{count, plural, one {Buscar usuario} other {Buscar usuarios}}',
    u_no_users: 'Sin usuarios',
    u_create_user: 'Crear Usuario',
};

const es: I18nLocales = {
    ...app,
    ...appValidations,
    ...user,
};

export default es;
