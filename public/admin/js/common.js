$(function(){
  //进度条开启和关闭;
  
  $(document).ajaxStart(function(){
    NProgress.start();//开启进度条
  })
  $(document).ajaxStop(function(){
    NProgress.done();//guangbi进度条
  })
})