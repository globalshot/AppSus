export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <!-- <pre>{{ book }}</pre> -->
            <h2>title: {{ book.title }}</h2>
            <h4>subtitle: {{ book.subtitle }}</h4>
            <p>price: {{ book.listPrice.amount }}</p>
            <img :src="book.thumbnail" alt="thumbnail">
            <!-- <p>{{ book }}</p> -->
        </article>
    `,
}