export default {
    template:`
        <section>
            <input 
                v-model="filterBy.txt"
                @input="filter"
                placeHolder="Search text"
                type="text" />
                <select v-model="filterBy.type" @change="filter">
                    <option value="">All</option>
                    <option value="NoteTxt">Note text</option>
                    <option value="NoteTodos">Note todos</option>
                    <option value="NoteImg">Note image</option>
                </select>
        </section>
    `,
    data(){
        return{
            filterBy: { txt: '', type: ''},
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
}