$(function () {
  var page = 1;
  var pageSize = 5;
  render();
  // 渲染页面和分页;
  function render() {
    $.ajax({
      type: 'get',
      url: "/product/queryProductDetailList",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        $('tbody').html(template("tpl", info));
        $('#useroption').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (event, originalEvent, type, p) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            page = p;
            render();
          }
        })
      }


    })
  }
  //点击显示莫泰框;
  $('.btn_add').on("click", function () {
    // console.log( "111" );
    $("#addModal").modal("show");
    //发送ajax请求数据渲染下拉菜单;
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('.dropdown-menu').html(template("tmp", info));

      }
    })
  })
  //点击下拉菜单,获取二级分类id 名称
  $('.dropdown-menu').on("click", "li a ", function () {
    var id = $(this).data('id');
    var text = $(this).text();
    $(".dropText").text(text);
    $("[name='brandId']").val(id);
    // 手动校验成功
    $("form").data('bootstrapValidator').updateStatus("brandId", "VALID")
  })
  //点击图片上传

var img=[];
  $("#file").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      //超过三张不能上传
      if ($('.img_box').children().length == 3) {
        return;
      }
      // &picName1="1.jpg"&picAddr1="images/1.jpg"

      img.push(data.result);
      $('<img width="60" height="60" src="' + data.result.picAddr + '" >').appendTo($('.img_box'));

      if ($('.img_box').children().length == 3) {
        $("form").data('bootstrapValidator').updateStatus("proPic", "VALID")
      } else {
        $("form").data('bootstrapValidator').updateStatus("proPic", "INVALID")
      }

    }
  });
  //表单验证;
  //使用表单校验插件
  $("form").bootstrapValidator({
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
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          },


        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          },
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请添加商品描述'
          },
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d{0,4}$/,
            message: '请输入正确的库存(1-99999)'
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品尺码'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入商品尺码 (xx-xx)'
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          },
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品现价'
          },
        }
      },
      proPic: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传三张商品图片'
          },
        }
      }

    }

  });
  // 校验成功;
  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var res=$("form").serialize();
    
    res+="&picName1="+img[0].picName+"&picAddr1="+img[0].picAddr;
    res+="&picName2="+img[1].picName+"&picAddr2="+img[1].picAddr;
    res+="&picName3="+img[2].picName+"&picAddr3="+img[2].picAddr;
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:res,
      success:function(info){
        // console.log( info );
        if (info.success){
          page=1;
          render();
          $('form').data('bootstrapValidator').resetForm(true);
          $('#addModal').modal('hide');
          $('.dropText').text("请选择二级商品分类");
          $(".img_box").empty();
          img=[];
        }
      }
    })
  });

})