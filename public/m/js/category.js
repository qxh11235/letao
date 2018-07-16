$(function(){
	$.ajax({
		url:"/category/queryTopCategory",
		type:"get",
		success:function (info) { 
			// console.log( info );
			$('.lt_aside ul').html(template('tpl',info));
			render(info.rows[0].id)
		}
	})
	//事件委托,点击一级分类渲染右边商品;

	$('.lt_aside ul').on('click','li',function(){
		//添加active,移除其它的active;
		$(this).addClass('active').siblings().removeClass('active');
		//获取一级分类id;
		var id= $(this).data('id');
		render(id);
	})
	
	function render(id){
		$.ajax({
			url:"/category/querySecondCategory",
			type:"get",
			data:{
				id:id
			},
			success:function (info) {  
				console.log( info );
				$('.lt_brand ul').html( template('tmp',info));

			}
		})
	}
})