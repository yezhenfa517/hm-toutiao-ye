<template>
  <div class="com-b">
    con-B
    <button @click="fn">点击传值</button>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      msg: '组件B的数据'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('B2A', this.msg)
    }
  }
}
</script>

<style scoped lang='less'></style>
