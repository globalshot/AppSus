export default {
    props: ['note'],
    emits: ['color'],
    template: `
        <button class="card-colors" v-for="color in colors" 
            :key="color" :style="{ background: color }" 
                @click="selectColor(color, note)">
        </button>
    `,
    data() {
        return {
            colors: ['black', 'white', 'red', 'green', 'blue', '#9b9b9b'],//cant use vars sadly
        }
    },
    methods:{
        selectColor(color, note){
            this.$emit('color', note, color)
        }
    }
}