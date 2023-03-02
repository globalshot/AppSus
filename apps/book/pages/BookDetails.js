import { bookService } from '../services/book-service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

import LongTxt from '../cmps/LongTxt.js'
import AddReview from '../cmps/AddReview.js'

export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2><span>Title:</span> {{ book.title }}</h2>
            <h3><span>Subtitle:</span> {{ book.subtitle }}</h3>
            <h3><span>Authors:</span> {{ authors }}</h3>
            <h3><span>Published Date:</span> {{book.publishedDate}} {{ handleDateState }}</h3>
            <LongTxt :txt="book.description" />
            <h3><span>Page Count:</span>{{book.pageCount}} {{ handleReadingState }}</h3>
            <h3><span>Categories:</span> {{ categories }}</h3>
            <h3><span>Language:</span> {{ book.language }}</h3>
            
            <h4>Amount: 
              <span :class="handleAmountClass">{{ formattedPrice }}</span>
            </h4>

            <h4 v-if="book.listPrice.isOnSale">ON SALE!</h4>
         
          <img :src="book.thumbnail" alt="thumbnail">
          <br>
          <section class="review-list">
          <section v-if="book.reviews" v-for="review in book.reviews">
            <div class="review-card">
                <p>Full name: {{ review.fullname }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>Date of reading: {{ review.date }}</p>
                <button @click="removeReview(review.id)">delete review</button>
            </div>
        </section>
          </section>
          <br>
          <AddReview />
          <RouterLink :to="'/book/' + book.prevBookId">Previous book</RouterLink> |
          <RouterLink :to="'/book/' + book.nextBookId">Next book</RouterLink>
          <br>
          <RouterLink to="/book">Back to list</RouterLink>
        </section>
    `,
    computed: {
        bookId(){
            return this.$route.params.bookId
        },
        handleReadingState() {
            const currCount = this.book.pageCount;
            if (currCount >= 500) return ', Serious Reading';
            if (currCount >= 200) return ', Descent Reading ';
            if (currCount < 100) return ', Light Reading';
        },
        handleDateState() {
            const currYear = new Date().getFullYear();
            if (currYear - 10 > this.book.publishedDate) return ', Vintage';
            if (currYear - 1 <= this.book.publishedDate) return ', New';
        },
        handleAmountClass() {
            const currAmount = this.book.listPrice.amount;
            return { red: currAmount > 150, green: currAmount < 20 };
        },
        formattedPrice(){
          const {amount, currencyCode} = this.book.listPrice
          return new Intl.NumberFormat('en', {style:'currency', currency:currencyCode}).format(amount)
        },
        authors() {
            return this.book.authors.join(', ');
        },
        categories() {
            return this.book.categories.join(', ');
        },
    },
    components: {
        LongTxt,
        AddReview
    },
    data(){
        return{
            book: null,
        }
    },
    created(){
        this.loadBook()
    }, 
    watch:{
        bookId(){
            this.loadBook()
        }
    },
    methods:{
        loadBook(){
            bookService.get(this.bookId)
                .then(book => this.book = book)
        },
        removeReview(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(() => {
                    const idx = this.book.reviews.findIndex(review => review.id === reviewId)
                    this.book.reviews.splice(idx, 1)
                    eventBusService.emit('show-msg', { txt: 'Review removed', type: 'success' })
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'Review remove failed', type: 'error' })
                })
        },
    },
}