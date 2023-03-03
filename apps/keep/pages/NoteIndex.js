import { noteService } from "../services/note-service.js"
import NoteList from "../cmps/NoteList.js"
import NoteFilter from "../cmps/NoteFilter.js"
import BgcChangeColor from "../cmps/BgcChangeColor.js"


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
                @dupe="dupeCard"
                @delete="deleteNote"

                @colorSwap="changeNote"
                /><!--:notes="filteredNotes"-->
            <!-- <pre>{{ test }}</pre> -->
        </section>
            <BgcChangeColor v-if="currNote !== null" :note="currNote" @color="colorChange"/>
    `,
    data(){
        return{
            notes: [],
            filterBy: {},
            currNote: null,
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
            this.currNote = null
            note.style.backgroundColor = color
            noteService.save(note)
        },
        dupeCard(note){
            noteService.forcePush(note)
            .then(ah => noteService.query().then((notes) => {
                this.notes = notes;}))
        },
        deleteNote(note){
            noteService.remove(note.id)
            .then(ah => noteService.query().then((notes) => {
                this.notes = notes;}))
        },

        changeNote(note){
            if (this.currNote === note) this.currNote = null
            else this.currNote = note
        }
    },
    components:{
        noteService,
        NoteList,
        NoteFilter,
        BgcChangeColor,
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
