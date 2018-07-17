$(function () {
	//获得slider插件对象

	//获取商品id
	var id = getUrl().id;
	console.log(id);
	//发送ajax请求;
	$.ajax({
		url: "/product/queryProductDetail",
		type: "get",
		data: {
			id: id
		},
		success: function (info) {
			console.log(info);
			$(".mui-scroll").html(template('tpl',info));
			//重新初始化轮播图;
			var gallery = mui('.mui-slider');
			gallery.slider({
				interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
			});
			//重新初试化数字框;
			mui('.mui-numbox').numbox();
			//给尺码注册
		}
	})
})