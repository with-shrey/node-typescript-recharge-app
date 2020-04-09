import HttpError from './errors/HttpError';

export default function errorConverter(error) {
    if (error.name === 'AppError') {
        return new HttpError(403,
            error.message
        );
    } else if (error.name === 'AuthorisationError') {
        return new HttpError(401,
            error.message,
            error.stack,
            error.name
        );
    } else if (error.name === 'DatabaseError') {
        return new HttpError(500,
            'In:' + error.file + '\n' + error.message,
            JSON.stringify(error.parameters),
            error.name
        );
    }
    return new HttpError(500,
        'ERR: Error Encountered, Check Logs for details',
        error.stack
    );
}
