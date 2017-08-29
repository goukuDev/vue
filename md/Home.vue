<template>
    <div class="container">
        <header class="header">
            <div class='headerlt'><router-link to='/content' ref='kind'>分类</router-link></div>
            <div class='headerctn' @click='change'>
                <span>ENJOY</span>
                <b class='iconfont'>{{this.name}}&#xe653;</b>
            </div>            
            <div class='headerrt'>
                <span class='iconfont' @click='login' v-if='!islogin'>登录</span>
                <span class='iconfont' v-if="islogin" @click="hdmsg">&#xe635;</span>
                <span class='iconfont' @click='findwords'>&#xe67f;</span>
                <div class="hdmsg" v-if="msg">
                	<p class="hdp">我的订单</p>
                	<p class="hdp">我的礼券</p>
                	<p class="hdp" @click="outlogin">登出</p>
                </div>
            </div>
        </header>
		<div id="content" @scroll="scrolltop" ref='scroll'>
			<a href="javascript:;" class='gotop' v-if="top" @click="gotop">顶部</a>
            <div class="findbox" v-if="isOk">
                <input ref='input' type="text" class="findint" placeholder="搜索本地精选 / 快递到家"/>
                <button @click="golist">搜索</button>
            </div>
            <div class="didian" v-if="OK">
            	<h2>本地服务开通城市</h2>
            	<span v-for="item in citys" :cityid='item.city_id' @click='choose($event)' :name='item.city'>{{item.city}}</span>
            </div>
			<div class="ctbx" v-for="item in list">
				<h2>{{item.group_section.title}}</h2>
				<p class="homept">{{item.group_section.desc}}</p>
				<div class="goods" v-for="goods in item.tabs">
					<!--<router-link :to="{name:'detail',params:{ID:goods.enjoy_url}}" ><img :src='goods.url' alt=""/></router-link>-->
					<img :src='goods.url' alt="" @click='detail($event)' :gs='goods.enjoy_url'/>
					<p>{{goods.title}}</p>
					<span>{{goods.desc}}</span>
				</div>
			</div>
		</div>
        <footer class="footer">
			<v-footer></v-footer>
		</footer>
    </div>
</template>
<script>
    import Footer from './Footer.vue';
    import './../scss/home.scss';
    import MyAjax from './MyAjax.js';
    export default {
        data(){
            return{
                list:[],
                num:0,
                OK:false,
                citys:[],
                name:'北京',
                id:'140',
                isOk:false,
                islogin:false,
                msg:false,
                top:false,
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
        	//回到顶部
        	gotop(){
        		this.$refs.scroll.scrollTop=0
        	},
        	//下拉加载更多
            scrolltop(){
            	var Num=this.num
            	var top=this.$refs.scroll.scrollTop
            	if(top>=5000){
            		Num++
            		var that=this;
		            var url='https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=260&page='+Num
		            that.num=Num
		            MyAjax.fetch(url,function(data){
		            	console.log(data)
		                that.list=that.list.concat(data)
		            },function(err){
		                console.log(err)
		            })
            	}
            	if(top>3000){
            		this.top=true
            	}else{
            		this.top=false
            	}
            },
            change(){
            	if(this.OK==false){
            		this.OK=true,
            		$('.headerlt').html('分类')
            	}else{
            		this.OK=false,
            		$('.headerlt').html("<a href='#/content'>分类</a>")
            	}
            },
            choose(ev){
            	var that=this
            	localStorage.setItem('id',ev.target.getAttribute('cityid'))
            	that.id=localStorage.getItem('id')
            	localStorage.setItem('name',ev.target.getAttribute('name'))
            	that.name=localStorage.getItem('name')
				that.change()
	            var url='https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id='+this.id+'&page=0'
	            MyAjax.fetch(url,function(data){
	                console.log(data)
	                that.list=data
	            },function(err){
	                console.log(err)
	            })
            },
            findwords(){
            	if(this.isOk==false){
            		this.isOk=true
            	}else{
            		this.isOk=false
            	}
           },
           login(){
           		this.$router.push({path:'login'})
           },
           golist(){
           		var that=this
           		if(localStorage.getItem('id')){
	            	that.id=localStorage.getItem('id');
	            }
	           	var keywords=that.$refs.input.value
	           if(keywords){
	           		that.$router.push({path:'findwords',query:{cityid:that.id,keywords:keywords}})
	           }
           },
           hdmsg(){
           		var that=this
           		if(that.msg==false){
            		that.msg=true
            	}else{
            		that.msg=false
            	}
           },
           outlogin(){
           		localStorage.removeItem('login')
           		var that=this
           		if(that.msg==false){
            		that.msg=true
            	}else{
            		that.msg=false
            	}
           }
        },
        mounted(){
            var that=this;
            if(localStorage.getItem('name')){
            	that.name=localStorage.getItem('name');
            	that.id=localStorage.getItem('id');
            }
            
            var url='https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id='+that.id+'&page=0'
            MyAjax.fetch(url,function(data){
                that.list=data
            },function(err){
                console.log(err)
            })
            var url='json/add.json'
            MyAjax.fetch(url,function(data){
                that.citys=data.citys
            },function(err){
                console.log(err)
            })
        },
        updated(){
        	var that=this
        	var obj=localStorage.getItem('login')
            if(obj==null){
            	that.islogin=false
            }else{
            	that.islogin=true
            }
        },
        components:{
            'v-footer':Footer,
        }
    }
</script>