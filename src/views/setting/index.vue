<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号 :">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机 :">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称 :">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍 :">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱 :">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传 -->
          <!-- 头像 -->
          <!-- action=" http://ttapi.research.itcast.cn/mp/v1_0/user/images" -->
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="uploadPhoto"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
    <!-- <com-a></com-a>
    <hr>
    <com-b></com-b>-->
  </div>
</template>

<script>
// import ComA from '@/test/com-a.vue'
// import ComB from '@/test/com-b.vue'
import eventBus from '@/eventBus'
import local from '@/utils/local'
// import { async } from 'q'
export default {
  // components: {
  //   ComA,
  //   ComB
  // },
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        id: '',
        // 手机
        mobile: '',
        // 显示的头像
        photo: null
      }
    }
  },
  created () {
    this.userSetting()
  },
  methods: {
    // 获取用户信息
    async userSetting () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userInfo = data
    },
    // 保存设置
    async saveInfo () {
      // put 请求是修改  完整的修改所有信息
      // patch 请求是修改 局部的修改一些信息
      const { name, email, intro } = this.userInfo
      await this.$http.patch('user/profile', {
        name,
        email,
        intro
      })
      // 提示
      this.$message.success('保存成功')
      // 改home组件(页面头部的信息)
      eventBus.$emit('updateName', name)
      // 改本地存储
      const user = local.getUser()
      user.name = name
      local.setUser(user)
    },
    // 修改头像
    // 结构出来的文件对象
    async uploadPhoto ({ file }) {
      // resule.file 就是结构出来的对象
      const formData = new FormData()
      formData.append('photo', file)
      const {
        data: { data }
      } = await this.$http.patch('user/photo', formData)
      // 提示
      this.$message.success('更改头像成功')
      // 更改
      this.userInfo.photo = data.photo
      // 更改home中的头像
      eventBus.$emit('updataphoto', data.photo)
      // 更改本地储存的内容
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    }
  }
}
</script>

<style scoped lang='less'></style>
