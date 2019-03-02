<template>
<div>
    <div class='good'>
        <div class='menu-wrapper' ref='menuWrapper'>
            <ul>
                <li v-for='(item,index) in goodInfo' @click='selectMenu(index)' :key='index' class='menu_list' :class="currentIndex==index?'current':'index'"><span v-if='item.type>0'><img :src='"../image/img"+item["type"]+".png"' alt=""></span>{{item.name}}</li>
            </ul>
        </div>
        <div class='good-wrapper' ref='goodWrapper'>
            <!--  -->
            <ul class='good-list'>
                <li v-for='(item,index) in goodInfo' :key='index' class='goodli goodli-list-hook'>
                    <span class='foodTitle'>{{item.name}}</span>
                    <ul class='foodList'>
                        <li v-for='(food,index) in item.foods' :key='index' style='display:flex;'>
                            <div><img :src="food.image" alt=""></div>
                            <div class='foodInfo'>
                                <span v-html='food.name' class='foodName'></span>
                                <p v-html='food.description' class='foodDescription'></p>
                                <span class='foodSellCount'>月售{{food.sellCount}}份</span><span class='foodRating'>好评率{{food.rating}}%</span>
                                <br>
                                <div class='price-cart'>
                                    <div class='foodPrice'><span>￥{{food.price}}</span><del v-if='food.oldPrice' class='foodOldPrice'>￥{{food.oldPrice}}</del></div>
                                    <div class='cartControl-wrapper'>
                                        <cartControl :food='food' @cart-add="cartAdd"></cartControl>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <shopCar :selectFood='selectFood' :deliveryPrice='sellerInfo.deliveryPrice' :minPrice='sellerInfo.minPrice' ref='shop'></shopCar>
</div>


</template>
<script>
 import BScroll from 'better-scroll';
 import shopCar from '../components/shopCar.vue'
 import cartControl from '../components/cartControl.vue'
export default {
    data(){
        return{
            apiUrl: 'http://192.168.1.184:8080/data.json',
            goodInfo:[],
            food:[],
            heightList:[],
            scrollY:0,
            currentIndex:0,
            sellerInfo:[],
        }
    },
    created(){
        const ERR_OK = 0;
        this.$http.get('/api/goods').then((response) => {
            response = response.body;
            if (response.errno === ERR_OK) {
                let data = response.data;
                this.goodInfo=data;
                this.$nextTick(()=>{
                    this._initScroll();
                    this._calculateHeight();
                })
            }
        });
        this.$http.get('/api/seller').then((response) => {
            response = response.body;
            if (response.errno === ERR_OK) {
                let data = response.data;
                this.sellerInfo=data;
            }
        })
    },
    methods:{
        _initScroll(){
            var me=this;
            me.menuScroll = new BScroll(me.$refs.menuWrapper, {click:true});
            me.goodScroll = new BScroll(me.$refs.goodWrapper, {probeType:3,click:true});
            me.goodScroll.on('scroll',function(pos){
                me.scrollY=Math.abs(Math.round(pos.y));
            })
        },
        _calculateHeight(){
            let height=0;
            this.heightList.push(height);
            let goods=this.$refs.goodWrapper.getElementsByClassName('goodli-list-hook');
            for(var i=0;i<goods.length;i++){
                height+=goods[i].clientHeight;
                this.heightList.push(height);
            }
        },
        selectMenu(index){
            var me=this;
            let goods=this.$refs.goodWrapper.getElementsByClassName('goodli-list-hook');
            let el=goods[index];
            me.goodScroll.scrollToElement(el,300);
        },
        cartAdd(el){
            this.$nextTick(() => {
                //this.$refs.shopCar.dropFunc(el);
               this.$refs.shop.dropFunc(el);
            });
        },
        
    },
    
    computed:{
        selectFood(){
            var me=this;
            let foods=[];
            me.goodInfo.forEach((goods)=>{
                goods.foods.forEach((food)=>{
                    if(food.count){
                        foods.push(food);
                    }
                })
            })
            return foods;
        }
    },
    components:{
        shopCar,
        cartControl
    },
    watch:{
        'scrollY': {
            handler: function (newVal, oldval) {
                for (let i = 0; i < this.heightList.length; i++) {
                    let height1 = this.heightList[i];
                    let height2 = this.heightList[i + 1];
                    if (!height2 || (newVal >= height1 && newVal < height2)) {
                       this.currentIndex=i;
                       return ;
                    }
                }
                 this.currentIndex=0;
            },
            deep: true
        },
    }
}
</script>
<style lang="scss" scoped>
    .good{
        position: absolute;
        top:180px;
        width:100%;
        bottom:46px;
        box-sizing: border-box;
        display: flex;
        .price-cart{
            // border:1px solid red;
            width:100%;
            position: relative;
            padding: 10px 0;
            .cartControl-wrapper{
                position: absolute;
                right:0;
                color:red!important;
                display: inline-block;
            }
            .foodPrice{
                font-weight:700;
                color:#ee1413;
                font-size:14px;
                display: inline-block;
            }
        }
        .menu-wrapper{
            flex: 0 0 80px;
            width:80px;
            background: #f3f5f7;
            overflow:hidden;
            .menu_list{
                font-size:14px;
                line-height:20px;
                width:56px;
                padding:10px 12px;
                text-align: left;
                border-bottom:1px solid rgba(7,17,27,.1);
                img{
                    width:17px;
                    height:17px;
                    vertical-align: top;
                    margin-top:4%;
                }
            }
        }
        .good-wrapper{
            flex:1;
            overflow:hidden;
            .goodsImg{
                
            }
            .good-list{
                .foodList{
                    padding:0 10px;
                    li{
                        padding:10px 0;
                        border-bottom:1px solid rgba(7,17,27,.1);
                    }
                    li:last-child{
                        border:none;
                    }
                    .foodInfo{
                        margin-left:10px;
                        width:100%;
                    }
                    img{
                        width:60px;
                        height:60px;
                    }
                }
                .foodTitle{
                    display: inline-block;
                    font-size:12px;
                    line-height:28px;
                    color:#8b8e93;
                    background: #f3f5f7;
                    width:100%;
                    border-left:2px solid #d9dde1;
                    padding-left:10px;
                }
                .foodName{
                    font-size:14px;
                    font-weight:700;
                    line-height:20px;
                    color:#00070e;
                }
                .foodDescription,.foodSellCount,.foodRating{
                    font-size:12px;
                    line-height:20px;
                    color:#989ba0;
                }
                .foodRating{
                    margin-left:2%;
                }
                .foodOldPrice{
                    font-weight:700;
                    font-size:12px;
                    color:rgb(147,153,159);
                    margin-left:2%;
                }
            }
        }
        .current{
            background:#fff;
            color:#000;
        }
    }
</style>
