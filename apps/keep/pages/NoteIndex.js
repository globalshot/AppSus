import { noteService } from "../services/note-service.js"
import NoteList from "../cmps/NoteList.js"
import NoteFilter from "../cmps/NoteFilter.js"


export default {
	template: `
        <section class="make-note"><!--mmm, should i make make 1 file, or just link to the notes-->
            <router-link to="/note/add">Make new note</router-link>
        </section>
        <NoteFilter @filter="setFilterBy"/>

        <section class="notes-index"><!--suppose to be NodeList and not just jump to preview-->
            <NoteList 
                :notes="filteredNotes"
                @done="todoDone"
                />
            <!-- <pre>{{ test }}</pre> -->
        </section>
    `,
    data(){
        return{
            notes: [],
            filterBy: {}
        }
    },
    methods:{
        todoDone(todo, note){
            todo.doneAt = Date.now()
            noteService.save(note)
        },
        setFilterBy(filterBy){
            this.filterBy = filterBy
        }
    },
    components:{
        noteService,
        NoteList,
        NoteFilter,
    },
    created(){
        noteService.query().then((notes) => {
            this.notes = notes;})
    },
    computed: {
        filteredNotes() {
            // const regex = new RegExp(this.filterBy.txt, 'i')
            // return this.notes.filter(note => (regex.test(note.info.txt) || regex.test(note.info.title)))
            const regex1 = new RegExp(this.filterBy.txt, 'i')
            const regex2 = new RegExp(this.filterBy.type, 'i')
            return this.notes.filter(note => ((regex1.test(note.info.txt) || regex1.test(note.info.title)) && (this.filterBy.type===''||regex2.test(note.type))))
        }
      },
}
