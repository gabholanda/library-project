const express = require('express');
const router = express.Router();
const book = require('../models/book');

router.get('/', (req, res) => {
  res.render('index');
})

router.get('/books', (req, res) => {
  book.find()
    .then(books => {
      res.render('books', { books });
    })
    .catch(err => console.log(err));
  // let books = [
  //   { title: 'Livro1' },
  //   { title: 'Livro2' },
  //   { title: 'Livro3' },
  // ]
});

router.get('/books/add', (req, res) => {
  res.render('book-add');
});

router.post('/books/add', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  const newBook = new book({ title, author, description, rating })
  newBook.save()
    .then((book) => {
      res.redirect('/books');
    })
    .catch((error) => {
      console.log(error);
    })
});

router.get('/books/edit/:bookID', (req, res, next) => {
  book.findById(req.params.bookID)
    .then((book) => {
      res.render("book-edit", { book });
    })
    .catch((error) => {
      console.log(error);
    })
});

router.post('/books/edit/:bookID', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  book.update({ _id: req.params.bookID }, { $set: { title, author, description, rating } })
    .then((Book) => {
      res.redirect('/books');
    })
    .catch((error) => {
      console.log(error);
    })
});

router.get('/books/:bookID', (req, res) => {
  const Book = req.params.bookID;
  console.log(Book)
  book.findById(Book)
    .then(Book => {
      console.log(Book)
      res.render('book-details', Book);
    })
    .catch(err => console.log(err));
}); 
module.exports = router;