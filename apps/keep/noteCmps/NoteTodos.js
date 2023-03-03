
export default {
    props: ['info'],
    template:`
        <div>
            <h2>{{ info.title }}</h2>
              <ul class="todo-in-list">
                <li v-for="eachTodo in info.todo">
                  {{ eachTodo.txt }} -
                  <span v-if="eachTodo.doneAt !== null"> done at {{ date(eachTodo.doneAt) }}</span>
                  <button class="finish-todo" :style="{color: 'grey'}" v-else @click="done(eachTodo)">Done?</button>
                </li>
              </ul>
        </div>
    `,
    methods:{
      done(todo){
        this.$emit('done', todo)
      },
      date(dateNumber){
        const now = new Date(dateNumber)
        const year = now.getFullYear()
        const month = (now.getMonth() + 1).toString().padStart(2, '0') 
        const day = now.getDate().toString().padStart(2, '0') 
        const hour = now.getHours().toString().padStart(2, '0') 
        const minutes = now.getMinutes().toString().padStart(2, '0') 

        return `${year}-${month}-${day} ${hour}:${minutes}`
      }
    },
    computed: {

    }
  }