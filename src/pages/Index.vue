<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <section class="menu">
          <Menus></Menus>
        </section>
      </el-col>
      <el-col :span="20">
        <section class="top-status-bar">
          <TopStatusBar :username="userName" @logout="logout"></TopStatusBar>
        </section>
        <section class="content">
          <!-- 所有属于Index子路由的页面都会在下面的router-view中渲染 -->
          <router-view></router-view>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.menu{
  height: 100vh;
}
.top-status-bar {
  padding: 20px;
}
.content {
  width: 99%;
  padding: 10px;
  overflow: hidden;
  border-top: 1px solid skyblue;
}
</style>


<script>
import Menus from "../components/menus";
import TopStatusBar from "../components/topStatusBar";
import userStorage from "../utils/storages/userStorage";
import menuStorage from "../utils/storages/menuStorage";
import apis from "../server/apis";

export default {
  name: "Index",
  components: { Menus, TopStatusBar },
  methods: {
    async logout() {
      await this.$ajax({
        url: apis.logout,
        type: "POST"
      });
      userStorage.removeToken();
      userStorage.removeUser();
      menuStorage.remove();
      this.$message({
        message: "您已安全退出"
      });
      setTimeout(() => {
        this.redirectToLogin();
      }, 1500);
    },
    redirectToLogin() {
      this.$router.push({ name: "Login" });
    }
  },
  created() {
    this.userName = userStorage.getUser().userName;
  },
  data() {
    return {
      userName: ''
    };
  }
};
</script>

<style>
</style>
