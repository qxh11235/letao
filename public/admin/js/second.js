$(function () {
  var page = 1;
  var pageSize = 5;
  render();
  // 页面的渲染;
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize

      },
      success: function (info) {
        // console.log( info );
        $('tbody').html(template('tpl', info));
        //分页渲染
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
  //点击显示模态框
  $('.btn_add').on("click", function () {
    $('#addModal').modal('show');
    // 发送ajax请求;
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);
        $('.dropdown-menu').html(template('tmp', info));

      }
    })
  })
  //点击dropdown-menu事件委托;
  $(".dropdown-menu").on("click", "li a ", function () {
    // console.log( "111" );
    $('.dropText').text($(this).text());
    $("[name='categoryId']").val($(this).data('id'));
    //手动确认验证通过;
    $("form").data('bootstrapValidator').updateStatus('categoryId', "VALID");
  })
  //异步上传图片
  $("#file").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      var url = data.result.picAddr;
      $('.upimg').attr('src', url);
      $("[name='brandLogo']").val(url);
      //手动确认验证通过;
      $("form").data('bootstrapValidator').updateStatus('brandLogo', "VALID");
    }
  });
  //表单验证;
  //验证表单;
  $('form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类名称'
          }

        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传品牌图片'
          }


        }
      },
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
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
      url: "/category/addSecondCategory",
      success: function (info) {
        if (info.success) {
          page = 1;
          render();
          //关闭模态框,手动重置
          $('#addModal').modal('hide');
          $("form").data('bootstrapValidator').resetForm(true);
          $("dropText").text("请选择一级分类");
          $(".upimg").attr('src',"./images/none.png")

        }
      }
    })
  });

})