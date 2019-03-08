# vue-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


#head
 app.vue引入head组建名为v-header

#BetterScroll使用
1.引入
import BScroll from 'better-scroll';
2.生明及调用
<!-- 在下一步执行 ，如果已经声明了scroll,直接调用refresh即可。listContainer为要滚动的模块。设置click:true，使得该模块内其他元素可点击 -->
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

#Vue transition
<transition name='fold'>
    <div class='good-container' v-show='listshow'>
</transition>
//从初始状态变化到最终状态
.fold-enter-active, .fold-leave-active {
    transition: all .5s;
    transform: translate3d(0,0,0);
}
// 看不见时的初始状态
.fold-enter, .fold-leave-active {
    transform: translate3d(0,100%,0);
}