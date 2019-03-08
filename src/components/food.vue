<template>
<transition name='move'>
    <div class='foodPage' v-show='current' ref='list'>
        <div>
            <div class='img'>
                <img :src="foodPage.image" alt="">
                <div class='icon' @click='hide'>
                    <i class='iconfont icon-guanbi1'></i>
                </div>
                
            </div>
            <div class='info'>
                <span class='name'>{{foodPage.name}}</span>
                <br>
                <div class='count'><span>月售{{foodPage.sellCount}}份</span><span style='margin-left:12px;'>好评率{{foodPage.rating}}%</span></div>
                <div class='price'>
                    <div class='jiage'>￥{{foodPage.price}}<del class='oldPrice'>￥11</del></div>
                    <cartControl :food='food'  v-if='cartShow'></cartControl>
                    <div class='add1' @click='addCar(foodPage,$event)' v-else>加入购物车</div>
                </div>
            </div>
            <div class='space'></div>
            <div class='introduce'>
                <span class='name'>商品介绍</span>
                <br>
                <span class='info'>
                    {{foodPage.info}}
                </span>
            </div>
            <div class='space'></div>
            <div class='comments'>
                <comments></comments>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll';
import comments from '../components/comments.vue';
import cartControl from '../components/cartControl.vue';
import Vue from 'vue';
export default {
    data(){
        return{
            cartShow:false,
            food:{},
            current:this.foodInfoFlag
        }
    },
    props:{
        foodPage:Object,
        foodInfoFlag:Boolean,
    },
    created(){
        
    },
    components:{
        comments,
        cartControl,
    },
    mounted(){
        var me=this;
         this.$nextTick(() => {
            if(!this.scroll){
                this.scroll = new BScroll(this.$refs.list, {
                click:true
            })
            }
            else if(!this.$refs.list){
                return
            }
            else{
                this.scroll.refresh()
            }
        })
    },
    methods:{
        hide:function(){
            var me=this;
            me.current=false;
        },
        addCar:function(arg,event){
            var me=this;
            me.cartShow=true;
            me.food=arg;
            Vue.set(me.food,'count',1);
            //this.$emit('cart-add', event.target);
            console.log(1);
        },
        cartAdd(el){
            this.$nextTick(() => {
               //this.$refs.shop.dropFunc(el);
            });
        },
    }
}
</script>
<style lang="scss">
    //从初始状态变化到最终状态
    .move-enter-active, .move-leave-active {
        transition: all .5s;
        transform: translate3d(0,0,0);
    }
    // 看不见时的初始状态
    .move-enter, .move-leave-active {
        transform: translate3d(100%,0,0);
    }
    .foodPage{
        position:fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        bottom:48px;
        background: #fff;
        z-index:43;
        overflow: hidden;
        .icon{
            position:fixed;
            top:15px;
            right:12px;
            color:#fff;
            width: 22px;
            height:22px;
            border-radius:50%;
            text-align: center;
            line-height:22px;
            background: rgba(0,0,0,0.2);
            .iconfont{
                font-size:10px;
            }
        }
        .space{
            width:100%;
            height:16px;
            background:#f3f5f7;
            border-top:1px solid rgba(7,17,27,0.1);
            border-bottom:1px solid rgba(7,17,27,0.1);
        }
        .img{
            position: relative;
            width:100%;
            padding-top:100%;
            height:0;
            img{
                width:100%;
                height:100%;
                position: absolute;
                top:0;
                left:0;
            }  
        }
        .info{
            padding:18px;
            .name{
                font-size:14px;
                font-weight:700;
                color:rgb(7,17,27);
            }
            .count{
                margin-top:8px;
                font-size:10px;
                color:rgb(147,153,159);
            }
            .price{
                display: flex;
                width:100%;
                overflow: hidden;
                justify-content: space-between;
                margin-top:10px;
                .jiage{
                    font-size:20px;
                    color:rgb(240,20,20);
                    font-weight:700;
                }
                .oldPrice{
                    font-size:10px;
                    color:rgb(147,153,159);
                }
                .add1{
                    width:74px;
                    height:24px;
                    background:#00a0dc!important;
                    color:#fff;
                    border-radius: 20px;
                    font-size:10px;
                    text-align: center;
                    line-height: 24px;
                    float:right;
                }
            }
        }
        .introduce{
            padding:18px;
            .name{
                font-size:14px;
                font-weight:normal;
                color:rgb(7,17,27);
            }
            .info{
                margin-top:12px;
                padding:0 16px;
                font-size: 12px;
                font-weight: 200;
                color:rgb(77,85,93);
                line-height: 24px;
                text-align: left;
                display: inline-block;
            }
        }
    }
</style>
