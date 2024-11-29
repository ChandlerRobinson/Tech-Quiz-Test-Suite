import express from 'express';
import path from 'node:path';

import db from './config/connection.js';
import routes from './routes/index.js';

// Initialize the database connection
await db();

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse URL-encoded data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routes for API endpoints
app.use(routes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(
    express.static(path.join(__dirname, '../client/dist'), {
      setHeaders: (res, filePath) => {
        // Set MIME types explicitly for .js and .css files
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
        }
      },
    })
  );

  // Fallback route for SPA: serve index.html for all unmatched routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
