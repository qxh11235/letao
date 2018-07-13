$(function () {
  var page = 1;
  var pageSize = 5;
  render();
  //渲染
  function render() {
    $.ajax({
      type: "get",
      data: {
        page: page,
        pageSize: pageSize
      },
      url: "/user/queryUser",
      success: function (info) {
        // console.log( info );
        $('tbody').html(template('tpl', info))
        //分页渲染
        $('#useroption').bootstrapPaginator({
          bootstrapMajorVersion: 3, //版本
          currentPage: page, //当前页数
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    })
  }
  //按钮添加绑定事件,事件委托给tbody;
  $('tbody').on("click", " button", function () {
    // console.log( 111 );
    var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    var id = $(this).parent().data('id');
    $('#userModal').modal('show');
    $('.btn_updata').off().on('click', function () {
      // 发送请求;
      $.ajax({
        type: "post",
        data: {
          id: id,
          isDelete: isDelete
        },
        url: "/user/updateUser",
        success: function (info) {
          console.log(info);
          if (info.success) {
            $('#userModal').modal('hide')
            render();

          }
        }
      })
    })
  })






})