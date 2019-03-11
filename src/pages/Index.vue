<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <section class="menus">
          <Menus></Menus>
        </section>
      </el-col>
      <el-col :span="20">
        <section class="top-status-bar">
          <TopStatusBar :username="userName" @logout="logout"></TopStatusBar>
        </section>
        <section class="content">
          <!-- 所有属于Index子路由的页面都会在下面的router-view中渲染 -->
          <template v-if="$route.meta.keepAlive">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </template>
          <template v-else>
            <router-view></router-view>
          </template>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.menus {
  height: 100vh;
  overflow-x: hidden;
  background-color: #545c64;
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
      // 清除用户浏览器凭证
      userStorage.removeToken();
      userStorage.removeUser();
      menuStorage.remove();

      this.$message({
        message: "您已安全退出"
      });
      // 调用服务器的退出登录接口，忽略错误
      try {
        await this.$ajax({
          url: apis.logout,
          type: "POST",
          showErr: false
        });
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        this.redirectToLogin();
      }, 1500);
    },
    redirectToLogin() {
      this.$router.push({ name: "login" });
    }
  },
  created() {
    this.userName = userStorage.getUser().userName;
  },
  data() {
    return {
      userName: ""
    };
  }
};
</script>
