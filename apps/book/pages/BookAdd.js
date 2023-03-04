import { bookService } from '../services/book-service.js'

import BookFilter from '../cmps/BookFilter.js'// i guess i need it
import { googleBookService } from '../services/googleBook-service.js'

export default {
    template: `
        <section class="search-book">
            <RouterLink to="/book/edit" class="edit-book">Add your book</RouterLink> | 
            <input type="text" v-model="searchTxt" placeholder="search for existing book">
            <ul class="google-list" v-for="(book, index) in list" v-if="searchTxt && searchTxt !== ''" >
            <!-- <ul v-for="(book, index) in list" v-if="index < 3"> -->
                <!-- <li v-if="index < 6"> -->
                <li class="google-books">
                    {{ book.title }}
                    <button class="addBtn" @click="bookAdd(book)">+</button>
                </li>
            </ul>
        </section>
    `,
    data(){
        return{
            searchTxt: '',
            txt: null,
            list: [],
            // list: [
            //     { title: "pen", id: '15152' },
            //     { title: "ten", id: '25152' },
            //     { title: "cen", id: '35152' },
            //     { title: "ven", id: '45152' },
            //     { title: "yen", id: '55152' },
            // ],
        }
    },
    methods:{
        bookAdd(book){
            bookService.addGoogleBook(book)
        },
        getBooks(word){
            googleBookService.query(word)
                .then(books => this.list = books)
        },
    },
    computed: {
    },
    watch:{
        searchTxt(word){//debounce
            clearTimeout(this.txt)
            this.txt = setTimeout(()=> {this.getBooks(word)}, 1000)

        }
    },
    components: {
        BookFilter,
        bookService
    }
}
//the link
//  https://www.googleapis.com/books/v1/volumes?q=(search by word)