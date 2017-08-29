<template>
    <div class="container">
        <header class="header">
        	<div class='headerlt'><router-link to='/home'>首页</router-link></div>
            <div class='headerctn'>
                <span>ENJOY</span>
                <a href="javascript:;">{{this.name}}</a>
            </div>            
            <div class='headerrt'>
                <span class='iconfont login'>登录</span>
                <span class='iconfont'>&#xe67f;</span>
            </div>
        </header>
		<div id="content">
			<div class="koindtop">
				<h3>{{list1group_section.title}}</h3>
				<p>{{list1group_section.desc}}</p>
				 <div class="swiper-container kindswiper">
			        <div class="swiper-wrapper">
			            <div class="swiper-slide kindslide" v-for="item in list1.tabs">
			            <img :src='item.url' alt="" />
			            <div>{{item.tag}}</div>
			            <div>{{item.title}}</div>
			            <div>{{item.desc}}</div>
			            </div>
			        </div>
			   </div>
			</div>
			<div class="kindctn">
				<div class="swiper-container kcnswiper">
			        <div class="swiper-wrapper">
			            <div class="swiper-slide kcnslide" v-for="item in list2">
			            	<img src="https://image.ricebook.com/business/20373785523424?imageView2/2/w/325" alt="" />
			            	<p>{{item.title}}</p>
			            	<p>{{item.desc}}</p>
			            </div>
			        </div>
			    </div>
			    
			</div>
			<div class="kindbtm">
				<h2>{{list3.title}}<span>{{list3.enjoy_url_text}}</span></h2>
				<p>{{list3.desc}}</p>
				<div class="kindimg">
					<img :src='item.url' alt=""  v-for="item  in list6" @click='detail($event)' :gs='item.enjoy_url'/>
				</div>
			</div>
			<div class="kindbtm">
				<h2>{{list4.title}}<span>{{list4.enjoy_url_text}}</span></h2>
				<p>{{list4.desc}}</p>
				<div class="kindimg">
					<img :src='item.url' alt=""  v-for="item  in list7" @click='detail($event)' :gs='item.enjoy_url'/>
				</div>
			</div>
			<div class="kindbtm">
				<h2>{{list5.title}}<span>{{list5.enjoy_url_text}}</span></h2>
				<p>{{list5.desc}}</p>
				<div class="kindimg">
					<img :src='item.url' alt=""  v-for="item  in list8" @click='detail($event)' :gs='item.enjoy_url'/>
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
    import MyAjax from './MyAjax.js';
    import './../scss/kind.scss';

    export default {
        data(){
            return{
                list1:[],
                list1group_section:[],
                list2:[],
                list3:[],
                list4:[],
                list5:[],
                list6:[],
                list7:[],
                list8:[],
                name:'北京',
                id:'140',
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
        },
        components:{
            'v-footer':Footer,
        },
        mounted(){
            var that=this;
            if(localStorage.getItem('name')){
            	that.name=localStorage.getItem('name');
            	that.id=localStorage.getItem('id');
            }
        var url='https://api.ricebook.com/hub/home/v1/web/explore.json?city_id='+that.id
            MyAjax.fetch(url,function(data){
				that.list1=data[0].data,
				that.length=that.list1.tabs.length
//				console.log(that.list1.tabs.length)
				that.list1group_section=that.list1.group_section
				that.list2=data[1].data.tabs,
				that.list3=data[2].data.group_section
				that.list4=data[3].data.group_section
				that.list5=data[4].data.group_section
				that.list6=data[2].data.tabs
				that.list7=data[3].data.tabs
				that.list8=data[4].data.tabs
            },function(err){
                console.log(err)
            })
            var login=localStorage.getItem('login')
            if(login!=null){
            	$('.headerrt .login').html('&#xe635')
            }
        },
        updated(){
        	var swiper = new Swiper('.kindswiper', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        spaceBetween: 30,
		       	observer:true,
    			observeParents:true
		    });
		    var swiper = new Swiper('.kcnswiper', {
		        slidesPerView:2.2,
		        paginationClickable: true,
		        spaceBetween:10,
		        observer:true,
    			observeParents:true
		    });
        }
    }
</script>



