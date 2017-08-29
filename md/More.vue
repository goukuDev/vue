<template>
    <div class="container">
        <div id="content">
            <img src="https://image.ricebook.com/business/18870146923449?imageView2/2/w/750/h/246" class="moreimg"/>
            <div class="morectn">
            	<p>邀请好友加入ENJOY，给TA发放价值50元礼券。好友完成首单消费后，你亦可获得价值50元礼券。</p>
            	<input type="button" value="即刻邀请"/>
            	<div>已成功邀请<span>0</span>位好友<span>|</span>获得<span>0</span>元礼券</div>
            </div>
            <div class="morebtm"></div>
            <div class="mbottom">
            	<div class="mbtop">
            		<span>1</span>
            		<span>5</span>
            		<span>10</span>
            		<span>25</span>
            		<span>50</span>
            	</div>
            </div>
            <div class="mbbtm">
            	<div>5人<span>额外奖励</span><span>100元</span></div>
            	<div>10人<span>额外奖励</span><span>100元</span></div>
            	<div>15人<span>额外奖励</span><span>750元</span></div>
            	<div>50人<span>额外奖励</span><span>2000元</span></div>
            	<p><span>奖励说明</span></p>
            </div>
        </div>   
        <footer class="footer">
			<v-footer></v-footer>
		</footer>         
    </div>
</template>
<script>
    import Footer from './Footer.vue';
    import MyAjax from './MyAjax.js';
    import './../scss/more.scss';
    
    export default {
        data(){
            return{
            	list:[],
            }
        },
        components:{
            'v-footer':Footer,
        },
        mounted(){
        	var that=this;
            if(localStorage.getItem('name')){
            	that.name=localStorage.getItem('name');
            }
            var obj=localStorage.getItem('login')
            if(obj==null){
            	this.$router.push({path:'login'})
            }
        }
    }
</script>