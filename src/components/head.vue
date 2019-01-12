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
                <div v-if='shopInfo.supports'>
                    <img src="../image/decrease_1@2x.png" alt="">
                    <span v-html='shopInfo.supports[0].description'></span>
                </div>
               <p class='more' @click='showMore()' v-if='shopInfo.supports'>{{shopInfo.supports.length}}个<i class='iconfont icon-jiantouyou' style='font-size:12px;'></i></p>
            </div>
        </div>
        <div @click='showMore()'>
            <div class='info' >
                <span class='info_name'>公告</span>
                <span class='info_content' v-html='shopInfo.bulletin'></span>
                <span class='info_more'><i class='iconfont icon-jiantouyou' style='font-size:12px;'></i></span>
            </div>
        </div>
        <div class='details' v-show='detailShow' >
            <div id="wrap">
                <div id="main" class="clearfix">
                    <div id="content">
                        <div class='head'>
                            <span v-html='shopInfo.name'></span>
                        </div>
                        <div class='img'>
                            <star :score='shopInfo.score'></star>
                        </div>
                        <div class='name'>
                            <div class='line'></div>
                            <div class='title'>优惠信息</div>
                            <div class='line'></div>
                        </div>
                        <!-- <div class='youhuiInfo'>
                            <ul>
                                <li v-for='item in shopInfo.supports'>{{item.decoration}}</li>

                            </ul>
                        </div> -->
                    </div>
                </div>
            </div>
            <div id="footer">
                <i class='iconfont icon-guanbi1' @click='detailShow=!detailShow'></i>
            </div>
        </div>
        
    </div>
</template>
<script>
import Vue from 'vue'
import { Navbar, TabItem } from 'mint-ui';  //导航栏
import { TabContainer, TabContainerItem } from 'mint-ui';//Item
import { Cell } from 'mint-ui';
import star from './star.vue'
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Cell.name, Cell);
export default {
  name: 'name',
  data () {
    return {
      apiUrl: 'http://192.168.1.184:8080/data.json',
    //   商家信息
      shopInfo:{},
      goodInfo:{},
      detailShow:false,
    }
  },
  methods:{
    showMore : function () {   
        var me=this;
        me.detailShow=true;
    },
   
  },
  created(){
      const ERR_OK = 0;
    //   获取商家信息
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
            let data = response.data;
            this.shopInfo=data;
        }
        console.log(response.data);
      }),
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
            let data1 = response.data;
            this.goodInfo=data1;
           
        }
         console.log(response.data);
      })
  },
  components:{
      star
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
       div{
            width:70%;
            height:16.5px;
            line-height: 16.5px;
            display: flex;
            align-items: center;
       }
       img{
           width:15px;
           height:15px;
       }
       span{
           color:#fff;
           font-size:12px;
           margin-top:1%;
       }
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
       a{
            text-decoration: none;
            color:#505a63;
        }
        a:hover{
            color:#ff4a4f;
        }
   }
   .details{
       position:fixed;
       top:0;
       left:0;
       width:100%;
       height:100%;
       overflow-y: auto;
       background: rgba(7,17,27,0.8);
       z-index:100;
       #wrap {
        height: auto;
        min-height: 100%;
        }  
        #main {
            padding-bottom: 80px;
            width:100%;
            #content{
                padding:30px;
                .head{
                    margin-top:30px;
                    width:100%;
                    color:#fff;
                    text-align: center;
                    span{
                        font-size:16px;
                        line-height: 16px;
                        font-weight: 700;
                    }
                }
                .img{
                    text-align:center;
                    margin-top:5%;
                    img{
                        margin:0 5px;

                    }
                }
            }
        }
        #footer {
            position: relative;
            margin-top: -100px;
            height:100px;
            clear: both;
            text-align: center;
            font-size:50px;
            line-height:100px;
            color:#fff;
        }
    
   }
   .name{
       width:100%;
       margin-top:10%;
       display: flex;
       justify-content: space-between;
       align-items: center;
       .line{
           width:35%;
           height:1px;
           background:rgba(255,255,255,.2);
         
       }
       .title{
           font-size:15px;
           font-weight:bold;
           padding:0 2px;
           color:#fff;
       }
   }
    
    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
        
    .clearfix {
        display: inline-block;
    }
</style>

