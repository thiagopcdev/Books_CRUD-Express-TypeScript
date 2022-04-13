import { NextFunction, Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import Book from '../interfaces/Book';

const properties = ['type', 'name', 'price', 'image', 'author', 'publishingCompany', 'isbn'];

function validProperties(book: Book): [boolean, string | null] {
  for (let i = 0; i < properties.length; i+= 1) {
    if(!Object.prototype.hasOwnProperty.call(book, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
};

function validValues(book: Book): [boolean, string | null] {
  const entries = Object.entries(book);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if(!value) {
      return [false, property];
    }
  }
  return [true, null];
};

function validBook(req: Request, res: Response, next: NextFunction) {
  const book: Book = req.body;

  let [valid, property] = validProperties(book);
  if(!valid) {
    return res.status(StatusCode.BAD_REQUEST).send(`O campo ${property} é obrigatório.`);
  };

  [valid, property] = validValues(book);
  if(!valid) {
    return res.status(StatusCode.BAD_REQUEST).send(`O campo ${property} não pode ser nulo ou vazio.`)
  };

  next();
};

export default validBook;