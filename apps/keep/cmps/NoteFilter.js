export default {
    template:`
        <section>
            <input 
                v-model="filterBy.txt"
                @input="filter"
                placeHolder="Search text"
                type="text" />
        </section>
    `,
    data(){
        return{
            filterBy: { txt: '', maxPrice: 0},
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
}