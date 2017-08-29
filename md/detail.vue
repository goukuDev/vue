<template>
    <div class="container">
        <header class="header">
        	<div class='headerlt'><router-link to='/home'>首页</router-link></div>
            <div class='headerctn'>
                <span>ENJOY</span>
                <a href="javascript:;" class='iconfont'>{{this.name}}</a>
            </div>            
            <div class='headerrt'>
                <span class='iconfont login' v-if='!islogin'>登录</span>
                <span class='iconfont' v-if="islogin">&#xe635;</span>
                <span class='iconfont'>&#xe67f;</span>
            </div>
        </header>
		<div id="content">
			<div class="swiper-container detailswiper">
		        <div class="swiper-wrapper">
		            <div class="swiper-slide detalislide" v-for="item in imglist">
		            	<img :src="item.img_url" alt="" />
		            </div>
		        </div>
		        <div class="swiper-pagination"></div>
		    </div>
		    <div class="detitles">
		    	<div class="title">{{list.name}}-{{list.spec}}<b class="iconfont">&#xe64c;</b></div>
		    	<p class="detpc">{{list.description}}</p>
		    	<p class="detpb">
			    	<span><b>{{list.price/100}}</b>元/</span>
			    	<span>2位</span>
			    	<span v-show="list.origin_price?true:false">￥<b>{{list.origin_price/100}}</b></span>|
			    	<span>随时退</span>
		    	</p>
		    </div>
		    <!--商户信息-->
		    <div class="demsg" v-for="item in msg" v-if="dmsg">
		    	<h2>商户信息</h2>
		    	<li>{{item.restaurant_name}}</li>
		    	<li><b class="iconfont">&#xe657;</b>{{item.restaurant_address}}</li>
		    	<li v-for="items in item.restaurant_phone_numbers"><b class="iconfont">&#xe697;</b>{{items}}</li>
		    </div>
		    <!--MENU-->
		    <div class="menu" v-if="dmsg">
		    	<h2>MENU</h2>
		    	<div class="menubox" v-for="item in menu">
		    		<p>-<span>{{item.sub_title}}</span>-</p>
		    		<p v-for="items in item.text">{{items}}</p>
		    	</div>
		    </div>
		    <!--亮点-->
		    <div class="light">
		    	<h2>亮点</h2>
		    	<div class="lightbox" v-for="item in light">
		    		<img :src='item.img_url' alt="" />
		    		<p>{{item.title}}</p>
		    		<p>{{item.content}}</p>
		    	</div>
		    </div>
		    <!--使用提示-->
		    <div class="tolist">
		    	<h2>使用提示</h2>
		    	<ul>
		    		<li v-for="item in tolist">{{item.text}}</li>
		    	</ul>
		    </div>
		    <div class="detailtbox">
            	<h2>猜你喜欢</h2>
            	<div class="detailboxct">
            		<div key='index' v-for="(item,index) in lists" >
                			<img :src="item.product_image_url" alt=""  :to="item.enjoy_url" />
                			<p>{{item.product_name}}</p>
                			<p>
         				<span>{{item.price/100}}元/{{item.show_entity_name}}</span>
                			</p>
                	</div>
            	</div>
            </div>
		</div>
         <footer class="defooter">
         	<div class="detop">
         		<p>已选择:<span>{{list.spec}}</span>({{num}}份)</p>
         		<p @click="tips" class="tips"><span>切换商品</span><b class="iconfont">&#xe659;</b></p>
         		<div class="detopctn" v-if="detopcn">
         			<b class="iconfont">&#xe800;</b>
         			<div class="detoprit">
         				<p>{{list.spec}}</p>
         				<p>
         					<span>{{list.price/100}}元/</span>
					    	<span>2位</span>
					    	<span>￥{{list.origin_price/100}}</span>
         				</p>
         			</div>
         		</div>
         		<div class="detopbtm" v-show="detopcn">
         			选择数量
         			<span @click="plus">+</span>
         			<span class="detopbtmnum">{{num}}</span>
         			<span @click="down">-</span>
         		</div>
         	</div>
         	<div class="debtm">
         		<div class="queding" v-if="isok" @click="queding">确定</div>
         		<div class="deflt iconfont" @click="carting">&#xe651;</div>
		    	<div class="defcn" @click="cart">加入购物车</div>
		    	<div class="defrt">立刻购买</div>
         	</div>
		</footer>
    </div>
</template>
<script>
    import Footer from './Footer.vue';
    import MyAjax from './MyAjax.js';
	import './../scss/detail.scss';
	
	
    
    export default {
        data(){
            return{
                imglist:[],
                list:[],
                lists:[],
                msg:[],
                msgs:[],
                light:[],
                menu:[],
                tolist:[],
                name:'北京',
                ok:true,
                islogin:false,
                isok:false,
                detopcn:false,
                num:1,
                dmsg:false,
            }
        },
        methods:{
            tips(){
            	var that=this
            	if(that.ok==true){
            		$('.tips span').html('关闭')
            		$('.tips b').html('&#xe65c;')
            		that.ok=false
            		$('.detop').animate({'top':'-170px','height':'170px'},800,'swing')
            	}else{
            		$('.tips span').html('切换商品')
            		$('.tips b').html('&#xe659;')
            		that.ok=true
            		$('.detop').animate({'top':'-40px','height':'40px'},400,'linear')
            	}
            	if(that.isok==false){
            		that.isok=true
            	}else{
					that.isok=false            		
            	}
            	if(that.detopcn==false){
            		that.detopcn=true
            	}else{
            		that.detopcn=false
            	}
            },
            carting(){
            	var login=localStorage.getItem('login')
            	if(login==null){
            		this.$router.replace({path:'/login'})
            	}else{
            		this.$router.push({path:'/cart'})
            	}
            },
            cart(){
            	var login=localStorage.getItem('login')
            	if(login==null){
            		this.$router.replace({path:'/login'})
            	}else{
            		console.log($('.detopbtm .detopbtmnum').html())
			    var that=this
			    var goods=localStorage.getItem('goodsnum')
			    console.log(goods)
			    var login=localStorage.getItem('login')
			    var img=that.imglist[0].img_url
			    var name=that.list.name
			    var specname=that.list.spec_name
			    var price=that.list.price
			    var nums=that.num
			    var id=that.list.product_id
			    var spec=that.list.spec
			    var obj={
			      num:nums,
			      price:price,
			      specname:specname,
			      name:name,
			      img:img,
			      id:id,
			      spec:spec
			    }
			    if(login==null){
				      that.$router.push({path:'login'})
				    }else{
				        if( goods != null){
				              var oldgood=JSON.parse(goods)
				              var isfleg=that.istext(obj,oldgood)
				              if(isfleg){
				                isfleg.num++
				              }else{
				                obj.num=1
				                oldgood.push(obj)
				              }
				              var oldgoodstr=JSON.stringify(oldgood);
				              localStorage.setItem('goodsnum',oldgoodstr)
				        }else{
				          var goodsnum=[]
				          obj.num=1
				          goodsnum.push(obj)
				          var goodsnumstr=JSON.stringify(goodsnum)
				          localStorage.setItem('goodsnum',goodsnumstr)
				        }
			    	}
			  	}
            	},
		  	istext(nwe,old){
		    	for(var i=0;i<old.length;i++){
		          	if(nwe.id==old[i].id){
		            	return old[i]
		          	}
		    	}
		        return false;
		  	},
		  	
            plus(){
            	var num=this.num
            	num++
            	this.num=num
            },
            down(){
            	var num=this.num
            	if(num==1){
            		this.num=1
            	}else{
            		num--
            		this.num=num
            	}
            },
            queding(){
            	this.tips()
            },
            /*detail(ev){
            	var ids=ev.target.getAttribute('to')
            	var pid=ids.split('?')[1]
            	this.$router.replace('/detail')
            	var url='https://api.ricebook.com/product/info/product_detail.json?product_'+pid
            	MyAjax.fetch(url,function(data){
            		console.log(data)
            		console.log(url)
            		window.location.reload()
            	})
            }*/
        },
        mounted(){
        	if(this.$route.query.id.length<=10){
        		var productid=this.$route.query.id
        		console.log(productid)
        	}else{
        		var ids=this.$route.query.id
        		console.log(ids)
        	}
            var that=this;
            if(ids){
            	var pid=ids.split('?')[1].split('-').join('_')
            	var url='https://api.ricebook.com/product/info/product_detail.json?product_'+pid
            }else{
            	var url='https://api.ricebook.com/product/info/product_detail.json?product_id='+productid
            }
            MyAjax.fetch(url,function(data){
            	if(data.modules.length<5){
            		that.dmsg=false
            		that.list=data.basic
					that.imglist=data.basic.product_images
					for(var i in data.modules){
						that.msgs=data.modules[0].data.menu_attributes
						that.light=data.modules[1].data.lights
						that.tolist=data.modules[2].data.contents
						that.lists=data.modules[3].data.recommend
					}
            	}else if(data.modules.length==5){
            		that.dmsg=true
            		console.log(data.modules)
            		that.list=data.basic
					that.imglist=data.basic.product_images
					for(var i in data.modules){
						that.msg=data.modules[0].data.restaurants
						that.menu=data.modules[1].data.contents
						that.light=data.modules[2].data.lights
						that.tolist=data.modules[3].data.contents
						that.lists=data.modules[4].data.recommend
					}
            	}else if(data.modules.length==6){
            		that.dmsg=true
            		console.log(data.modules)
            		that.list=data.basic
					that.imglist=data.basic.product_images
					for(var i in data.modules){
						that.msg=data.modules[1].data.restaurants
						that.menu=data.modules[2].data.contents
						that.light=data.modules[3].data.lights
						that.tolist=data.modules[4].data.contents
						that.lists=data.modules[5].data.recommend
					}
            	}
            },function(err){
                console.log(err)
            })
            if(localStorage.getItem('name')){
            	that.name=localStorage.getItem('name');
            }
            var login=localStorage.getItem('login')
            if(login!=null){
            	$('.headerrt .login').html('&#xe635')
            }
        },
        updated(){
        	var swiper = new Swiper('.detailswiper', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        autoplayDisableOnInteraction:false,
		        autoplay:2000,
		        loop:true,
		        observer:true,
    			observeParents:true
		    });
		    var that=this
        	var obj=localStorage.getItem('login')
            if(obj==null){
            	that.islogin=false
            }else{
            	that.islogin=true
            }
        }
    }
</script>



