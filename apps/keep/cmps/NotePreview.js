import NoteImg from '../noteCmps/NoteImg.js'
import NoteTodos from '../noteCmps/NoteTodos.js'
import NoteTxt from '../noteCmps/NoteTxt.js'

export default {
    props: ['note'],
    template:`
        <article>
            <component @done="passDone" :is="note.type" :info="note.info"></component>
        </article>
    `,
    methods:{
        passDone(todo){
            let note = this.note
            this.$emit('done', todo, note)
        }
    },
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