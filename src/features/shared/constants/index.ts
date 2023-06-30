export const INIT_STATE = {
    isLoading: false,
    notification: null,
    nextPaginationParams: { limit: '6', offset: '0' },
    modalData: null
};

export const LOGIN_PAGE_PATH = '/login';
export const CHANGE_FORGOT_PASSWORD_PAGE_PATH = '/change-forgot-password';

// these redirect paths to home page / when user is signed in
export const REDIRECT_SIGNED_IN_USERS_PAGES = [
    LOGIN_PAGE_PATH,
    CHANGE_FORGOT_PASSWORD_PAGE_PATH,
    '/register',
    '/change-password-success',
    '/email-sent-successfully',
    '/verify-account-success',
    '/verify-your-account'
];

export const WHITE_PAGES = [
    ...REDIRECT_SIGNED_IN_USERS_PAGES
];
