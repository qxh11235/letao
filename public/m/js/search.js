$(function () {
	//获取本地存储的数据;转成数组
	render();



	//点击搜索存储数据到本地
	$('.lt_search button').on("click", function () {
		var val = $('.lt_search input').val();
		$('.lt_search input').val('');
		if (val != '') {

			var arr = getLocal();
			//判断输入的val是否存在数组中,有则删除,人后在添加;
			if (arr.indexOf(val) != -1) {
				var index = arr.indexOf(val);
				arr.splice(index, 1);
			}
			//判断历史记录的数量只可以记录十条;
			if (arr.length > 9) {
				arr = arr.splice(0, 9);
			}
			arr.unshift(val);
			setLocal(arr);

			render();
			//跳转商品页;
			location.href="searchList.html?key="+val;

		}
	
	})
	//点击清空;
	$('.lt_history').on("click", '.btn_empty', function () {
		//弹出确认框;
		mui.confirm("是否清空历史记录", '温馨提示', ['否', '是'], function (e) {
			console.log(e);
			if (e.index == 1) {
				localStorage.removeItem("h_history");
				render();
			}
		})

	})
	//点击删除;
	$('.lt_history').on('click', ".btn_del", function () {
		var index = $(this).data('index');
		var arr = getLocal();
		//弹出确认框;
		mui.confirm("是否清空本条历史记录", '温馨提示', ['否', '是'], function (e) {
			console.log(e);
			if (e.index == 1) {
				arr.splice(index, 1);
				setLocal(arr);
				render();
			}
		})

	})
	//设置本地数据;
	function setLocal(arr) {
		var str = JSON.stringify(arr);
		localStorage.setItem("h_history", str);
	}
	//获取本地数据,返回数组;
	function getLocal() {
		var str = window.localStorage.getItem("h_history");
		var arr = JSON.parse(str) || [];
		return arr;

	}
	//渲染历史记录;
	function render() {
		var arr = getLocal();
		$('.lt_history').html(template('tpl', {
			list: arr
		}));
	}
})