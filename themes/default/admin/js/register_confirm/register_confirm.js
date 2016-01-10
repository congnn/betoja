$(document).ready(function() {
    $(document).on('click', 'a.send_one_email', send_one_email);
    $(document).on('click', 'a.e_reset_link', reset_link);
    $(document).on('click', 'select#i_week', load_contact);

    $(document).on("change", "#btn_filter_submit", function(e) {
        e.preventDefault();
        var obj = $(".e_data_table");
        show_ajax_loading(obj);
        $("#contact_filter_form").ajaxSubmit({
            dataType: "text",
            success: function(dataAll) {
                var temp = dataAll.split($("body").attr("data-barack"));
                var data = {};
                for (var i in temp) {
                    temp[i] = $.parseJSON(temp[i]);
                    data = $.extend({}, data, temp[i]);
                }
                if (window[data.callback]) {
                    console.log("Gọi hàm: ", data.callback);
                    window[data.callback](data, obj);
                } else {
                    console.log("Không tìm thấy hàm yêu cầu:'", data.callback, "'-->Tự động gọi hàm xử lý mặc định 'default_data_table'");
                    default_data_table(data, obj);
                }
            }
        });
    });
});

function send_one_email(e) {
    e.preventDefault();
    show_ajax_loading($('.e_data_table'));
    var obj = $(this);
    var parent = obj.parents('tr.gradeX');
    var id = parent.find('td[for_key="id"]').text();
    var name = parent.find('td[for_key="contact_name"]').text();
    var week = $('#btn_filter_submit').val();
    var year = $('#btn_filter_submit').attr('year');
    var register = parent.find('td[for_key="register"]').text();
    var confirm_val = parent.find('td[for_key="confirm"]').text();
    var text;
    if (register == 'Chưa gửi đăng ký') {
        text = 'lịch đăng ký';
    } else if (confirm_val == 'Chưa gửi confirm') {
        text = 'lịch confirm';
    } else if (register == 'Đã gủi đăng ký') {
        text = 'lại lịch đăng ký';
    } else if (confirm_val == 'Đã gủi confirm') {
        text = 'lại lịch confirm';
    }
    if (!confirm('Bạn có chắc chắn muốn gửi ' + text)) {
        $('#i_img_loading').hide();
        return false;
    }
    var data = {
        teacher_id: id,
        contact_name: name,
        week: week,
        year: year,
        register: register,
        confirm: confirm_val
    };
    var url = obj.attr("ajax-submit");

    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        data: data,
        success: function(data) {
            var jgrow = "error";
            if (parseInt(data.state)) {
                jgrow = "success";
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
                afterOpen: function() {
                    if (data.redirect) {
                        window.location = data.redirect;
                    }
                }
            });
            $('#i_img_loading').hide();
        },
        error: function(a, b, c) {
//            alert(a + b + c);
        }
    });
}

function load_contact() {
    var obj = $(this);
    var parent = obj.parents('div.bgwhite');
    var type = parent.find('input[name=type]').val();
    var val = {
        week: obj.val(),
        year: obj.attr('year'),
        type: type
    };
    var url = obj.attr("ajax-submit");
    $.ajax({
        url: url,
        type: "post",
        dataType: "text",
        data: val,
        success: function(data) {
            var a = $('#i_name');
            a.html(data);
            a.select2('val', '0');
        },
        error: function(a, b, c) {
            alert(a + b + c);
        }
    });
//    alert(obj.val());
}

function reset_link(e) {
    e.preventDefault();
    if (!confirm('Bạn có chắc chắn muốn gửi reset lại không'))
        return false;
    var obj = $(this);
    var id_log = obj.attr('id_log');
    var data = {
        id_log: id_log
    };
    var url = obj.attr("ajax-submit");
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        data: data,
        success: function(data) {
            var jgrow = "error";
            if (parseInt(data.state)) {
                jgrow = "success";
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
                afterOpen: function() {
                    if (data.redirect) {
                        window.location = data.redirect;
                    }
                }
            });
//                window.location.replace("http://topmito.edu.vn");
        },
        error: function(a, b, c) {
            alert(a + b + c);
        }
    });
}