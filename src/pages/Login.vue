<template>
  <div class="container">
    <transition name="ani-fade" mode="in-out">
      <section class="form-wrapper" v-if="isShowForm">
        <div class="welcome-title">
          <p>CMS后台管理系统</p>
        </div>
        <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="userName">
            <el-input type="text" v-model="loginForm.userName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item class="submit-section">
            <el-button type="primary" @click="submitForm('loginForm')" class="btn-login">登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<style>
.container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #324057;
  position: relative;
}

.form-wrapper {
  width: 320px;
  height: 376px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -188px;
  margin-left: -160px;
}
.login-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}
.welcome-title {
  background-color: transparent;
  color: #fff;
  padding-bottom: 20px;
  font-size: 30px;
  text-align: center;
  margin: 10px 2px;
}
.btn-login {
  width: 100%;
  border-radius: 4px;
}
</style>

<script>
import apis from "../server/apis";
import storage from "../utils/storage";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      isShowForm: false
    };
  },
  mounted: function() {
    this.isShowForm = true;
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$ajax({
            url: apis.login,
            type: "POST",
            params: this.loginForm
          });
          if (res) {
            alert(res);
            storage.set("token", res.token);
            storage.set("refresh_token", res.refreshToken);
            // todo: 获取菜单、获取当前登录用户的权限和身份等
            this.$router.push({ name: "Hello" });
          } else {
            this.$message({
              type: "error",
              message: "登录错误"
            });
          }
        }
      });
      this.$message({
        message: "hello"
      });
    }
  }
};
</script>



