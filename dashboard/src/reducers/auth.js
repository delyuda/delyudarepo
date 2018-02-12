const defaultState = {
    loading: false,
    errors: null,
    isResponse: false,
    authState: false,
    userName: ''
};

function auth (state = defaultState, action) {
    switch (action.type) {
        case 'AUTH_REQUESTED':
            return {
                loading: true,
                authState: false
            };

        case 'AUTH_OK':
            return {
                loading: false,
                errors: null,
                isResponse: true,
                authState: action.response.authState,
                userName: action.response.userName
            };

        case 'LOGOUT_OK':
            return {
                loading: false,
                errors: null,
                isResponse: false,
                authState: false,
                userName: ''
            };

        default:
            return state;
    }
}

export default auth;