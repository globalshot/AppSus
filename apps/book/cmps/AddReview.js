import { eventBusService } from "../../../services/event-bus.service.js"
import { bookService } from "../services/book-service.js"

export default {//to finish, idk
    template: `
        <section class="book-review">
            <h2>Add your book review</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="review.fullname" placeholder="Full name">
                <input type="number" v-model.number="review.rating" min="1" max="5">
                <input type="date" v-model.date="review.date">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {//bad data
        return {
            review: {},
            bookId: null,
            book: bookService.getEmptyBook(),
        }
    },
    created() {
        const {bookId} = this.$route.params
        if (bookId) {
            bookService.get(bookId)
                .then(book => this.book = book)
        }
    },
    methods: {
        save() {
            console.log('this.book.id',this.book.id);
            console.log('this.review',this.review);
            // bookService.addReview(this.book.id, this.review)
            bookService.addReview(this.book, this.review)
                .then(savedBook => {
                    // console.log('Book saved', savedBook)
                    eventBusService.emit('show-msg', { txt: 'Review saved', type: 'success' })
                    this.$router.push('/book')
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'Review save failed', type: 'error' })
                })
        }
    }
}