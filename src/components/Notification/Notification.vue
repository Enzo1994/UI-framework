<template>
  <!-- 如果上来visible就是true的话，不会触发enter相关事件，比如after-enter -->
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div
      class="notification"
      :style="style"
      @mouseover="mouseoverHandler"
      @mouseout="mouseoutHandler"
      v-show="visible"
    >
      <i @click="closeHandler">x</i>
      <div>{{content}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["content"],
  computed: {
    style() {
      return {};
    },
  },
  data() {
    return {
      visible: false, // 如果组件一上来的v-show就是ture，是不会触发 transition 的，after-enter 不会被触发
      height: 0,
    };
  },
  methods: {
    afterEnter() {
      this.height = this.$el.offsetHeight; // 隐藏以后但是dom节点没删除，拿不到高度怎么办？ 存入实例的data里
    },
    mouseoutHandler() {},
    mouseoverHandler() {},
    closeHandler(e) {
      e.preventDefault();
      this.$emit("close");
    },
    afterLeave() {
      this.$emit("closed");
    },
  },
};
</script>

<style>
.notification {
  padding: 20px;
  width: 300px;
  height: 50px;
  position: absolute;
  right: 0;
  bottom: 16px;
  background-color: gray;
  line-height: 50px;
}
i {
  position: absolute;
  right: 20px;
  top: 0;
}
</style>