import { noteService } from "../services/note-service.js";

export default {//idea, when he makes the note, you can preview it to him
    template: `
        <form @submit.prevent="save">
            <input type="text" v-model="info" :placeholder="placeholderText">
            <input v-if="type !== 'NoteTxt'" type="text" v-model="title" placeholder="Enter the title">
            <label><!-- should i make for each label, to color the selected, mmmm-->
                <input type="button" @click="typeChange('NoteTxt')">
                Text

                <input type="button" @click="typeChange('NoteImg')">
                Image

                <input type="button" @click="typeChange('NoteTodos')">
                Todos

                <input type="button" @click="typeChange('NoteVideo')">
                Video
            </label>
                <button>Save</button>
        </form>
        <!-- <button v-if="type === 'NoteTodos'" @click="saveTodo">Save todo</button> -->
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
        // saveTodo(){
        //     this.todos.push({txt: this.info, doneAt: null})//separate by ,
        //     this.info = ''
        // },
        save(){
            let note = {}
            note.type = this.type
            note.style = {backgroundColor: 'grey'}
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