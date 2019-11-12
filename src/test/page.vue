<template>
  <div class="container-page">
    <p>header</p>
    <div>
        <!-- 作用域插槽 -->
      <slot name="content" :fn="pageName" last="测试"></slot>
    </div>
    <p>
      <slot name="footer"></slot>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: '作用域插槽'
    }
  }
}
</script>

<style scoped lang='less'></style>
