
export default {
	template: `
    <div class="home-background-black">
        <section class="home-page">
            <h1>Home sweet home</h1>
        </section>
        <div class="follower" :style="{top: mouseY + 'px', left: mouseX + 'px'}"></div>
        </div>
    `,
        data() {
          return {
            mouseX: 0,
            mouseY: 0
          }
        },
        mounted() {
          document.addEventListener('mousemove', this.handleMouseMove);
        },
        beforeDestroy() {
          document.removeEventListener('mousemove', this.handleMouseMove);
        },
        methods: {
          handleMouseMove(event) {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
          }
        }
}
