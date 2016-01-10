/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    use_datatable();
});

function use_datatable() {
    $("table.use_datatable").dataTable({
        "autoWidth": true,
    });
}

function delete_respone(data, obj) {
    var group = "success";

    if (data.state != 1) {
        group = "error";
    } else {
        for (var key in data.list_id) {
            obj.parents(".e_widget").find(".e_data_table table tbody tr[data-id='" + data.list_id[key] + "']").fadeOut(1000, function () {
                $(this).remove();
            });
        }
    }

    $.jGrowl("<i class='icon16 i-checkmark-3'></i> " + data.msg, {
        group: group,
        position: 'top-right',
        sticky: false,
        closeTemplate: '<i class="icon16 i-close-2"></i>',
        animateOpen: {
            width: 'show',
            height: 'show'
        }
    });
    setTimeout(function () {
        location.reload();
    }, 2500);

}

function  save_form_add_response(data, form, button) {
    button.removeAttr('disabled');
    var jgrow = "error";
    if (data.state == 1) { /* Thành công */
        button.removeClass('btn-danger');
        button.addClass('btn-success');
        button.html('Thành công ...');
        jgrow = "success";

        var tempObj = false;
        $("th[field_name]").each(function () {
            var attr = $(this).attr("field_name").split(".");
            if (attr[attr.length - 1] == data.key_name) {
                tempObj = $(this).parents(".data_table");
            }
        });
        if (tempObj) {
            creat_ajax_table(tempObj);
        }

        form.parents(".modal_content").modal("hide");
    } else if (data.state == 0) { /* Lỗi dữ liệu không hợp lệ */
        button.addClass('btn-danger');
        button.removeClass('btn-success');
        button.html('Thất bại ...');
    } else if (data.state == 2) { /* Lỗi phía server */
        button.addClass('btn-danger');
        button.removeClass('btn-success');
        button.html('Thất bại ...');
        location.reload();
    } else {
        button.addClass('btn-danger');
        button.removeClass('btn-success');
        button.html('Không rõ kết quả');
        location.reload();
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
        }
    });
    setTimeout(function () {
        location.reload();
    }, 2500);
}

function  save_form_edit_response(data, form, button) {
    button.removeAttr('disabled');
    var jgrow = "error";
    if (data.state == 1) { /* Thành công */
        button.removeClass('btn-danger');
        button.addClass('btn-success');
        button.html('Thành công ...');
        jgrow = "success";

        var for_key = data.key_name;
        $("th[field_name]").each(function () {
            var attr = $(this).attr("field_name").split(".");
            if (attr[attr.length - 1] == data.key_name) {
                for_key = $(this).attr("field_name");
            }
        });
        var tempObj = $("tr[data-id='" + data.record[data.key_name] + "'] td[for_key='" + for_key + "']").parent("tr");

        if (tempObj && tempObj.length) {
            tempObj.find("td").effect("highlight", {}, 5000);
            for (var key in data.record) {
                tempObj.children("td[for_key]").each(function () {
                    var t_key = $(this).attr("for_key");
                    if (t_key == key) {
                        $(this).html(data.record[key]);
                    } else {
                        if (t_key.split(".").length > 1) {
                            if (t_key.split(".")[1] == key) {
                                $(this).html(data.record[key]);
                            }
                        }
                    }
                });
            }
        }

        form.parents(".modal_content").modal("hide");
    } else if (data.state == 0) { /* Lỗi dữ liệu không hợp lệ */
        button.addClass('btn-danger');
        button.removeClass('btn-success');
        button.html('Thất bại ...');
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
        }
    });
    setTimeout(function () {
        location.reload();
    }, 2500);
}