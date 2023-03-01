
export default {
    props: ['info'],
    template:`
        <div>
            <h2>{{ info.title }}</h2>
            <img :src='info.url'/>
        </div>
    `,
    computed: {

    },
  }