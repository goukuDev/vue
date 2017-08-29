<template>
        <div class="container">
            <div id="content">
            	<router-link to='/home' class='cartgohome'>首页</router-link>
            	<div class="nullcart">
            		<img src="https://s1.ricebook.com/feck/web-cart/37cea7f9c3bd1d34c0eca258281ff871.png" alt="" />
            		<p>购物车是空车哦~</p>
            	</div>
            	<div class="box">
            		<div class="carttop" v-for="(item,index) in list">
	            		<b class="iconfont blt">&#xe800;</b>
	            		<img :src='item.img' alt="" />
	            		<div class="carttoplet">
	            			<p>{{item.name}}</p>
	            			<p>类型:{{item.specname}}</p>
	            			<p>单价:{{item.price/100}}元</p>
	            			<p>
	            				<span @click="plus(index)">+</span>
			         			<span>{{item.num}}</span>
			         			<span @click="down(index)">-</span>
	            				<b class="iconfont" @click="deletedata(index)">&#xe67d;</b>
	            			</p>
	            		</div>
	            	</div>
            	</div>            	
                <div class="cartbox">
                	<h2>猜你喜欢</h2>
	                	<div class="cartboxct">
		                		<div v-for="(item,index) in lists">
		                			<img :src="item.product_image" alt="" @click='detail($event)' :gs='item.enjoy_url'/>
		                			<p>{{item.name}}</p>
		                			<p>
		                				<span>{{item.price/100}}元/{{item.show_entity_name}}</span>
		                				<span v-show="item.original_price?true:false">￥{{item.original_price/100}}</span>
		                			</p>
		                		</div>
		                	<!--</router-link>-->
	                	</div>
                </div>
                <div class="cartbtm">
                	<div class="left"><b class="iconfont">&#xe800;</b>全选</div>
                	<div class="ctn">合计:<span>{{money/100}}</span>元</div>
                	<div class="rith"><router-link :to="{name:'buys'}">去结算</router-link></div>
                </div>
            </div>          
        </div>
</template>
<script>
	import './../scss/cart.scss';
	import MyAjax from './MyAjax.js';
	
    export default {
        data(){
            return{
				list:[],
				lists:[],
				ok:true,
				money:0,
            }
        },
        methods:{
        	detail(ev){
        		console.log(ev.target.getAttribute('gs'))
        		this.$router.push({
        			path:'detail',
        			query:{
        				id:ev.target.getAttribute('gs')
        			}
        		})
        	},
        	plus(index){
        		var obj=JSON.parse(localStorage.getItem('goodsnum'))
            	obj[index].num++;
            	this.list=obj
            	localStorage.setItem("goodsnum",JSON.stringify(obj))
            	var arr=JSON.parse(localStorage.getItem("goodsnum"))
            	console.log(arr)
            	this.money=0;
            	for(let i=0;i<arr.length;i++){
            		this.money+=arr[i].price*arr[i].num
            	}
            },
            down(index){
            	var obj=JSON.parse(localStorage.getItem('goodsnum'))
            	obj[index].num--;
            	this.list=obj
            	localStorage.setItem("goodsnum",JSON.stringify(obj))
            	var arr=JSON.parse(localStorage.getItem("goodsnum"))
            	console.log(arr[index])
            	this.money=0;
            	for(let i=0;i<arr.length;i++){
            		this.money+=arr[i].price*arr[i].num
            	}
            	if(arr[index].num==0){
            		arr.splice(index,1)
					this.list=arr
					localStorage.setItem('goodsnum',JSON.stringify(arr))
            	}
            	var arrgoods=JSON.parse(localStorage.getItem('goodsnum'))
            	if(arrgoods.length==0){
            		localStorage.removeItem('goodsnum')
					$('.nullcart').css('display','block')
					$('.cartbtm').css('display','none')
            	}
            },
            deletedata(index){
			    var goodnum=localStorage.getItem('goodsnum')
			    var arrgood=JSON.parse(goodnum)
				arrgood.splice(index,1)
				this.list=arrgood
				localStorage.setItem('goodsnum',JSON.stringify(arrgood))
            	if(arrgood.length!=0){
            		var arr=JSON.parse(localStorage.getItem("goodsnum"))
	            	this.money=0;
	            	for(let i=0;i<arr.length;i++){
	            		this.money+=arr[i].price*arr[i].num
	            	}
            	}else{
            		localStorage.removeItem('goodsnum')
					$('.nullcart').css('display','block')
					$('.cartbtm').css('display','none')
            	}
			}
        },
        mounted(){
        	var obj=JSON.parse(localStorage.getItem('goodsnum'))
        	if(obj==null){
        		$('.carttop').css('display','none')
        		$('.nullcart').css('display','block')
        		$('.cartbtm').css('display','none')
        	}else{
        		$('.carttop').css('display','block')
        		$('.nullcart').css('display','none')
        		$('.cartbtm').css('display','block')
        		this.list=obj
        		console.log(this.list)
        		for(var i=0;i<obj.length;i++){
					this.money+=obj[i].price*obj[i].num
				}
        	}
        	var that=this
        	var url='https://api.ricebook.com/3/enjoy_product/cart_recommend_product.json?city_id=383'
        	MyAjax.fetch(url,function(data){
				that.lists=data.content
            },function(err){
                console.log(err)
            })
        }
    }
</script>