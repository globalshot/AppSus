import { noteService } from "../services/note-service.js";

export default {//idea, when he makes the note, you can preview it to him
    template: `
        <form @submit.prevent="save" class="note-add">
            <input class="input-txt" type="text" v-model="info" :placeholder="placeholderText">
            <br>
            <input class="input-txt" v-if="type !== 'NoteTxt'" type="text" v-model="title" placeholder="Enter the title">
            <br>    
            <label>
                Text
                <input class="input-btn" type="button" @click="typeChange('NoteTxt')">

                Image
                <input class="input-btn" type="button" @click="typeChange('NoteImg')">

                Todos
                <input class="input-btn" type="button" @click="typeChange('NoteTodos')">

                Video
                <input class="input-btn" type="button" @click="typeChange('NoteVideo')">
            </label>
                <button>Save</button>
        </form>
    `,
    data(){
        return{
            info: '',
            title: '',
            type: 'NoteTxt',
            placeholderText: 'Enter your text here',
        }
    },
    methods:{
        save(){
            let note = {}
            note.type = this.type
            note.style = {backgroundColor: 'var(--note-clr6)'}
            note.isPinned = false
            
            if (this.type === 'NoteTxt') note.info = {txt: this.info}
            else{
                
                if (this.type === 'NoteTodos') {
                    const todos = this.info.split(',')
                    const todosArr = []
                    todos.forEach(txt => {
                        todosArr.push({txt, doneAt: null})
                    })
                    note.info = {todo: todosArr, title: this.title}
                }
                else{//if that is a video or image
                    note.info = {title: this.title}
                    note.info.url = this.info
                    //use this as image
                    //http://coding-academy.org/books-photos/20.jpg
                }
            }
            noteService.save(note)
                .then(empty => this.$router.push('/note'))
        },
        typeChange(noteType){
            this.type = noteType
            switch (noteType) {
                case 'NoteTxt':
                    this.placeholderText = 'Enter text here'
                    break;
                case 'NoteImg':
                    this.placeholderText = 'Enter image link here'
                    break;
                case 'NoteTodos':
                    this.placeholderText = 'Enter todo here'
                    break;
                case 'NoteVideo':
                    this.placeholderText = 'Enter video link here'
                    break;
            
                default:
                    break;
            }
        }
    },
    components:{
        
    }
}