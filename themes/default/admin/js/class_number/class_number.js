$(document).ready(function() {
    $(document).on("submit", "form.e_class_number", check_form_register_teach);
    $(document).on("click", "input.free", load_radio);
    $(document).on("click", "input.topica", val_topica);
    $(document).on("click", "th.check_all", check_all);
});

function load_radio() {
    var obj = $(this);
    var val = (obj.val()).substring(0, 1);
    var week = (obj.val()).substring(1, (obj.val()).length);
    var parent = obj.parents('div.checker');
    var parent_left = obj.parents('div#wrapper');
    var sum_hour = parent_left.find('input#sum_hour');
    var sib = parent.siblings();
    var radio_1 = sib.find('input.topica');
    var val_topica_week = (radio_1.val()).substring(1, (radio_1.val()).length);
    var div_radio_1 = radio_1.parent();
    div_radio_1.attr("style", "background: url(themes/default/plugins/forms/uniform/images/free_1.png) 0px 0px;");
    if (val == 0) {
        obj.parent().attr('class', 'checked');
        obj.attr("value", "1" + week);
        sib.attr("style", 'width: 22px; margin-top: -32px; padding-left: 35px; display: block;');
        radio_1.attr("title", "Not Topica");
        obj.before('<input type="hidden" name="free[]" value="' + 1 + week + '">');
    } else {
        obj.parent().attr('class', '');
        obj.siblings().remove();
        obj.attr("value", "0" + week);
        parent.removeAttr("style");
        sib.hide();
        radio_1.attr("value", "0" + val_topica_week);
    }
    var checkboxes = $(this).closest('form').find('input[name="free[]"]');
    var count = checkboxes.parent('.checked').length;
    sum_hour.val(count);
}
function val_topica() {
    var obj = $(this);
    var val = (obj.val()).substring(0, 1);
    var week = (obj.val()).substring(1, (obj.val()).length);
    if (val == 1) {
        obj.attr("value", "0" + week);
        obj.attr("title", "Not Topica");
    } else {
        obj.attr("value", "1" + week);
        obj.attr("title", "Topica");
    }
}
function check_all() {
    var obj = $(this);
    var parent_left = obj.parents('div#wrapper');
    var sum_hour = parent_left.find('input#sum_hour');
    var th = obj.attr('value');
    var checkboxes = $(this).closest('form').find('input.th_' + th);
    var hid = checkboxes.siblings().val();
    if (!hid) {
        $('input.th_' + th).each(function() {
            var week = ($(this).val()).substring(1, ($(this).val()).length);
            $(this).attr("value", "1" + week);
            $(this).before('<input type="hidden" name="free[]" value="' + 1 + week + '">');
        });
    }
    var span = checkboxes.parent();
    var div = span.parent();
    var span_2 = div.siblings();
    var span_3 = span_2.find('span');
    span.attr('class', 'checked');
    span_2.attr('style', 'display: block;width: 22px;margin-top: -32px;padding-left: 55px;');
    span_3.attr('style', 'margin-left: -20px;background: url(themes/default/plugins/forms/uniform/images/free_1.png) 0px 0px;');
    var count_checkboxes = $(this).closest('form').find('input[name="free[]"]');
    var count = count_checkboxes.parent('.checked').length;
    sum_hour.val(count);
}

function check_form_register_teach(e) {
    e.preventDefault();
    if (!confirm('Bạn có chắc chắn lịch dạy như vậy không')) {
        return false;
    }
    var check_all = true;
    var form = $(this);

    if (check_all) {
        ajax_submit_form_register_teach(form);
    }
}
function ajax_submit_form_register_teach(form) {
    var btn = form.find("input[type='submit']");
    btn.removeClass('btn-primary');
    btn.addClass('btn-danger');
    btn.html('Loading ...');
    btn.attr('disabled', 'disabled');
    $('body').modalmanager('loading');
    var url = form.attr('action');
    form.ajaxSubmit({
        type: "POST",
        url: url,
        dataType: "json",
        success: function(data) {
            btn.removeAttr('disabled');
            var jgrow = "error";
            if (data.state != -100) {
                if (data.state == 1) { /* Thành công */
                    btn.removeClass('btn-danger');
                    btn.addClass('btn-success');
                    btn.html('Thành công ...');
                    jgrow = "success";
                } else if (data.state == 0) { /* Lỗi dữ liệu không hợp lệ */
                    btn.addClass('btn-danger');
                    btn.removeClass('btn-success');
                    btn.html('Thất bại ...');
                } else if (data.state == 2) { /* Lỗi phía server */
                    btn.addClass('btn-danger');
                    btn.removeClass('btn-success');
                    btn.html('Thất bại ...');
                } else {
                    btn.addClass('btn-danger');
                    btn.removeClass('btn-success');
                    btn.html('Không rõ kết quả');
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
            }
        },
        error: function(a, b, c) {
            btn.html('Error');
            btn.removeClass('btn-success');
            btn.removeAttr('disabled');
//            alert(a + b + c);
        },
        complete: function(jqXHR, textStatus) {
            $('body').modalmanager('removeLoading');
        }
    });
}