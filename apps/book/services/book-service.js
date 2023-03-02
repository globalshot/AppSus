
import { utilService } from './../../../services/util.service.js'
import { storageService } from './../../../services/async-storage.service.js'

import booksDB from "./../data/book.json" assert { type: "json" }

const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
    addGoogleBook,
    removeReview,
    
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then((books) => {
      if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        books = books.filter((book) => regex.test(book.title))
      }
      if (filterBy.amount) {
        // books = books.filter(book => book.maxPrice >= filterBy.minPrice)
      }
      return books
    })
  }

function get(bookId) {//get
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {//remove
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {//update or save
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', amount = 0) {
    const listPrice = {}
    listPrice.amount = amount
    return { id: '', title, listPrice }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = booksDB
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(title, amount = 250) {
  const listPrice = {}
    listPrice.amount = amount
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}

function addReview(book, review) {
        if (!book.reviews) book.reviews = []
          review.id = utilService.makeId()
          book.reviews.push(review)
          console.log(book)
          return save(book)  
}

function removeReview(bookId, reviewId) {
  return storageService.get(BOOK_KEY, bookId)
      .then(book => {
          const idx = book.reviews.findIndex(review => review.id === reviewId)
          book.reviews.splice(idx, 1)
          return save(book)
        }
      )
}

function _setNextPrevBookId(book) {
  return storageService.query(BOOK_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
    book.prevBookId = books[bookIdx - 1]
        ? books[bookIdx - 1].id
        : books[books.length - 1].id
    return book
})
}

function addGoogleBook(book1) {
  return query()
        .then(books => {
            if (books.some(book => book.title === book1.title)) return
            return storageService.post(BOOK_KEY, book1)
        })
}
// function addGoogleBook(book) {
//   return storageService.put(BOOK_KEY, book)
//           .catch(() => storageService.post(BOOK_KEY, book))
// }