import { bookService } from '../services/book-service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'

import { eventBusService } from '../../../services/event-bus.service.js'

export default {
    template: `
    <section class="books-index">
        <div class="add-book">
            <RouterLink to="/book/add">Add new book</RouterLink><!--making like the filter-->
        </div>
        <BookFilter @filter="setFilterBy"/><!--filter is just by title for now -->
        <BookList
            :books="filteredBooks"
            @remove="removeBook"
            />
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: {}
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    eventBusService.emit('show-msg', { txt: 'book removed', type: 'success' })
                })
                .catch(err=>{
                    eventBusService.emit('show-msg', { txt: 'book remove failed', type: 'error' })
                })
        },
        setFilterBy(filterBy){
            this.filterBy = filterBy
        }
    },
    components: {
        bookService,
        BookList,
        BookFilter,
    },
    computed: {
        filteredBooks() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.books.filter(book => regex.test(book.title))
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    }
}