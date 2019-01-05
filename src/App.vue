<template>
  <div id="app">
    <v-header></v-header>
    <div class=tab>
        <div class='tab-item'>
          <router-link to="/goods">
            商品
          </router-link>
        </div>
        <div class='tab-item'>
          <router-link to="/comments">
            评价
          </router-link>
        </div>
        <div class='tab-item'>
          <router-link to="/shops">
            商家
          </router-link>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang='scss'>
body{
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
}
.tab{
  width:100%;
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height:40px;
  border-bottom:1px solid #ccc;
  .tab-item{
    flex:1;
    text-align: center;
    a{
      display: block;
      text-decoration: none;
      font-size:14px;
      color:rgb(77,85,93);
    }
  }

}
.activetab{
  color:rgb(240,20,20)!important;
}
</style>
<script>
  import head1 from './components/head.vue'
  export default {
    data(){
      return{
        apiUrl: 'http://192.168.1.184:8080/data.json',
        gridData:[]
      }
    },
    components:{
      'v-header':head1
    }
    
  }
</script>