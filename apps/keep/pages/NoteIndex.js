import { noteService } from "../services/note-service.js"
import NotePreview from "../cmps/NotePreview.js"

export default {
	template: `
        <section class="home-page">
            <h1>Keep notes</h1>
            <div v-for="note in test">
                <NotePreview :note="note"/>
            </div>
            <pre>{{ test }}</pre>
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
