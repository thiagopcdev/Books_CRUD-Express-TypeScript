import { Router, Request, Response } from 'express';
import validBook from '../middlewares/validBook';
import { read, write } from '../functions/read';
import StatusCode from '../enums/StatusCode';
import Book from '../interfaces/Book';

const router = Router();

const notFoundMessage = 'Livro não encontrado.';

router.get('/books', async (req: Request, res: Response) => {
  const books = await read();
  return res.status(StatusCode.OK).json(books);
});

router.get('/books/:isbn', async (req: Request, res: Response) => {
  const { isbn } = req.params;

  const books = await read();
  const book = books.find(book => book.isbn === isbn);

  if(!book) return res.status(StatusCode.NOT_FOUND).send(notFoundMessage);
  return res.status(StatusCode.OK).json(book);
});

router.post('/books', validBook, async (req: Request, res: Response) => {
  const book: Book = req.body;

  const books = await read();
  books.push(book);
  await write(books);

  return res.status(StatusCode.CREATED).json(book);
});

router.put('/books/:isbn', validBook, async (req: Request, res: Response) => {
  const { isbn } = req.params;
  const editedBook: Book = req.body;

  const books = await read();
  const index = books.findIndex((book) => book.isbn === isbn);

  if(index === -1) return res.status(StatusCode.NOT_FOUND).send(notFoundMessage);
  books.splice(index, 1, editedBook);
  await write(books);

  return res.status(StatusCode.OK).json(editedBook);
});

router.delete('/books/:isbn', async (req: Request, res: Response) => {
  const { isbn } = req.params;
  
  const books = await read();
  const index = books.findIndex((book) => book.isbn === isbn);

  if(index === -1) return res.status(StatusCode.NOT_FOUND).send(notFoundMessage);

  books.slice(index, 1);
  await write(books);

  return res.status(StatusCode.NO_CONTENT).end();
});

export default router;