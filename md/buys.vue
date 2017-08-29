<template>
    <div class="container">
        <div id="content">
        	<router-link to='/home' class='buysgohome'>首页</router-link>
        	<div class="localtop" v-if="isok">
        		<li  class="localtopli" v-for="item in local">
        			<div>
        				<span>{{item.name}}</span>
        				<span>{{item.phone}}</span>
        			</div>
        			<p>{{item.smallpoint}}</p>
        		</li>
        	</div>
        	<div class="buytop">
        		<li>本地精选</li>
        		<li v-for="item in list" class="buylit">
        			<div class="bttop">
        				<span>{{item.name}}</span>
        				<span>{{item.price/100}}元X{{item.num}}</span>
        			</div>
        			<div class="btbtm">
        				类型:{{item.spec}}
        			</div>
        		</li>
        	</div>
        	<li class="buyslictn">
        		<b class="iconfont blcl">&#xe640;</b>
        		礼券
        		<b class="iconfont blcr">&#xe662;</b>
        	</li>
        	<li class="buyslibtn">
        		商品金额
        		<span>{{money/100}}元</span>
        	</li>
        	<div class="buybtm">
        		<div class="buybtmlt">合计:{{money/100}}元</div>
        		<div class="buybtmrt" @click="buy">去支付</div>
        	</div>
        	<div class="buyctnBox" v-if="show">
        		<div class="buyctnbox" v-if="ok">
        			<div>支付订单<b @click="quxiao">x</b></div>
        			<div>￥{{money/100}}</div>
        			<div @click.stop="zfb">
        				<b class="iconfont let">&#xe695;</b>
        				<span>支付宝支付</span>
        				<b class="iconfont rit">&#xe610;</b>
        			</div>
        		</div>
        		<div class="buyctnboxt" v-if="!ok">
        			<img src="../images/zfb.jpg" alt="" />
        		</div>
        	</div>
        	<div class="local">
        		请添加购物地址
        	</div>
        </div>            
    </div>
</template>
<script>
	import Vue from 'vue';
	import MyAjax from './MyAjax.js';
	import './../scss/buys.scss';
	import { Popup } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	
	
    export default {
        data(){
            return{
				list:[],
				money:0,
				show:false,
				ok:true,
				local:[],
				isok:false,
				name:'北京'
            }
        },
        methods:{
        	buy(){
        		var localtion=localStorage.getItem('local')
        		if(localtion==null){
        			setTimeout(function(){
        				$('.local').css('display','block')
        			},200)
        			setTimeout(function(){
        				$('.local').css('display','none')
        			},1200)
        		}else{
        			if(this.show==false){
	        			this.show=true
	        		}else{
	        			this.show=false
	        		}
        		}
        	},
        	quxiao(){
        		if(this.show==true){
        			this.show=false
        		}
        	},
        	zfb(){
        		if(this.ok==false){
        			this.show=true
        		}else{
        			this.ok=false
        		}
        	}
        },
        mounted(){
        	var obj=JSON.parse(localStorage.getItem('goodsnum'))
        	this.list=obj
        	for(var i in obj){
        		this.money+=obj[i].price*obj[i].num
        	}
        	var localtion=localStorage.getItem('local')
        	this.local=JSON.parse(localStorage.getItem('local'))
        	if(localtion!=null){
        		this.isok=true
        	}else{
        		this.isok=false
        	}
        	/*if(localStorage.getItem('name')){
            	this.name=localStorage.getItem('name');
            }
            var login=localStorage.getItem('login')
            if(login!=null){
            	$('.headerrt .login').html('&#xe635')
            }*/
        }
    }
</script>