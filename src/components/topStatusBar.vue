<template>
    <div class="container">
        <section class="bread">
        </section>
        <section class="control">
            <span>欢迎您，{{username}}</span>
            <button @click="logout">安全退出</button>
        </section>
    </div>
</template>

<script>
export default {
    name:'TopStatusBar',
    methods:{
        logout(){
            this.$emit('logout',this);
        }
    },
    props:['username']
}
</script>
