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
                @pin="pinned"
                @colorChange="colorChange"
                @dupe="dupeCard"
                /><!--:notes="filteredNotes"-->
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
        },
        pinned(note){
            note.isPinned = !note.isPinned
            noteService.save(note)
        },
        colorChange(note, color){
            note.style.backgroundColor = color
            noteService.save(note)
        },
        dupeCard(note){
            let newNote = JSON.parse(JSON.stringify(note))
            newNote.id = null
            noteService.save(newNote)
                .then(this.notes.push(newNote))
            
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
        filteredNotes()  {
            // const regex = new RegExp(this.filterBy.txt, 'i')
            // return this.notes.filter(note => (regex.test(note.info.txt) || regex.test(note.info.title)))
            const regex1 = new RegExp(this.filterBy.txt, 'i')
            const regex2 = new RegExp(this.filterBy.type, 'i')
            // return this.notes.filter(note => (
            //                 (regex1.test(note.info.txt) || regex1.test(note.info.title))
            //                 && (this.filterBy.type===''||regex2.test(note.type))))
            let arr = this.notes.filter(note => (
                (regex1.test(note.info.txt) || regex1.test(note.info.title))
                && (this.filterBy.type===''||regex2.test(note.type))))
            let pinnedArr = arr.filter(note => note.isPinned)
            let notPinnedArr = arr.filter(note => (!note.isPinned))
            return pinnedArr.concat(notPinnedArr)
        }
      },
    //   pinnedOrder() {
    //     let arr = filteredNotes()
    //     let pinnedArr = arr.filter(note => note.isPinned)
    //     let notPinnedArr = arr.filter(note => (!note.isPinned))
    //     return pinnedArr.concat(notPinnedArr)
    //   }
}
