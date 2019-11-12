<template>
  <div>
    <div class="jpg"></div>
    <el-card class="box-card">
      <img class="login-img" src="../../assets/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="form" status-icon :model="form" :rules="LoginRules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" class="left" placeholder="请输入验证码"></el-input>
          <el-button>立即获取</el-button>
        </el-form-item>
        <el-checkbox :value="true" label="我已阅读并同意用户协议和隐私条款" name="type"></el-checkbox>
        <el-button class="primary" type="primary" @click="submitForm('form')">立即登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    // 自定义验证(手机号)
    const mobile = (rule, value, callback) => {
      // 通过校验逻辑判断成功失败
      // 手机号格式：1开头 第二位3-9 9个数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      form: {
        mobile: '15232025517',
        code: '246810'
      },
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: mobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码格式有误', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // console.log('登录成功')
          // this.$http
          //   .post('authorizations', this.form)
          //   .then(res => {
          //     local.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })

          // 判断代码有没有出错 如果try中的代码出现了错误就会执行catch中的代码
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.form)
            local.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
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
.login-img {
  display: block;
  width: 200px;
  height: 50px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 20px;
}
</style>
