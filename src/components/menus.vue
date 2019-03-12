<template>
  <!-- 左侧的菜单组件 -->
  <section class="menu-container">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="menu-list"
      :default-active="$route.path"
      :router="true"
    >
      <el-menu-item index="hello" class="home-item">
        <i class="el-icon-menu"></i>首页
      </el-menu-item>

      <el-submenu v-for="(s1,s1Index) of menus" :key="s1.id" :index="String(s1Index)">
        <template slot="title">{{s1.name}}</template>
        <el-menu-item v-for="s2 of s1.children" :key="s2.id" :index="s2.path?s2.path:''">{{s2.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </section>
  <!-- /左侧的菜单组件 -->
</template>

<style>
</style>

<script>
import menuStorage from "../utils/storages/menuStorage";
export default {
  name: "Menus",
  data() {
    return {
      menus: []
    };
  },
  created() {
    let menus = menuStorage.get();
    this.menus = this.toTree(menus);
  },
  methods: {
    // 将平级的数组转换为层级数组
    toTree(data, format) {
      // 删除 所有 children,以防止多次调用
      data.forEach(function(item) {
        delete item.children;
      });

      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {};
      data.forEach(function(item) {
        map[item.id] = item;
      });

      var val = [];
      data.forEach(function(item) {
        if (format != null) {
          format(item);
        }
        // 以当前遍历项，的parentId,去map对象中找到索引的id
        var parent = map[item.parentId];

        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
          val.push(item);
        }
      });
      return val;
    }
  }
};
</script>
