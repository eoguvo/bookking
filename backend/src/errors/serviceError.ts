export enum REASON {

    UNIQUE = "UNIQUE",

    UNAUTHORIZED = "UNAUTHORIZED",

    VALIDATION = "VALIDATION",

}

interface ServiceErrorArgs {

    message: string;
    name: string;
    reason: REASON;
    errors?: Array<{ message: string, reason: string }>

}

export default class ServiceError extends Error {

    message: string;
    name: string;
    reason: REASON;
    errors?: Array<{ message: string, reason: string }>;

    constructor({ message, name, reason, errors }: ServiceErrorArgs) {

        super();

        this.message = message;

        this.name = name;

        this.reason = reason;

        this.errors = errors;

    }

}