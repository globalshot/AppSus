import NoteImg from '../noteCmps/NoteImg.js'
import NoteTodos from '../noteCmps/NoteTodos.js'
import NoteTxt from '../noteCmps/NoteTxt.js'

export default {
    props: ['note'],
    template:`
        <article>
            <component :is="note.type" :info="note.info"></component>
        </article>
    `,
    data(){
        return{

        }
    },
    computed: {
        
    },
    components:{
        NoteImg,
        NoteTodos,
        NoteTxt,
    }
}