
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否显示滚动条
	});
	//点击后退;
	$('.hd_left').on("tab",function(){
		history.go(-1);
	})
	//封装截取url地址参数,返回一个对象
	function getUrl() {
		var obj = {};
		//获去参数
		var str = decodeURI(location.search);
		//去除前面的?号;
		str = str.slice(1);
		var arr = str.split('&');
		arr.forEach(function (item, index) {
			var v = item.split('=')[0];
			var i = item.split('=')[1];
			obj[v] = i;
		})
		return obj
	}