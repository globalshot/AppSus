import NotePreview from "../cmps/NotePreview.js"

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <div v-for="note in notes" :key="note.id">
                <NotePreview :note="note" @done="passDone"/>
            </div>
        </section>
    `,
    methods:{
        passDone(todo, note){
            this.$emit('done', todo, note)
        }
    },
    components:{
        NotePreview,
    },
}