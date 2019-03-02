<template>
    <div class='shopcar'>
        <div class='content'>
            <div class='content-left-wrapper'>
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
            <div class='content-right-wrapper' :class='payDesc=="去结算"?"content-right-wrapper-active":""'>
                <h3>{{payDesc}}</h3>
            </div>
        </div>
        <div class='ball-container' >
           
                <div v-for='(item,index) in balls' :key='index' v-show='item.show'  class='ball'  @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                    <div class='inner inner-hook' ></div>
                </div>
            
        </div>
    </div>
</template>
<script>
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
        console.log(me.selectFood);
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
                    let rect = ball.el.getBoundingClientRect(); //获取元素的位置
                    let x = rect.left - 32; //小球掉落X轴起点
                    let y = -(window.innerHeight - rect.top - 22); //小球掉落Y轴起点,向下为负
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0, ${y}px,0)`; /* Safari 和 Chrome */
                    el.style.transform = `translate3d(0, ${y}px,0)`; //旋转div元素
                    // 处理内层动画
                    let inner = el.getElementsByClassName("inner-hook")[0];
                    inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        enter(el, done) {
           //关闭ESlint语法监测，因为ES6语言规范会让被申明却未被调用的变量报错
            /* eslint-disable no-unused-vars */
            let rf = el.offestHeight; //申明rf是为了触发浏览器的重排
            this.$nextTick(() => {
                //修改数据之后立即使用这个方法，获取更新后的 DOM。
                el.style.webkitTransform = 'translate3d(0, 0, 0)'; /* Safari 和 Chrome */
                el.style.transform = 'translate3d(0, 0, 0)'; //旋转div元素
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0, 0, 0)';
                inner.style.transform = 'translate3d(0, 0, 0)';
                el.addEventListener('transitionend', done)   //Vue为了知道过渡的完成，否则无法进入到afterEnter中  
            });
        },
        afterEnter(el) {
            let ball = this.dropBalls.shift(); //把数组的第一个元素从其中删除，并返回第一个元素的值。
            if (ball) {
                ball.show = false;
                el.style.display = 'none'; //隐藏小球
            }
        }
    }}

</script>
<style lang="scss" scoped>
    .shopcar{
        position:fixed;
        bottom:0;
        width:100%;
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
                .drop-transition{
                    transition: all 0.4s;
                }
                .inner{
                    width:16px;
                    height:16px;
                    border-radius: 50%;
                    background: rgb(0,160,220);
                    transition: all 0.4s;
                }
                
            }
        }
        drop{

        }
        
        

    }
</style>

