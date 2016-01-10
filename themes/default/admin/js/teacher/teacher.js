$(document).ready(function() {
    $("#excel_file").change(function() {
        $("#excel_file_submit").click();
    });

    $(document).on('click', 'a.e_reset_pass', reset_pass);
    $(document).on('change', '#teacher_type', update_data);
});

function update_data(){
    creat_ajax_table($('.e_data_table'));
}

function creat_ajax_table(obj) {
    var url = obj.attr("data-url");
    var q = obj.find(".e_search_table").val();
    var limit = obj.find(".e_changer_number_record").val();
    var page = obj.find(".e_data_paginate li.active a").attr("data-page");
    var teacher_type = $('#teacher_type').val();
    var order = [];
    temp_order = {};
    obj.find("thead tr th").each(function() {
        if ($(this).attr("order")) {
            if ($(this).attr("order") == "asc" || $(this).attr("order") == "desc") {
                //                order.push($(this).attr("field_name") + " " + $(this).attr("order"));
                temp_order[$(this).attr("order_pos")] = $(this).attr("field_name") + " " + $(this).attr("order");
            }
        }
    });
    for (var i in temp_order) {
        order.push(temp_order[i]);
    }
    order = order.reverse();
    order = order.join(",");
    var data = {
        q: q,
        teacher_type: teacher_type,
        limit: limit,
        page: page,
        order: order
    };

    show_ajax_loading(obj);
    $.ajax({
        url: url,
        type: "POST",
        data: data,
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
        },
        error: function(a, b, c) {
            alert(a + b + c);
            window.location = url;
        }
    });

}

function reset_pass(e) {
    e.preventDefault();
    if (!confirm('Bạn có chắc chắn muốn gửi reset password lại không'))
        return false;
    var obj = $(this);
    var url = obj.attr("ajax_submit");
    $.ajax({
        url: url,
        dataType: "json",
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