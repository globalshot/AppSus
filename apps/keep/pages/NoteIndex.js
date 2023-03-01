import { noteService } from "../services/note-service"

export default {
	template: `
        <section class="home-page">
            <h1>Keep notes</h1>
            <noteService />
        </section>
    `,
    components:{
        noteService,
    }
}
