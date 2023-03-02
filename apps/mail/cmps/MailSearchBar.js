export default {
    template: `
<form class="search-container" @submit.prevent="filterbytxt">
    <input type="search" placeholder="Search Mail..." v-model="filtertxt"/>
    <button>🔍</button>
    <select onChange={handleReadChange}>
        <option value={''}>All</option>
        <option value={'read'}>Read</option>
        <option value={'unread'}>Unread</option>
        <option value={'starred'}>Starred</option>
      </select>
    </form>
`,
    data() {
        return {
            filtertxt: ''
        }
    },
    computed: {
        filterbytxt(){
            this.$emit('filtertxts',this.filtertxt)
        }
    }

}