import { utilService } from './../../../services/util.service.js'

const GOOGLE_BOOK_KEY = 'googleBookDB'
const urlGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=`

let gGoogleBook = utilService.loadFromStorage(GOOGLE_BOOK_KEY) || {}

export const googleBookService = {
    query,
}

function query(txt) {
    if (gGoogleBook[txt]) {
        console.log('Loading book')
        return Promise.resolve(gGoogleBook[txt])
    }
    return axios.get(urlGoogleBooks + txt).then(res => {
        const books = res.data.items.map(book => _prepareData(book))
        gGoogleBook[txt] = books
        utilService.saveToStorage(GOOGLE_BOOK_KEY, gGoogleBook)
        return books
    })
}

function _prepareData(book) {
    const newBook = getEmptyBook()
    newBook.id = utilService.makeId()
    newBook.title = book.volumeInfo.title || ''
    newBook.description = book.volumeInfo.description || ''
    newBook.language = book.language || 'EN'
    newBook.pageCount = book.volumeInfo.pageCount || 0
    newBook.publishedDate = book.volumeInfo.publishedDate || 0
    newBook.subtitle = book.volumeInfo.subtitle || ''
    newBook.thumbnail = book.volumeInfo.imageLinks?.thumbnail || newBook.thumbnail
    newBook.authors = book.volumeInfo.authors || []
    newBook.categories = book.volumeInfo.categories || []
    newBook.listPrice.amount = utilService.getRandomIntInclusive(50, 200)
    newBook.listPrice.currencyCode = 'EUR'
    newBook.listPrice.isOnSale = book.saleInfo.saleability === 'NOT_FOR_SALE' ? false : true
    return newBook
}

function getEmptyBook(
    title = '',
    description = '',
    language = 'en',
    pageCount = 0,
    publishedDate = 0,
    subtitle = '',
    thumbnail = '',
    authors = [],
    categories = [],
    listPrice = {
        amount: 0,
        currencyCode: 'EUR',
        isOnSale: false
    }) {
    return {
        id: '',
        title,
        description,
        language,
        pageCount,
        publishedDate,
        subtitle,
        thumbnail,
        authors,
        categories,
        listPrice
    }
}