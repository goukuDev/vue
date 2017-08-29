<template>
  <ul>
    <li><router-link to="/home" class="iconfont">&#xe630;</router-link></li>
    <li><router-link to='/kind' class="iconfont">&#xe68d;</router-link></li>
    <li><router-link to='/more' class="iconfont">&#xe661;</router-link></li>
    <li><router-link to='/user' class="iconfont">&#xe667;</router-link></li>
  </ul>
</template>

<script>
    export default{
      data(){
        return{
          
        }
      }
    }
</script>
<style scoped>
  .router-link-exact-active.router-link-active{
    color:black;
  }
</style>