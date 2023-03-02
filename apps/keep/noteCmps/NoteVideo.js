
export default {
    props: ['info'],
    template:`
        <div>
            <h2>{{ info.title }}</h2>
            <video controls>
                <source :src="info.url" type="video/mp4">
            </video>
        </div>
    `,
    computed: {

    }
  }