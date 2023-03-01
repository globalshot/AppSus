
export default {
    props: ['info'],
    template:`
        <div>
            <h2>{{ info.title }}</h2>
              <ul>
                <li v-for="todo in info.todos">
                  {{ todo.txt }} -
                  <span v-if="todo.doneAt !== null"> done at {{ todo.doneAt }}</span>
                </li>
              </ul>
        </div>
    `,
    computed: {

    }
  }