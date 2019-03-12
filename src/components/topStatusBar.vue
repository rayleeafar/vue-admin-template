<template>
  <div class="container">
    <section class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'hello' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in $route.meta.navBar" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <section class="control">
      <span>欢迎您，{{username}}</span>
      <button @click="logout">安全退出</button>
    </section>
  </div>
</template>

<style scoped>
    .container{
        display:flex;
        justify-content: space-between;
    }
    .control >span{
      font-size: 16px;
    }
    .control > button{
      border: 0;
      outline: 0;
      transition: color .3s;
      cursor: pointer;
      font-size: 16px;
    }
    .control > button:hover{
      color: gray;
    }
</style>
<script>
export default {
  name: "TopStatusBar",
  methods: {
    logout() {
      this.$emit("logout", this);
    }
  },
  props: ["username"]
};
</script>
