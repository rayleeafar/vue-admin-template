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
            <el-button
              type="primary"
              :loading="btnLoading"
              @click="submitForm('loginForm')"
              class="btn-login"
            >登录</el-button>
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
import tokenService from "../services/tokenService";
import menuService from "../services/menuService";

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
      isShowForm: false,
      btnLoading: false
    };
  },
  async created() {
    let token = tokenService.get();
    if (token) {
        console.log('您已经登录，即将跳转到首页');
        this.redirectToHome();
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
            tokenService.set(token.data);

            // 获取菜单
            let menus = await this.$ajax({
              url: apis.menuManager.list,
              type: "GET"
            });
            if (menus.data.length > 0) {
              menuService.set(menus.data);
            }

            // 提示登录成功并在1s后跳转
            this.$message({
              message: "登录成功"
            });

            window.setTimeout(() => {
              this.redirectToHome();
            }, 1000);
          } catch (err) {
            console.log(err);
            this.$message({
              message: err,
              type: "error"
            });
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
    redirectToHome(){
      this.$router.push({ name: 'Hello' });
    }
  }
};
</script>



