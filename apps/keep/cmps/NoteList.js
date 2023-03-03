import NotePreview from "../cmps/NotePreview.js"

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
            <li v-for="note in notes" :key="note.id" class="note-card" :style="{ background: note.style.backgroundColor }">
                <NotePreview :note="note" @done="passDone" />
                <div class="card-options">
                <button @click="changeColor(note)">color change</button>
                <button :class="{'pinned': note.isPinned}" @click="pin(note)">pin</button>
                <button @click="dupe(note)">dupe me</button>
                <button @click="noteRemove(note)">delete me</button>
                </div>
            </li>
            </ul>
        </section>
    `,
    data() {
        return {        }
    },
    methods: {
        passDone(todo, note) {
            this.$emit('done', todo, note)
        },
        pin(note){
            this.$emit('pin', note)
        },
        dupe(note){
            this.$emit('dupe', note)
        },
        noteRemove(note){
            this.$emit('delete', note)
        },
        changeColor(note){
            this.$emit('colorSwap', note)
        }

    },
    components: {
        NotePreview,
    },
}