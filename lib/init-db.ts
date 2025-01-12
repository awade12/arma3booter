import { initDB } from './db';

// Initialize the database
(async () => {
  try {
    await initDB();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
})(); 