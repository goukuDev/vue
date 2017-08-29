<template>
    <div class="container">
        <div id="usercontent">
            <div class="usertop">
				<img src="https://image.ricebook.com/avatar/1?imageView2/1/w/140/h/140" alt="" />
				<span>{{title}}</span>
            </div>
            <div class="xfm">
            	Code消费码
            	<b class="iconfont">&#xe610;</b>
            </div>
            <div class="myliquan">
            	我的礼券
            	<b class="iconfont">&#xe610;</b>
            </div>
            <div class="dzgl" @click="dizhi">
            	地址管理
            	<b class="iconfont">&#xe610;</b>
            </div>
        </div> 
         <footer class="footer">
			<v-footer></v-footer>
		</footer>           
    </div>
</template>
<script>
    import Footer from './Footer.vue';
    import './../scss/user.scss';
    import MyAjax from './MyAjax.js';
    export default {
        data(){
            return{
				name:'北京',
				title:''
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
            	that.$router.push({path:'login'})
            }else{
            	that.title=JSON.parse(obj).name
            	console.log(that.title)
            }
        },
        methods:{
        	dizhi(){
        		this.$router.push({path:'localtion'})
        	}
        }
    }
</script>