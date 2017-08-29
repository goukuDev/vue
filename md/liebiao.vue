<template>
        <div class="container">
            <header class="header">
	            <div class='headerlt' @click='back'>首页</div>
	            <div class='headerctn'>
	                <span>ENJOY</span>
	                <a href="javascript:;" class='iconfont'>{{this.name}}</a>
	            </div>            
	            <div class='headerrt'>
	                <span class='iconfont login'>登录</span>
	                <span class='iconfont'>&#xe67f;</span>
	            </div>
	        </header>
            <div id="content" @scroll="scrolltop" ref='scroll'>
            	<a href="javascript:;" class='gotop' v-if="top" @click="gotop">顶部</a>
                <div class="liebiaotop">
                	<span>全部</span>
                	<span @click="sort" class="lbspan"><a>智能排序</a><b class="iconfont">&#xe653;</b></span>
                </div>
                <div class="paixu" v-show="ok">
                	<li v-for="(item,index) in paixu" @click="pointsort(index,$event)" :pid='item.sort_id'>{{item.sort_name}}</li>
                </div>
                <div class="liebiaobox"  v-for="(item,index) in lists">
                	<img :src='item.product_image' alt="" :product_id='item.product_id' @click="detail($event)"/>
                	<div class="fdblt">
                		<p>{{item.name}}</p>
                		<p>
	                		<span>{{item.price/100}}元</span>
	                		<span>/{{item.show_entity_name}}</span>
	                		<span v-show="item.original_price?true:false">￥{{item.original_price/100}}</span>
                		</p>
                		<p>{{item.area}}</p>
                	</div>
                </div>
            </div>          
        </div>
</template>
<script>
	import MyAjax from './MyAjax.js';
	import './../scss/liebiao.scss'
	
	
    export default {
        data(){
            return{
				name:'北京',
				lists:[],
				num:0,
				paixu:[],
				ok:false,
				isOk:false,
				top:false,
            }
        },
        methods:{
        	back(){
        		this.$router.go(-2)
        	},
        	detail(ev){
        		console.log(ev.target.getAttribute('product_id'))
        		this.$router.push({
        			path:'detail',
        			query:{
        				id:ev.target.getAttribute('product_id')
        			}
        		})
        	},
        	//回到顶部
        	gotop(){
        		this.$refs.scroll.scrollTop=0
        	},
        	scrolltop(){
            	var top=this.$refs.scroll.scrollTop
            	var Num=this.num
            	var that=this;
            	if(top>=1500){
            		console.log(top)
            		Num++
		            if(localStorage.getItem('name')){
		            	that.name=localStorage.getItem('name');
		            }
		            var cityid=that.$route.query.cityid
		            var id=(that.$route.query.id)*1+1
		            var url='https://api.ricebook.com/4/tab/category_product_list.json?category_id='+id+'&sort=1&from_id=0&city_id='+cityid+'&page='+Num
		            that.num=Num
		        	MyAjax.fetch(url,function(data){
						that.lists=that.lists.concat(data)
		            },function(err){
		                console.log(err)
		            })
            	}
            	if(top>2000){
            		this.top=true
            	}else{
            		this.top=false
            	}
            },
            sort(){
            	if(this.ok==false){
            		this.ok=true
            	}else{
            		this.ok=false
            	}
            },
            pointsort(index,ev){
            	$('.liebiaotop .lbspan a').html(ev.target.innerHTML)
            	$('.paixu li').eq(index).addClass('li').siblings().removeClass('li')
            	if(this.ok==false){
            		this.ok=true
            	}else{
            		this.ok=false
            	}
            	var that=this
            	var sort=$('.paixu li').eq(index).attr('pid')
            	var cityid=that.$route.query.cityid
	            var id=(that.$route.query.id)*1+1
	            var url='https://api.ricebook.com/4/tab/category_product_list.json?category_id='+id+'&sort='+sort+'&from_id=0&city_id='+cityid+'&page=0'
	        	MyAjax.fetch(url,function(data){
	                that.lists=data
	            },function(err){
	                console.log(err)
	            })
           }
        },
        mounted(){
        	var that=this;
            if(localStorage.getItem('name')){
            	that.name=localStorage.getItem('name');
            }
            var cityid=that.$route.query.cityid
            var id=(that.$route.query.id)*1+1
            var url='https://api.ricebook.com/4/tab/category_product_list.json?category_id='+id+'&sort=1&from_id=0&city_id='+cityid+'&page=0'
        	MyAjax.fetch(url,function(data){
                that.lists=data
            },function(err){
                console.log(err)
            })
        	
        	var url='https://api.ricebook.com/4/tab/sub_category.json?category_id=8&city_id=260&from_id=0'
        	MyAjax.fetch(url,function(data){
                that.paixu=data.sort
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