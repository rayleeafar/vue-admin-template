<template>
<!-- 登录页 -->
  <div class="container">
    <transition name="ani-fade" mode="in-out">
      <section class="form-wrapper" v-if="isShowForm">
        <div class="welcome-title">
          <p>Orange Grain</p>
        </div>
        <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="2FA密码" @keyup.enter.native="submitForm('loginForm')"></el-input>
          </el-form-item>
          <el-form-item class="submit-section">
            <el-button
              type="primary"
              :loading="btnLoading"
              @click="submitForm('loginForm')"
              @keyup.enter.native="submitForm('loginForm')"
              class="btn-login"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
<!-- /登录页 -->
</template>

<style scoped>
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
import userStorage from "../utils/storages/userStorage";
import menuStorage from "../utils/storages/menuStorage";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      isShowForm: false,
      btnLoading: false
    };
  },
  async created() {
    let token = userStorage.getToken();
    if (token) {
      try {
        let isValidToken = (await this.$ajax({
          url: apis.checkToken,
          type: "POST",
          showErr: false
        })).data;
        if (isValidToken) {
          console.log("您已经登录，即将跳转到首页");
          this.redirectToHome();
        }
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        userStorage.removeToken();
        userStorage.removeUser();
        menuStorage.remove();
      }, 1200);
    }
  },
  mounted: function() {
    this.isShowForm = true;
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.changeBtnLoadingState();
          try {
            // 登录并设置token
            let token = await this.$ajax({
              url: apis.login,
              type: "POST",
              params: this.loginForm
            });
            // 登录成功后存储用户token和用户信息
            userStorage.setToken(token.access_token);

            userStorage.setUser({ username: this.loginForm.username });

            // 获取菜单
            let menus = await this.$ajax({
              url: apis.menuManage.list,
              type: "GET"
            });
            // 存储菜单
            if (menus.data.length > 0) {
              menuStorage.set(menus.data);
            }

            // 提示登录成功并在1s后跳转
            this.$message({
              message: "登录成功",
              center: true
            });

            setTimeout(() => {
              this.redirectToHome();
            }, 1000);
          } catch (err) {
            console.log(err);
          } finally {
            this.changeBtnLoadingState();
          }
        }
      });
    },
    // 改变登录按钮的loading状态
    changeBtnLoadingState() {
      this.btnLoading = !this.btnLoading;
    },
    redirectToHome() {
      this.$router.push({ name: "hello" });
    }
  }
};
</script>



