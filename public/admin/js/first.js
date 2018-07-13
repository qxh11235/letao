$(function () {
  // 当前页

  var page = 1;
  var pageSize = 3;
  render();
  //表格渲染和分页渲染;
  function render() {
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log( info );
        $('tbody').html(template('tpl', info));
        $('#useroption').bootstrapPaginator({
          bootstrapMajorVersion: 3, //版本

          currentPage: page, //当前页数

          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (a, s, d, p) {
            page = p;
            render();
          }
        })
      }
    })
  }
  //点击添加分类
  $('.btn_add').on('click', function () {
    $('#addModal').modal('show')
  })
  //验证表单;
  $('form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },

        }
      },
    },


  })
  //b表单验证成功事件
  $("form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      data: $("form").serialize(),
      url: "/category/addTopCategory",
      success: function (info) {
        if (info.success) {
          page = 1;
          render();
          $('#addModal').modal('hide');
          $("form").data('bootstrapValidator').resetForm(true)
        }
      }
    })
  });



})