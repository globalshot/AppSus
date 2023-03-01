import { noteService } from "../services/note-service.js"
import NotePreview from "../cmps/NotePreview.js"

export default {
	template: `
        <section class="make-note"><!--mmm, should i make make 1 file, or just link to the notes-->
            <router-link to="/note/add">Make new note</router-link>
        </section>

        <section class="note-list">
            <h1>Keep notes</h1>
            <div v-for="note in test">
                <NotePreview :note="note"/>
            </div>
            <!-- <pre>{{ test }}</pre> -->
        </section>
    `,
    data(){
        return{
            test: noteService.test()
        }
    },
    components:{
        noteService,
        NotePreview,
    }
}
