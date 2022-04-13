import express from "express";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Express + TypeScript');
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})