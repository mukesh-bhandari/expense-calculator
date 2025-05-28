// proxy/index.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();

// Proxy API requests to backend
app.use('/api', createProxyMiddleware({
  target: 'https://expense-calculator-u4zp.onrender.com',  // your actual backend Render URL
  changeOrigin: true,
  // pathRewrite: { '^/api': '' }
}));

// Serve frontend files from Vite build
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// For all other routes, return index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// Start the proxy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Reverse proxy running on port ${PORT}`);
});
