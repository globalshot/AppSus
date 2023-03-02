export default {
    template:`
    <header class="app-header">
            <h1>miss book? here book</h1>
            <nav>
                <RouterLink to="/">Home</RouterLink> |
                <RouterLink to="/book">Our books</RouterLink> |
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </header>
    `,
    methods: {
    }
}