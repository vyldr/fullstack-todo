const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {

    // Send api requests to the backend
    app.use(
        createProxyMiddleware(
            '/api',
            {
                target: 'http://localhost:3001',
            })
    );
};
