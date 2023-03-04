import NotePreview from "../cmps/NotePreview.js"

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
            <li v-for="note in notes" :key="note.id" class="note-card" :style="{ background: note.style.backgroundColor }">
                <NotePreview :note="note" @done="passDone" />
                <div class="card-options">
                <button @click="changeColor(note)"><i class="fa-solid fa-palette"></i></button>
                <button :class="{'pinned': note.isPinned}" @click="pin(note)"><i class="fa-solid fa-thumbtack"></i></button>
                <button @click="dupe(note)"><i class="fa-solid fa-notes-medical"></i></button>
                <button @click="noteRemove(note)"><i class="fa-solid fa-trash-can"></i></button>
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