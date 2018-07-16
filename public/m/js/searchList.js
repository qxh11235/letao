$(function(){
	var page = 1 ;
	var pageSize = 6;
	var v;
	render();
	function render(){
		var key=getUrl().key;
		var obj={
			proName:key,
			page:page,
			pageSize:pageSize
		}
		//判断要不要传排序的参数;
		if($('.sort li').hasClass("active")){
			// var key=$(that).data(type);
			var type=$('.sort li').find(".fa").hasClass('fa-angle-down')?2:1;
			obj[v]=type;
		}
		$.ajax({
			url:"/product/queryProduct",
			type:"get",
			data:obj,
			success:function(info){
				console.log( info );
				$('.lt_content .brand').html( template('tpl',info));

			}
		})
	}
	//点击搜索重新渲染页面,
	$('.lt_search button').on("click",function(){
		
		var val = $('.lt_search input').val();
		location.href="searchList.html?key="+val;
		
	})
	//点击升序降序;
	$('.lt_content .sort li[data-type]').on("click",function(){
		//判断有没有active类
		if(	!$(this).hasClass('active')){
			$(this).addClass('active').siblings().removeClass('active');

		}else{
			$(this).find('.fa').toggleClass("fa-angle-down").toggleClass('fa-angle-up');
			
		}
		$(this).siblings().find('.fa').removeClass("fa-angle-up").addClass("fa-angle-down");
		 v=$(this).data('type')
		render();
	})
	//封装截取url地址参数,返回一个对象
	function getUrl(){
		var obj={};
		//获去参数
		var str=decodeURI(location.search);
		//去除前面的?号;
		str=str.slice(1);
		var arr=str.split('&');
		arr.forEach(function(item,index){
			var v=item.split('=')[0];
			var i=item.split('=')[1];
			obj[v]=i;
		})
		return	obj
	}

})