<template>
    <div id='header'>
        <div class='zhedang'></div>
        <img :src="shopInfo.avatar" alt="" class='shopimg'>
        <div id='shopinfo'>
            <div class='shopname'>
                <img src="../image/brand@2x.png" alt="" class='brand'>
                <p v-html='shopInfo.name'></p>
            </div>
            <div>
                <p class='shoppost'>{{shopInfo.description}}/{{shopInfo.deliveryTime}}分钟送达</p>
            </div>
            <div class='youhui'>
                <div>
                    <img src="../image/decrease_1@2x.png" alt="">
                    <span v-html='firsupport'></span>
                </div>
               <p class='more' @click='showMore()'>{{supportsLen}}个&gt;</p>
            </div>
        </div>
        <div class='info' @click='gonggao()'>
            <span class='info_name'>公告</span>
            <span class='info_content' v-html='shopInfo.bulletin'></span>
            <span class='info_more'>&gt;</span>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Navbar, TabItem } from 'mint-ui';  //导航栏
import { TabContainer, TabContainerItem } from 'mint-ui';//Item
import { Cell } from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Cell.name, Cell);
export default {
  name: 'name',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected:'1',
      apiUrl: 'http://192.168.1.184:8080/data.json',
      shopInfo:{},
      supportsLen:0,
      firsupport:'',
      goodInfo:{},
    }
  },
  methods:{
    showMore : function () {   
        
    },
   
  },
  created(){
      const ERR_OK = 0;
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        
        if (response.errno === ERR_OK) {
            let data = response.data;
            this.shopInfo=data;
            this.supportsLen=this.shopInfo.supports.length;
            this.firsupport=this.shopInfo.supports[0].description;
            console.log(this.firsupport);
        }
      }),
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
            let data1 = response.data;
            this.goodInfo=data1;
            console.log(data1);
        }
      })
  }
}
  
</script>
<style scoped lang="scss">
  
   $highlight-color: #F90;
   body{
       margin:0!important;
       background:$highlight-color;
   }
    *{
       padding:0;
       margin:0;
   }
   #header{
       width:100%;
       height:140px;
       position: relative;
       display: flex;
       align-items: top;
       box-sizing:border-box;
       background: url(../image/shopbac.png) 0 0 no-repeat;
       background-size: 100%;
       padding-top:5%;
       padding-left:5%;
   }
   .shopimg{
       width:70px;
       height:70px;
       border-radius: 5px;
       z-index: 2;
   }
   .brand{
       height:18px;
       width: 30px;
   }
   #shopinfo{
       margin-left:10px;
       z-index: 2;
       width:75%;
       font-size:0;
   }
   .shopname{
       font-size: 15px;
       font-weight: bold;
       color:#fff;
       display: flex;
       align-items: center;
       margin-bottom: 3%;
   }
   .shopname p{
       margin-left:3%;
   }
   .shoppost{
       font-size:14px;
       color:#fff;
       margin-bottom: 1%;
       font-family: '微软雅黑';
   }
   .zhedang{
       width:100%;
       height:100%;
       position: absolute;
       top:0;left:0;
       background: rgba(0,0,0,.5);
   }
   .youhui{
       display: flex;
       align-items: center;
       margin-bottom: 3%;
       justify-content: space-between;
       width:100%;
   }
   .youhui div{
       width:70%;
       height:16.5px;
       line-height: 16.5px;
       display: flex;
       align-items: center;
   }
   .youhui img{
       width:15px;
       height:15px;
   }
   .youhui span{
       color:#fff;
       font-size:12px;
       margin-top:1%;
   }
   .more{
       width:45px;
       height:25px;
       border-radius: 20px;
       background:#3e362e;
       display: inline-block;
       color:#fff;
       font-size:12px;
       line-height: 25px;
       text-align: center;
       cursor:pointer;
       float: right;
   }
   .info{
       width:100%;
       height:30px;
       background: rgba(0, 0, 0,.3);
       position: absolute;
       bottom:0;
       left:0;
       line-height: 30px;
       padding:0 10px;
       vertical-align: middle;
   }
   .info_name{
       padding:1px 5px;
       background: #fff;
       color:#000;
       font-size:12px;
       text-align: center;
       line-height: 12px;
       border-radius:2px;
       display: inline-block;
       float: left;
       margin-top:2%;
       margin-right:2%;
   }
   .info_content{
       height:100%;
       text-overflow:ellipsis;
       font-size:12px;
       float: left;
       width:78%;
       color:#fff;
       overflow: hidden;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
   }
   .info_more{
       color:#fff;
       cursor:pointer;
   }
   .mint-tabbar{
       width:100%;
       height:100px;
       margin-top:300px;
   }
   .mint-cell-title{
       display: none!important;
   }
   
   #tab{
       display: flex;
       justify-content:space-around;
       height:35px;
       line-height: 35px;
       border-bottom: 1px solid #e3e4e6;
   }
   #tab a{
       text-decoration: none;
       color:#505a63;
   }
   #tab a:hover{
       color:#ff4a4f;
   }
</style>

