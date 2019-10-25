<template>
  <div>
    <div class="jpg"></div>
    <el-card class="box-card">
      <img src="../../assets/logo_index.png" alt />
      <el-form ref="form">
        <el-form-item>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.region" class="left"></el-input>
          <el-button>立即获取</el-button>
        </el-form-item>
        <el-checkbox label="我已阅读并同意用户协议和隐私条款" name="type"></el-checkbox>
        <el-button class="primary" type="primary" @click="onSubmit">立即获取</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '请输入手机号',
        region: '请输入验证',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style>
.jpg {
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.text {
  font-size: 14px;
}
.primary {
  width: 100%;
  margin-top: 20px;
}
.left {
  width: 72%;
  margin-right: 15px;
}
.item {
  padding: 18px 0;
}
.box-card {
  width: 450px;
  height: 330px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
img {
  display: block;
  width: 200px;
  height: 50px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 20px;
}
</style>
