<template>
    <div class='starList'>
        <div>
            <i v-for='(item,index) in classList' :class='item' class='iconfont'   :key='index'></i>  
        </div>
    </div>
</template>
<script>
const len=5;
export default {
    data(){
        return{
           
           // len:5
        }
    },
    props:['score'],
    created(){
       
    },
    mounted(){
    
    },
    methods:{
        
    },
    computed:{
        classList(){
            const score = Math.floor(this.score * 2) / 2;
            const hasDecimal = score % 1 !== 0;
            const integer = Math.floor(score);
            let result=[];
            for(var i=0;i<integer;i++){
                result.push('icon-star1');
            }
            if(hasDecimal){
                result.push('icon-32');
            }
            while(len>result.length){
                result.push('icon-star2');
            }
            return result;
        }
    }
}
</script>
<style lang="scss">
    .starList{
        i{
             padding:0 10px;
        }
        .icon-star2{
            font-size:20px;
            color:#93999f;
        }
        .icon-star1,.icon-32{
            font-size:20px;
            color:#f19915;
        }
        
    }
</style>
