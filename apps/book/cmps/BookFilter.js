export default {
    template:`
        <section>
            <input 
                v-model="filterBy.title"
                @input="filter"
                placeHolder="Search"
                type="text" />
        </section>
    `,
    data(){
        return{
            filterBy: { title: '', maxPrice: 0},
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
}