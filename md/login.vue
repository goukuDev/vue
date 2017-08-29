<template>
        <div class="container">
            <header class="header">
	            <div class='headerlt'><router-link to='/' >首页</router-link></div>
	            <div class='headerctn'>
	                <span>ENJOY</span>
	                <b class='iconfont'>{{this.name}}</b>
	            </div>            
	            <div class='headerrt'>
	                <span class='iconfont login'>登录</span>
	                <span class='iconfont'>&#xe67f;</span>
	            </div>
	        </header>
            <div id="lgcontent">
                <h2 class="logintitle">ENJOY</h2>
                <input type="text" placeholder="输入手机号" class="name"/>
                <input type="password" placeholder="输入密码" class="pwd"/>
                <input type="button" value="确定" class="btn" @click="btn"/>
            </div>    
        </div>
</template>
<script>
	import './../scss/login.scss'
    export default {
        data(){
            return{
				name:'北京'
            }
        },
        methods:{
        	btn(){
        		var reg=/^1[34578]\d{9}$/
        		var name=$('.name').val()
        		var pwd=$('.pwd').val()
        		if((reg.test(name))!=false && pwd !=''){
        			var obj={
        				name:name,
        				password:pwd
        			}
        			var srtobj=JSON.stringify(obj)
        			localStorage.setItem('login',srtobj)
        			$('.name').val('')
        			$('.pwd').val('')
        			this.$router.go(-1)
        		}
        	}
        },
        mounted(){
        	var that=this;
            if(localStorage.getItem('name')){
            	that.name=localStorage.getItem('name');
//          	that.id=localStorage.getItem('id');
            }
            var login=localStorage.getItem('login')
            if(login!=null){
            	$('.headerrt .login').html('&#xe635')
            }
        }
    }
</script>