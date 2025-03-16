const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// ✅ Enable CORS for all requests
app.use(cors());

// ✅ Create a proxy that forwards requests to any external URL
app.use('/', createProxyMiddleware({
    target: '', // Target will be dynamically set
    changeOrigin: true,
    pathRewrite: {
        '^/': '', // Remove the leading slash to allow full URL forwarding
    },
    onProxyReq: (proxyReq, req) => {
        const targetUrl = req.url.substring(1); // Extract the actual target URL
        proxyReq.path = targetUrl;
    }
}));

// ✅ Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`CORS Proxy running on port ${PORT}`);
});
