export default {
    props: ['note'],
    emits: ['color'],
    template: `
    <div class="color-bar">
        <button class="card-colors" v-for="color in colors" 
            :key="color" :style="{ background: color }" 
                @click="selectColor(color, note)">
        </button>
        </div>
    `,
    data() {
        return {
            colors: ['var(--note-clr1)', 'var(--note-clr2)', 'var(--note-clr3)', 'var(--note-clr4)', 'var(--note-clr5)', 'var(--note-clr6)'],//cant use vars sadly
        }
    },
    methods:{
        selectColor(color, note){
            this.$emit('color', note, color)
        }
    }
}