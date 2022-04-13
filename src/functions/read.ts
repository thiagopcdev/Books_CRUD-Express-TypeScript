import fs from 'fs/promises';
import Book from '../interfaces/Book';

async function read(): Promise<Book[]> {
  const data = await fs.readFile('src/database/books.json','utf-8');
  const books: Book[] = JSON.parse(data);
  return books;
};

export default read;