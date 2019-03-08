<template>
    <div class='cartControl'>
        <transition name="fade">
            <span class='btn jianshao' v-if='food.count>0' @click.stop.prevent='desCount()'><i class='iconfont icon-line'></i></span>
        </transition>
        <span class='count' v-if='food.count>0'>{{food.count}}</span>
        <transition name='ball'>
			<div class='ball' v-show='showFlag'></div>
		</transition>
        <span class='btn add' @click.stop.prevent='addCount()'>+</span>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    props:{
        food:{
            type:Object
        }
    },
    data(){
        return {
            showFlag:false
        }
    },
    created(){
    },
    methods:{
        addCount(){
            var me=this;
            if(!me.food.count){
                Vue.set(me.food,'count',1);
                me.food.count=1;
            }
            else{
                me.food.count++;
            }
            this.$emit('cart-add', event.target);
            console.log(event.target);
        },
        desCount(){
            var me=this;
            me.food.count--;
        },
        
    }
}
</script>
<style lang="scss" scoped>
    
        .btn{
            display: inline-block;
            width:16px;
            height:16px;
            border-radius:50%;
            line-height: 16px;
            text-align:center;
            background: #00a0dc;
            border:2px solid #00a0dc;
            color:#fff;
            i{
                font-size:12px;
            }
        }
        .jianshao {
            background: #fff;
            color:#00a0dc;
            transition:all 1s liner;
            transform: translate3d(0px,0px,0);
            .iconfont{
                display: inline-block;
                transition: all 0.4s linear;
                transform: rotate(0deg);
            }
        }
        .fade-enter-active, .fade-leave-active {
            transition: all 0.4s linear;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
            transform: translate3d(30px,0px,0);
            .iconfont{
                transform: rotate(180deg);
            }
        }
        .count{
            color:rgb(147, 153, 159);
        }
        .ball{
		width:15px;
		height: 15px;
		border-radius: 50%;
		background: red;
		position:absolute;
		top:0px;
		left:0px;
		z-index: 100;
		/* transform:translate(65px,127px); */
		
	}
        
   
</style>