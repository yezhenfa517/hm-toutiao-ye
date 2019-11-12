<template>
  <el-select :value="value" @change="fn" clearable placeholder="请选择">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      //   value: null,
      options: []
    }
  },
  created () {
    this.getOptions()
  },
  methods: {
    // 值改变函数必须要在获取文章列表函数之上 不然会报错
    // 值改变的函数
    fn (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    },
    //   获取文章列表
    async getOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.options = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
