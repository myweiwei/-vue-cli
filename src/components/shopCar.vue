<template>
    <div>
        <div class='shopcar'>
            <div class='content' >
                <div class='content-left-wrapper' @click="fold">
                    <div class='logo-wrapper'>
                        <div class='logo'>
                            <div class='logo-inner' :class='totlaPrice==0?"logo-active":""'><i class='iconfont icon-shop_car'></i></div>
                            <div class="num" v-if='totlaCount'>{{totlaCount}}</div>
                        </div>
                        <div class='price' :class='totlaPrice?"price-active":""'>￥<span>{{totlaPrice}}</span></div>
                        <span class='line'></span>
                        <div class='desc'>另需配送费￥<span>{{deliveryPrice}}</span>元</div>
                    </div>
                </div>
                <div class='content-right-wrapper' :class='payDesc=="去结算"?"content-right-wrapper-active":""' @click.stop.prevent='pay'>
                    <h3>{{payDesc}}</h3>
                </div>
            </div>
            <transition name='foldgood'>
                <div class='goodContainer' v-show='listshow'>
                    <div class='banner'>
                        <span>购物车</span>
                        <span class='clear' @click='clear'>清空</span>
                    </div>
                    <div class='list' ref='listContainer'>
                        <ul>
                            <li v-for='food in selectFood'>
                                <div>{{food.name}}</div>
                                <div>
                                    <span class='price'><strong>￥</strong>{{food.count*food.price}}</span>
                                    <div class='cart-wrapper' style='float:right'>
                                        <cartControl :food='food'></cartControl>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </transition>
            <div class='ball-container' >
                <div v-for="ball in balls">
                    <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                        <div class="ball" v-show="ball.show">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <!-- <div class='wrapper'></div> -->
        </div>
        <transition name='fade'>
            <div class='wrapper' v-show='listshow' @click="hide">
            </div>
        </transition>
        
    </div>
</template>
<script>
import cartControl from '../components/cartControl.vue';
import BScroll from 'better-scroll';
export default {
    data(){
        return {
            balls:[
                {show:false},
                {show:false},
                {show:false},
                {show:false},
                {show:false}
            ],
            dropBalls:[],
            listshow:false,
        }
    },
    props :{
        deliveryPrice:{
            type:Number,
            default:0
        },
        minPrice:{
            type:Number,
            default:0
        },
        selectFood:{
            type:Array,
            default(){
                return [
                    
                ];
            }
        },
        
    },
    created(){
        var me=this;
        
    },
    computed:{
        totlaPrice(){
            var me=this;
            let total=0;
            me.selectFood.forEach((food)=>{
                total+=food.price*food.count;
            });
            return total;
        },
        totlaCount(){
            var me=this;
            let count=0;
            me.selectFood.forEach((food)=>{
                count+=food.count;
            });
            return count;
        },
        payDesc(){
            var me=this;
            if(me.totlaPrice==0){
                return `${me.minPrice}元起送`;
            }
            else if(me.totlaPrice>=me.minPrice){
                return `去结算`
            }
            else{
                return `还差${me.minPrice-me.totlaPrice}元起送`;
            }
        },
    },
    methods:{
        dropFunc(el){
            for(var i=0;i<this.balls.length;i++){
                if(!this.balls[i].show){
                    this.balls[i].show=true;
                    this.balls[i].el=el;
                }
                this.dropBalls.push(this.balls[i]);
                return ;
            }
        },
        beforeEnter(el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 30);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        enter(el, done) {
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done);
            });
        },
        afterEnter(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        },
        clear(){
            var me=this;
            me.selectFood.forEach((food) => {
                food.count = 0;
            });
            me.listshow=false;
        },
        fold(){
            var me=this;
            me.listshow=!me.listshow;
            if(this.totlaPrice<=0){
                me.listshow=false;
                return ;
            }
            if(me.listshow){
                me.$nextTick(()=>{
                    if(!me.scroll){
                        me.scroll=new BScroll(me.$refs.listContainer,{
                            click:true
                        });
                    }
                    else{
                        me.scroll.refresh();
                    }
                })
                
            }
            
        },
        hide(){
            var me=this;
            me.listshow=false;
        },
        pay(){
            var me=this;
            if(me.totlaPrice<me.minPrice){
                return ;
            }
            window.alert(`需支付${me.totlaPrice}元`);
        }
    },
    components:{
        cartControl
    },
}
</script>
<style lang="scss" scoped>
    .shopcar{
        position:fixed;
        bottom:0;
        width:100%;
        z-index:50;
        .content{
            background: #141d27;
            height: 46px;
            display: flex;
            line-height: 46px;
            .content-left-wrapper{
                flex:1;
                .logo-wrapper{
                    position:relative;
                    .logo{
                        width:60px;
                        height:60px;
                        border-radius: 50%;
                        background: #141d27;
                        position:absolute;
                        top:-15px;
                        left:10px;
                        .logo-inner{
                            width:45px;
                            height:45px;
                            border-radius: 50%;
                            background: #00a0dc;
                            position:absolute;
                            top:50%;
                            left:50%;
                            transform: translate(-50%,-50%);
                            text-align: center;
                            line-height: 45px;
                            i{
                                font-size:25px;
                                color:#fff;
                            }
                        }
                        .logo-active{
                            background: #2b333b;
                            i{
                                color:#929698;
                            }
                        }
                        .num{
                            width:24px;
                            height:16px;
                            border-radius:10px 10px 10px 10px;
                            background: rgb(240,20,20);
                            position:absolute;
                            top:0;
                            left:35px;
                            color:#fff;
                            line-height:16px;
                            text-align: center;
                            box-shadow: 0px 4px 8px rgba(0,0,0,.4);
                            font-size:12px;

                        }
                    }
                    .price{
                        color:#8d9193;
                        font-size:20px;
                        position:absolute;
                        left:30%;
                    }
                    .price-active{
                        color:#fff;
                    }
                    .desc{
                        position:absolute;
                        right:5%;
                        font-size:12px;
                        color:#919396;
                        width:40%;
                    }
                    .line{
                        width:1px;
                        height:30px;
                        margin:0 10px;
                        left:47%;
                        color:#2b333b;
                        background: #2b333b;
                        position:absolute;
                        margin-top:8px;
                    }
                }
            }
            .content-right-wrapper{
                width:110px;
                text-align: center;
                background: #2b333b;
                h3{
                    font-size:15px;
                    font-family: "微软雅黑";
                    color:#979a9c;
                    letter-spacing:0px;
                }
            }
            .content-right-wrapper-active{
                background: #00b43c;
                h3{
                    color:#fff;
                }
            }
        }
        .ball-container{
            .ball{
                position:fixed;
                left:32px;
                bottom:22px;
                z-index:200;
                transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
                .inner{
                    width:16px;
                    height:16px;
                    border-radius: 50%;
                    background: rgb(0,160,220);
                    transition: all 0.4s linear;
                }
                
            }
        }
         //从初始状态变化到最终状态
        .foldgood-enter-active, .foldgood-leave-active {
            transition: all .5s;
            // transform: translate3d(0,0,0);
        }
        // 看不见时的初始状态
        .foldgood-enter, .foldgood-leave-active {
            transform: translate3d(0,100%,0);
        }
        .goodContainer{
            width:100%;
            position: absolute;
            bottom:45px;
            background: #FFF;
            z-index: -1;
            .banner{
                display: flex;
                justify-content: space-between;
                height:40px;
                line-height: 40px;
                background: #f3f5f7;
                font-size:14px;
                padding:0 18px;
                border-bottom:1px solid rgba(7,17,27,0.1);
                .clear{
                    color:rgb(0,160,220);
                }
            }
            .list{
                max-height: 217px;
                overflow-y: hidden;
                li{
                    height:48px;
                    line-height: 48px;
                    font-size:14px;
                    color:rgb(7,17,27);
                    border-bottom:1px solid rgba(7,17,27,0.1);
                    padding:0 18px;
                    display: flex;
                    justify-content: space-between;
                    .price{
                        color:rgb(240,20,20);
                        font-size:17px;
                        font-weight:normal;
                        margin-right:14px;
                        strong{
                            font-size:15px;
                        }
                    }
                }
            }
        }
    }
    .wrapper{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 40;
        backdrop-filter: blur(10px);
        opacity: 1;
        background: rgba(7, 17, 27, 0.6);
        .fade-enter-active, .fade-leave-active{
            transition: all 0.5s;
        }
        .fade-enter, .fade-leave-active{
            opacity: 0;
            background: rgba(7, 17, 27, 0);
        }
      
    }
</style>

