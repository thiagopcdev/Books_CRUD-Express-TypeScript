import express from "express";
import BookRoutes from './routes/books';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const app: express.Application = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express + TypeScript');
});

app.use(BookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});