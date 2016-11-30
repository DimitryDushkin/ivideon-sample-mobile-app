const _get = require('lodash/get');

module.exports = {
    errorHandler(req, res, err) {
        const errorBody = _get(err, 'response.body', '');

        console.error(err);
        console.error(errorBody);

        res
            .status(err.statusCode || 500)
            .send( errorBody
                ? (JSON.stringify({ 'back-end error': errorBody }, null, 4))
                : (err.message || err));
    },

    noCacheMiddleware(req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        next();
    }
};
