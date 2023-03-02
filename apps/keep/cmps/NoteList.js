import NotePreview from "../cmps/NotePreview.js"

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <div v-for="note in notes" :key="note.id" class="note-card" :style="{ background: note.style.backgroundColor }">
                <NotePreview :note="note" @done="passDone" />
                <!--idk if i need add form for the images tbh, we will see-->
                <!-- for now just color -->
                <div class="card-options">
                <button v-for="color in colors" :key="color" :style="{ background: color }" @click="selectColor(color, note)">
                </button>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            colors: ['black', 'white', 'red', 'green', 'blue'],
        }
    },
    methods: {
        passDone(todo, note) {
            this.$emit('done', todo, note)
        },
        selectColor(color, note) {
            note.style.backgroundColor = color
          }
    },
    components: {
        NotePreview,
    },
}