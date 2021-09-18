/* eslint-disable max-classes-per-file */

// https://www.apollographql.com/docs/apollo-server/data/errors/

import {
    ApolloError,
    AuthenticationError as ApolloAuthenticationError,
    ForbiddenError as ApolloForbiddenError,
    ValidationError as ApolloValidationError
} from 'apollo-server-fastify';


/* export class GeneralError extends ApolloError {
    constructor ( message = 'General error' ) {
        super(message, 'GENERAL_ERROR');
        this.name = 'GeneralError';
    }
} */

export class AuthenticationError extends ApolloAuthenticationError {
    constructor ( message = 'Not authorized' ) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

export class ForbiddenError extends ApolloForbiddenError {
    constructor ( message = 'Forbidden' ) {
        super(message);
        this.name = 'ForbiddenError';
    }
}

export class ValidationError extends ApolloValidationError {
    constructor ( message = 'Validation error' ) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends ApolloError {
    constructor ( message = 'Entity not found' ) {
        super(message, 'NOT_FOUND_ERROR');
        this.name = 'NotFoundError';
    }
}

export class UserNotFoundError extends NotFoundError {
    constructor () {
        super('User not found');
        this.name = 'UserNotFoundError';
    }
}

export class NoteNotFoundError extends NotFoundError {
    constructor () {
        super('Note not found');
        this.name = 'NoteNotFoundError';
    }
}

export class CodeNotFoundError extends NotFoundError {
    constructor () {
        super('Code not found');
        this.name = 'CodeNotFoundError';
    }
}

export class TagNotFoundError extends NotFoundError {
    constructor () {
        super('Tag not found');
        this.name = 'TagNotFoundError';
    }
}
