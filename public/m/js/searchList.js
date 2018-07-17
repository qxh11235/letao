$(function () {
	var page = 1;
	var pageSize = 3;
	var v;
	render();

	function render(up) {
		var key = getUrl().key;
		var obj = {
			proName: key,
			page: page,
			pageSize: pageSize
		}
		//判断要不要传排序的参数;
		if ($('.sort li').hasClass("active")) {
			// var key=$(that).data(type);
			var type = $('.sort li.active').find(".fa").hasClass('fa-angle-down') ? 2 : 1;
			obj[v] = type;
		}
		$.ajax({
			url: "/product/queryProduct",
			type: "get",
			data: obj,
			success: function (info) {
				console.log(info);
				if (up == 'up') {
					//假设是上拉加载执行下面代码
					$('.lt_content .brand').append(template('tpl', info));
					console.log( info.data.length == 0 );
					
					mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(info.data.length == 0);
				} else {
					//下拉执行下面代码;
					$('.lt_content .brand').html(template('tpl', info));
					//下拉刷新完成隐藏;
					mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
					//刷新完成要重置上拉;
					mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
				}

			}
		})
	}
	//点击搜索重新渲染页面,
	$('.lt_search button').on("click", function () {

		var val = $('.lt_search input').val();
		location.href = "searchList.html?key=" + val;

	})
	//点击升序降序;
	$('.lt_content .sort li[data-type]').on("tap", function () {
		//判断有没有active类
		if (!$(this).hasClass('active')) {
			$(this).addClass('active').siblings().removeClass('active');

		} else {
			$(this).find('.fa').toggleClass("fa-angle-down").toggleClass('fa-angle-up');

		}
		$(this).siblings().find('.fa').removeClass("fa-angle-up").addClass("fa-angle-down");
		v = $(this).data('type')
		//点击排序执行一次下拉刷新;
		mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
	})
	//下拉刷新;
	mui.init({
		pullRefresh: {
			container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
			down: {
				height: 50, //可选,默认50.触发下拉刷新拖动距离,
				auto: true, //可选,默认false.首次加载自动下拉刷新一次
				contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
				contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
				contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
				callback: function () {
					page = 1;
					render();
				} //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			},
			up: {
				height: 50, //可选.默认50.触发上拉加载拖动距离
				// auto: true, //可选,默认false.自动上拉加载一次
				contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
				 //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
				callback: function () {
					console.log( page );
					page++;
					render('up');
				}
			}
		}
	});


})