export default {
    template:`
        <section class="note-filter">
            <input 
                v-model="filterBy.txt"
                @input="filter"
                placeHolder="Search title"
                type="text" />
            <select class="type-options" v-model="filterBy.type" @change="filter">
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