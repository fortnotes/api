const errors = {
    AUTHORIZATION_REQUIRED: {
        code: 401,
        body: {
            message: 'Authorization header required to perform this action.'
        }
    },

    AUTHORIZATION_WRONG_CREDENTIALS: {
        code: 400,
        body: {
            message: 'Wrong user credentials.'
        }
    },

    /* REFRESH_TOKEN_FAILURE: {
        code: 400,
        body: {
            message: 'Token expired.'
        }
    }, */

    ACCESS_DENIED: {
        code: 404,
        body: {
            message: 'Not enough permissions to perform this action.'
        }
    },

    BAD_REQUEST: {
        code: 400,
        body: {
            message: 'Wrong parameters.'
        }
    },

    INVALID_REQUEST_DATA: {
        code: 400,
        body: {
            message: 'Parameters validation failed.'
        }
    },

    DUPLICATE_ENTRY: {
        code: 400,
        body: {
            message: 'Entry with same unique field already exists.'
        }
    },

    DATABASE_READING_FAILURE: {
        code: 400,
        body: {
            message: 'Error reading data from database.'
        }
    },

    DATABASE_WRITING_FAILURE: {
        code: 400,
        body: {
            message: 'Error writing data to database.'
        }
    },

    INTERNAL_SERVER_ERROR: {
        code: 500,
        body: {
            message: 'Oops. Server encountered an unexpected conditions.'
        }
    }
};


Object.keys(errors).forEach(code => {
    errors[code].body.code = code;
});


export default Object.freeze(errors);
