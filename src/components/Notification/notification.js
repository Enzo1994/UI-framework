import Notification from './Notification.vue'

// 其他逻辑写这里
export default {
    extends: Notification,
    props: {
        autoClose: {
            type: Number,
            default: 3000
        }
    },
    computed: {
        style() {
            return {
                bottom: this.bottomOffset + 'px'
            }
        }
    },
    data() {
        return {
            timer: null,
            bottomOffset: 0,
        }
    },
    mounted() {
        this.createTimer()
    },
    methods: {
        mouseoutHandler() {
            this.createTimer()
        },
        mouseoverHandler() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.$emit('mouseover')
            console.log(this.timer);
        },
        createTimer() {
            this.timer = setTimeout(() => {
                this.visible = false
            }, this.autoClose);
        }
    },
    beforeDestory() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }
}