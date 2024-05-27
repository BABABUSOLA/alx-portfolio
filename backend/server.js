import express from 'express';
import router from './routes/index.js';
const app = express();

const port = parseInt(process.env.PORT, 10) || 5000;


app.use(express.json());
app.use('/api/v1/', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;