
export default {
    props: ['info'],
    template:`
        <div>
            <h2>{{ info.title }}</h2>
              <ul>
                <li v-for="eachTodo in info.todo">
                  {{ eachTodo.txt }} -
                  <span v-if="eachTodo.doneAt !== null"> done at {{ date(eachTodo.doneAt) }}</span>
                  <button v-else @click="done(eachTodo)">Todo done</button>
                </li>
              </ul>
        </div>
    `,
    methods:{
      done(todo){
        this.$emit('done', todo)
        // todo.doneAt = new Date()
      },
      date(dateNumber){
        const now = new Date(dateNumber)
        const year = now.getFullYear()
        const month = (now.getMonth() + 1).toString().padStart(2, '0') // Add leading zero if month is less than 10
        const day = now.getDate().toString().padStart(2, '0') // Add leading zero if day is less than 10
        const hour = now.getHours().toString().padStart(2, '0') // Add leading zero if hour is less than 10
        const minutes = now.getMinutes().toString().padStart(2, '0') // Add leading zero if minutes is less than 10

        return `${year}-${month}-${day} ${hour}:${minutes}`
      }
    },
    computed: {

    }
  }