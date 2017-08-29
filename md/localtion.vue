<template>
    <div class="container">
        <div id="content">
        	<div class="addlocal" v-if="isok">
        		<input type="text" placeholder="收货人姓名" class="name" value=""/>
        		<input type="text" placeholder="手机号" class="phone"/>
        		<input type="text" placeholder="邮编(选填)" class="msg"/>
        		<input type="text" placeholder="详细地址" class="smallpoint"/>
        		<div class="addbtn">
        			<input type="button" value="保存并返回" class="bcback" @click="bcback"/>
        			<input type="button" value="返回" class="back" @click="back"/>
        		</div>
        		<p>请填写完整信息</p>
        	</div>
        	<!--<div class="addlocal" v-if="IsOk">
        		<input type="text" placeholder="收货人姓名" class="name" :value='changelocal.name'/>
        		<input type="text" placeholder="手机号" class="phone" :value='changelocal.phone'/>
        		<input type="text" placeholder="邮编(选填)" class="msg" :value='changelocal.msg'/>
        		<input type="text" placeholder="详细地址" class="smallpoint" :value='changelocal.smallpoint'/>
        		<div class="addbtn">
        			<input type="button" value="保存并返回" class="bcback" @click="bcback"/>
        			<input type="button" value="删除地址" class="back"/>
        		</div>
        		<p>请填写完整信息</p>
        	</div>-->
        	<ul class="localtop" v-if="ok">
        		<li  class="localtopli" v-for="(item,index) in local">
        			<div>
        				<span>{{item.name}}</span>
        				<span>{{item.phone}}</span>
        			</div>
        			<p>{{item.smallpoint}}</p>
        			<b class="iconfont" @click="change(index)">&#xe65f;</b>
        		</li>
        	</ul>
	        <div class="localbtm" @click="addlocal">
	        	<span class="iconfont">&#xe65e;新增地址</span>
	        </div>
        </div>
    </div>
</template>
<script>
    import './../scss/localtion.scss';
    import MyAjax from './MyAjax.js';
    export default {
        data(){
            return{
				ok:false,
				isok:false,
				IsOk:false,
				local:[],
				changelocal:[]
            }
        },
        methods:{
        	addlocal(){
        		if(this.isok==false){
        			this.isok=true
        		}else{
        			this.isok=false
        		}
        	},
        	bcback(){
        		var reg=/^1[34578]\d{9}$/
        		var name=$('.name').val()
        		var phone=$('.phone').val()
        		var smallpoint=$('.smallpoint').val()
        		var msg=$('.msg').val()
        		var obj={
    				name:name,
    				phone:phone,
    				smallpoint:smallpoint,
    				msg:msg
    			}
        		var localtion=localStorage.getItem('local')
        		if(name!='' && (reg.test(phone))!=false && smallpoint!='' && msg!=''){				
        			this.isok=false
        			if( localtion != null){
			              var oldlocaltion=JSON.parse(localtion)
			              oldlocaltion.push(obj)
			              var oldlocaltionstr=JSON.stringify(oldlocaltion);
			              localStorage.setItem('local',oldlocaltionstr)
			        }else{
			          var oldlocaltion=[]
			          oldlocaltion.push(obj)
			          var oldlocaltionstr=JSON.stringify(oldlocaltion)
			          localStorage.setItem('local',oldlocaltionstr)
			        }
        		}else{
        			setTimeout(function(){
        				$('.addlocal p').css('display','block')
        			},200)
        			setTimeout(function(){
        				$('.addlocal p').css('display','none')
        			},1200)
        		}
        		var that=this
        		setTimeout(function(){
        			var localtion=JSON.parse(localStorage.getItem('local'))
		        	that.local=localtion
		        	if(localtion!=null){
		        		that.ok=true
		        	}else{
		        		that.ok=false
		        	}
        		},100)
        	},
        	istext(nwe,old){
		    	for(var i=0;i<old.length;i++){
		          	if(nwe.msg==old[i].msg){
		            	return old[i]
		          	}
		    	}
		        return false;
		  	},
        	back(){
        		this.isok=false
        	},
        	change(index){
        		if(this.isok==false){
        			this.isok=true
        		}else{
        			this.isok=false
        		}
        		if(this.IsOk==false){
        			this.IsOk=true
        		}else{
        			this.IsOk=false
        		}
        		var local=JSON.parse(localStorage.getItem('local'))
        		this.changelocal=local[index]
        		
        	}
        },
        mounted(){
        	var localtion=JSON.parse(localStorage.getItem('local'))
        	this.local=localtion
        	if(localtion!=null){
        		this.ok=true
        	}else{
        		this.ok=false
        	}
        }
    }
</script>