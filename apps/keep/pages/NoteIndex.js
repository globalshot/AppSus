import { noteService } from "../services/note-service.js"
import NotePreview from "../cmps/NotePreview.js"

export default {
	template: `
        <section class="make-note"><!--mmm, should i make make 1 file, or just link to the notes-->
            <router-link to="/note/add">Make new note</router-link>
        </section>

        <section class="note-list"><!--supopse to be NodeList and not just jump to preview-->
            <div v-for="note in notes" :key="note.id">
                <NotePreview :note="note"/>
            </div>
            <!-- <pre>{{ test }}</pre> -->
        </section>
    `,
    data(){
        return{
            // test: [],
            notes: [],
        }
    },
    components:{
        noteService,
        NotePreview,
    },
    created(){
        // noteService.query()
        //     .then(notes => this.test = notes)
        noteService.query().then((notes) => {
            this.notes = notes;})
    },
    computed: {
        notes() {
          return noteService.query()
        }
      },
    watch: {
        notes(newNotes) {
          // the notes property has been updated, re-render the component
          this.$forceUpdate();
        },
    }
    // beforeRouteEnter(to, from, next) {
    //     noteService.query()
    //       .then(notes => next(vm => {
    //         vm.test = notes
    //       }))
    //   },
    
}
