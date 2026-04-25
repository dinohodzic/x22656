// Entry point for cPanel Node.js App
// This simply imports the compiled server.

import('./dist/server.cjs').catch(err => {
  console.error("Failed to start server. Make sure you have run 'npm run build' first.");
  console.error(err);
});
