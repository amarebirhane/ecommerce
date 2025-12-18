import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// Global middleware
app.use(express.json());

// Health / test route
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello, Node.js 2025 with TypeScript!');
});

// Start server (keeps process running)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;