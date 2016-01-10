$(document).ready(function () {

    $("html").addClass("loginPage");

    $("#login").toggle('fast');

    var wrapper = $(".login-wrapper");
    var barBtn = $("#bar .btn");

    //change the tabs
    barBtn.click(function () {
        var btnId = $(this).attr('id');
        wrapper.attr("data-active", btnId);
        $("#bar").attr("data-active", btnId);
    });

});

function reset_password(data, form, button) {
    var jgrow = "error";
    if (data.state == 1) {
        jgrow = "success";
        $('.btn-block').removeClass('btn-danger');
        $('.btn-block').html('Thành công');
    } else {
        $('.btn-block').removeClass('btn-danger');
        $('.btn-block').addClass('btn-success');
        $('.btn-block').removeAttr('disabled');
        $('.btn-block').html('Lấy lại mật khẩu');
    }
    $.jGrowl("<i class='icon16 i-checkmark-3'></i> " + data.msg, {
        group: jgrow,
        position: 'top-right',
        sticky: false,
        closeTemplate: '<i class="icon16 i-close-2"></i>',
        animateOpen: {
            width: 'show',
            height: 'show'
        },
        afterOpen: function () {
            if (data.redirect) {
                window.location = data.redirect;
            }
        }
    });
}

function form_login(data, form, button) {
    button.removeAttr('disabled');
    var jgrow = "error";
    if (data.state != -100) {
        if (data.state == 1) { /* Thành công */
            button.removeClass('btn-danger');
            button.addClass('btn-success');
            button.html('Thành công ...');
            jgrow = "success";
        } else if (data.state == 0) { /* Lỗi dữ liệu không hợp lệ */
            button.removeClass('btn-danger');
            button.addClass('btn-primary');
            button.html('Đăng nhập');
        } else if (data.state == 2) { /* Lỗi phía server */
            button.addClass('btn-danger');
            button.removeClass('btn-success');
            button.html('Thất bại ...');
        } else {
            button.addClass('btn-danger');
            button.removeClass('btn-success');
            button.html('Không rõ kết quả');
        }
        if (data.error) {
            show_error(data.error);
        }

        $.jGrowl("<i class='icon16 i-checkmark-3'></i> " + data.msg, {
            group: jgrow,
            position: 'top-right',
            sticky: false,
            closeTemplate: '<i class="icon16 i-close-2"></i>',
            animateOpen: {
                width: 'show',
                height: 'show'
            },
            afterOpen: function () {
                if (data.redirect) {
                    window.location = data.redirect;
                }
            }
        });
    }

}