import Error from './Error';

export const createError = (errorCustomMessage: string, errorData: any): Error => {
    return { message: errorCustomMessage, data: errorData };
}