import BookPreview from './BookPreview.js'

export default {
    props: ['books'],
    template: `
    <section>
        <ul class="book-list">
            <li v-for="book in books" :key="book.id">
                <BookPreview :book="book"/>
                <RouterLink :to=" '/book/'+book.id">Details</RouterLink> |
                <RouterLink :to=" '/book/edit/'+book.id">Edit</RouterLink> |
                <button @click="remove(book.id)">x</button>
            </li>
        </ul>
    </section>
    `,
    methods:{
        remove(bookId) {
            this.$emit('remove', bookId)
        },
        showDetails(bookId){
            this.$emit('show-details', bookId)
        }
    },
    components:{
        BookPreview,
    }
}