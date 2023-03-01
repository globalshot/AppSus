

export default {
    template: `
        <form @submit.prevent="save">
            <input type="text" v-model="info" :placeholder="placeholderText">
            <label>
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
    `,
    data(){
        return{
            info: '',
            type: '',
            placeholderText: 'Enter your text here',
        }
    },
    methods:{
        save(){
            // console.log('test');
            console.log(this.info);
            console.log(this.type);
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
    }
}