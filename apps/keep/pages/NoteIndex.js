import { noteService } from "../services/note-service.js"
import NoteList from "../cmps/NoteList.js"


export default {
	template: `
        <section class="make-note"><!--mmm, should i make make 1 file, or just link to the notes-->
            <router-link to="/note/add">Make new note</router-link>
        </section>

        <section class="notes-index"><!--suppose to be NodeList and not just jump to preview-->
            <NoteList 
                :notes="notes"
                @done="todoDone"
                />
            <!-- <pre>{{ test }}</pre> -->
        </section>
    `,
    data(){
        return{
            // test: [],
            notes: [],
        }
    },
    methods:{
        todoDone(todo, note){
            todo.doneAt = Date.now()
            // console.log(todo);
            // console.log(note.id);
            noteService.save(note)

        }
    },
    components:{
        noteService,
        NoteList,
    },
    created(){
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
}
