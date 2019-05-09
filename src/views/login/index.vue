<template>
  <div class="login-container" style="width: 50%; margin: 0 auto">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      auto-complete="on"
      label-position="left"
      label-width="0px"
      class="card-box login-form">
      <h3 class="title">登录</h3>
      <el-form-item prop="email">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="email"/>
        </span>
        <el-input
          v-model="loginForm.email"
          name="name"
          type="text"
          auto-complete="on"
          placeholder="邮箱"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter.native="handleLogin"/>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length < 1) {
        callback(new Error('邮箱不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.trim().length < 1) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch((e) => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
