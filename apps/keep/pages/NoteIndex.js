import { noteService } from "../services/note-service.js"
import NotePreview from "../cmps/NotePreview.js"

export default {
	template: `
        <section class="make-note"><!--mmm, should i make make 1 file, or just link to the notes-->
            <router-link to="/note/add">Make new note</router-link>
        </section>

        <section class="note-list">
            <div v-for="note in test" :key="note.id">
                <NotePreview :note="note"/>
            </div>
            <!-- <pre>{{ test }}</pre> -->
        </section>
    `,
    data(){
        return{
            test: [],
            // notes: null
        }
    },
    components:{
        noteService,
        NotePreview,
    },
    created(){
        noteService.query()
            .then(notes => {this.test = notes})
    },
    computed: {
        notes() {
          return noteService.query()
        }
      }
    // beforeRouteEnter(to, from, next) {
    //     noteService.query()
    //       .then(notes => next(vm => {
    //         vm.test = notes
    //       }))
    //   },
    
}
