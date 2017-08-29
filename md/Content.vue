<template>
    <div class="container">
        <header class="header">
            <div class='headerlt' @click='back'>首页</div>
            <div class='headerctn'>
                <span>ENJOY</span>
                <a href="javascript:;" class='iconfont'>{{this.name}}</a>
            </div>            
            <div class='headerrt'>
                <span class='iconfont login' ref='login'>登录</span>
                <span class='iconfont'>&#xe67f;</span>
            </div>
        </header>
        <div id="content">
            <div class="cntbx" v-for='item in list'>
                <h2 class='contenttitle'>{{item.name}}</h2>
                <div class="contentbox">
                    <a href="javascript:;" v-for='list in item.sub_category_list' :city_id='list.city_id' :ids='list.id' @click="liebiao($event)">{{list.name}}</a>
                </div>
            </div>
        </div>         
    </div>
</template>

<script>
    import MyAjax from './MyAjax.js';
    import  './../scss/content.scss';
export default {
    data:function(){
        return{
            list:[],
            name:'北京',
            id:'104'
        }
    },
    methods:{
        back(){
        window.history.go(-1)
        },
        liebiao(ev){
        	var cityid=ev.target.getAttribute('city_id')
        	var id=ev.target.getAttribute('ids')
        	this.$router.push({path:'liebiao',query:{cityid:cityid,id:id}})
        }
    },
    mounted(){
            var that=this;
            if(localStorage.getItem('name')){
            	that.name=localStorage.getItem('name');
            	that.id=localStorage.getItem('id');
            }
            var url='https://api.ricebook.com/hub/home/v1/virtual/category.json?city_id='+that.id+'&is_new_local=true'
            MyAjax.fetch(url,function(data){
                console.log(data)
                that.list=data
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
