$(function(){
  //进度条开启和关闭;

  $(document).ajaxStart(function(){
    NProgress.start();//开启进度条
  })
  $(document).ajaxStop(function(){
    NProgress.done();//guangbi进度条
  })
  //点击显示隐藏侧边栏
  $('.icon_aside').on('click',function(){
    $('.lt_aside').toggleClass('active');
    $('.lt_common_top').toggleClass('active');
  })
  //点击分类管理 显示二级菜单;
  $('.secand').prev().on("click",function(){
    $('.secand').slideToggle();
  })
  //点击退出;
  $('.icon_logout').on("click",function(){
    $.ajax({
      url:"/employee/employeeLogout",
      success:function(info){
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })
  





})

