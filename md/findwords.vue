<template>
        <div class="container">
            <header class="header">
	        	<div class='headerlt'><router-link to='/home'>首页</router-link></div>
	            <div class='headerctn'>
	                <span>ENJOY</span>
	                <a href="javascript:;" class='iconfont'>{{this.name}}</a>
	            </div>            
	            <div class='headerrt'>
	                <span class='iconfont login'>登录</span>
	                <span class='iconfont'>&#xe67f;</span>
	            </div>
	        </header>
            <div id="content">
                <div class="fdtop">
                	<p :index='0' @click="choose($event)" class="p">本地服务</p>
                	<p :index='1' @click="choose($event)">全国送</p>
                </div>
            	<div class="fdbox"  v-for="(item,index) in list" :product_id='item.product_id' @click="xq(index)">
                	<img :src='item.product_image' alt="" />
                	<div class="fdblt">
                		<p>{{item.name}}</p>
                		<p>
	                		<span>{{item.price/100}}元</span>
	                		<span>/{{item.show_entity_name}}</span>
	                		<span>￥{{item.original_price/100}}</span>
                		</p>
                	</div>
                </div>
            </div>        
        </div>
</template>
<script>
	import MyAjax from './MyAjax.js';
	import './../scss/findwords.scss';
	
    export default {
        data(){
            return{
				name:'北京',
				id:140,
				list:[]
            }
        },
        methods:{
        	choose(ev){
        		var that=this
        		var index=ev.target.getAttribute('index')
           		$('.fdtop p').eq(index).addClass('p').siblings().removeClass('p')
           		if(index==0){
           			that.id=that.$route.query.cityid
		            var keywords=that.$route.query.keywords
		            var url='https://api.ricebook.com/3/enjoy_product/search.json?city_id='+that.id+'&keyword='+keywords+'&page=0'
		           	MyAjax.fetch(url,function(data){
		                that.list=data.products
		                console.log(that.list)
		            },function(err){
		                console.log(err)
		            })
           		}else if(index==1){
           			var keywords=that.$route.query.keywords
           			var url='https://api.ricebook.com/3/enjoy_product/search.json?city_id=1&keyword='+keywords+'&page=0'
           			MyAjax.fetch(url,function(data){
		                that.list=data.products
		            },function(err){
		                console.log(err)
		            })
           		}
           },
           xq(index){
        		console.log($('.fdbox').eq(index).attr('product_id'))
        		this.$router.push({ name: 'detail', params: { product_id: $('.fdbox').eq(index).attr('product_id') }})
        	},
        },
        mounted(){
        	var that=this;
            if(localStorage.getItem('name')){
            	that.name=localStorage.getItem('name');
            }
            that.id=that.$route.query.cityid
            var keywords=that.$route.query.keywords
            var url='https://api.ricebook.com/3/enjoy_product/search.json?city_id='+that.id+'&keyword='+keywords+'&page=0'
	           	MyAjax.fetch(url,function(data){
	                that.list=data.products
	                console.log(that.list)
	            },function(err){
	                console.log(err)
	            })
	           	var login=localStorage.getItem('login')
	            if(login!=null){
	            	$('.headerrt .login').html('&#xe635')
	            }
        }
    }
</script>