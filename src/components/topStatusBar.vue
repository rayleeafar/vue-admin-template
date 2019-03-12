<template>
  <!-- 右侧顶部的面包屑和登录管理组件 -->
  <div class="container">
    <section class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'hello' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in $route.meta.navBar" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <section class="control">
      <span>欢迎您，{{username}}</span>
      <el-button @click="logout">安全退出</el-button>
    </section>
  </div>
  <!-- /右侧顶部的面包屑和登录管理组件 -->
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.control > span {
  font-size: 16px;
}
</style>
<script>
export default {
  name: "TopStatusBar",
  methods: {
    logout() {
      // 如果父组件监听了logout事件，当点击退出登录时，会触发回调
      this.$emit("logout", this);
    }
  },
  // 父组件传入当前登录用户的用户名
  props: ["username"]
};
</script>
