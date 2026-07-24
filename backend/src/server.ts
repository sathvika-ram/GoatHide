import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

import app from './app';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[GOATHIDES SERVER]: Running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('[GOATHIDES SERVER]: SIGTERM received. Shutting down gracefully.');
  server.close(() => {
    console.log('[GOATHIDES SERVER]: Server terminated.');
  });
});
