export enum notificationTypes
    {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error'
}

export const notification = (
    type: notificationTypes,
    message: string
) => ( { type, message } );
