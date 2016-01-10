$(document).ready(function () {
    $(window).scroll(function () {
        var height_scrollTop = $(window).scrollTop();
        if (height_scrollTop > 220) {
            $('#i_row_data_title').show();
            $('.e_row_data_title').hide();
        } else {
            $('#i_row_data_title').hide();
            $('.e_row_data_title').show();
        }
    });
    $('.e_select_submit').change(function () {
        $('#contact_filter_form').submit();
    });

    $(".e_Scrollbar").mCustomScrollbar({
        theme: "dark"
    });

    $(".wrap_teacher").mCustomScrollbar({
        theme: "dark"
    });

    $(".e_teacher").attr("draggable", "true");

    $(document).on('click', '.e_title_weekday', function () {
        var obj = $(this);
        var day = obj.attr('day');

        $('.e_table_data').find('.e_tr').each(function () {
            if (obj.hasClass('e_active')) {
                if ($(this).attr('day') === day) {
                    $(this).hide();
                }

            } else {
                if ($(this).attr('day') === day) {
                    $(this).show();
                }
            }

        });
        if (obj.hasClass('e_active')) {
            obj.removeClass('e_active');
        } else {
            obj.addClass('e_active');
        }
    });

    $('.e_widget_content').find('.e_teacher').each(function () {
        var html = $(this).find('.e_info_teacher').html();
        $(this).tooltipster({
            content: html,
            touchDevices: false,
            contentAsHTML: true,
            interactive: true,
            trigger: 'hover'
        });
    });

    $(document).on("change", '.e_select_arrange_submit', function () {
        var week = $('#i_select_week').val();
        var year = $('#i_select_year').val();
        var class_type = $('#i_select_class_type').val();
        var url = $(this).parents('.e_widget').attr('data_url');
        var data = {
            'week': week,
            'year': year,
            'class_type': class_type
        };
        show_ajax_loading($('.e_widget'));
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
                $('.e_widget').html(data.html);
                $(".e_Scrollbar").mCustomScrollbar({
                    theme: "dark"
                });

                $(".wrap_teacher").mCustomScrollbar({
                    theme: "dark"
                });
                $('.e_widget_content').find('.e_teacher').each(function () {
                    var html = $(this).find('.e_info_teacher').html();
                    $(this).tooltipster({
                        content: html,
                        touchDevices: false,
                        contentAsHTML: true,
                        interactive: true,
                        trigger: 'hover'
                    });
                });
                $(".e_teacher").attr("draggable", "true");
                $('.select2').select2();
            },
            complete: function (jqXHR, textStatus) {
                $('#i_img_loading').remove();
            },
            error: function (a, b, c) {
                alert('Có lỗi xảy ra');
            }
        });
    });

    $(document).on('click', '.e_icon_del', function () {
        var obj = $(this);
        var status = 0;
        var teacher_info = obj.parent('.e_teacher');
        var id_teacher = teacher_info.attr('id');
        var e_field_info = obj.parents('.e_field_info');
        var btn_add_teacher = e_field_info.find('.btn_add_teacher');
        var icon_status = obj.parents('.info_class').find('.icon_status');
        if (icon_status.hasClass('icon_status_1')) {
            icon_status.removeClass('icon_status_1');
            icon_status.addClass('icon_status_2');
        }
        if (icon_status.hasClass('icon_status_2')) {
            icon_status.removeClass('icon_status_2');
            icon_status.addClass('icon_status_3');
        }
        btn_add_teacher.show(100);
        e_field_info.find('.teacher_id').val('');
        e_field_info.find('.assistant_id').val('');
        var tagert_id = e_field_info.attr('tagert_field');
//        var tagert = document.getElementById(tagert_id);
//        tagert.appendChild(document.getElementById(id_teacher));
        var value_teacher = teacher_info.attr('teacher_id');
        var tagert_class = $('#' + tagert_id).attr('tagert_field');
        var array_class = tagert_class.split('&&');
        var current_val = '';
        $('.e_table_data').find('.' + array_class[1]).each(function () {
            var teacher_backup = $(this).find('.teacher_backup');
            if (teacher_backup.length) {
                current_val = teacher_backup.val();
                if (current_val) {
                    current_val += ';' + value_teacher;
                } else {
                    current_val += value_teacher;
                }
                teacher_backup.val(current_val);
            }
        });


        var day = teacher_info.attr('day');
        var e_table_data = e_field_info.parents('.e_table_data');
        var list_tr = e_table_data.find('.' + day);

        var html_teacher = document.getElementById(id_teacher).outerHTML;
        $('#' + tagert_id).find('.mCSB_container').append(html_teacher);
        teacher_info.remove();
        update_calendar(e_field_info, current_val);
        list_tr.each(function () {
            var e_teacher = $(this).find('.e_teacher');
            var i = 0;
            e_teacher.each(function () {
                if ($(this).attr('teacher_id') == teacher_info.attr('teacher_id')) {
                    i++;
                    if (i > 1) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }

                }
            });

        });
        change_info_support(teacher_info.attr('teacher_id'), status);

    });
    $(document).on('click', '.e_info_support', function () {
        $(this).toggle();
        $('.e_action_fixed').toggle();
    });
    $(document).on('click', '.e_action_fixed', function () {
        $(this).toggle();
        $('.e_info_support').toggle();
    });

    $('.e_btn_arrange').click(function () {
        show_ajax_loading($('.e_widget_content'));
        $('.e_widget_content').find('.e_ajax_submit').each(function () {
            $(this).submit();
        });
    });

    $(document).on("click", "#btn_contact_filter_submit", function (e) {
        e.preventDefault();
        var obj = $(".table_contact");
        show_ajax_loading(obj);
        $("#arrange_filter_form").ajaxSubmit({
            dataType: "text",
            success: function (dataAll) {
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

    $(document).on('click', '.e_title_weekDay', function () {
        var e_wrap_info = $(this).siblings('.e_wrap_info');
        e_wrap_info.toggle();
    });
});

function dragHandler(target, e) {
    e.dataTransfer.setData('Text', target.id);
    $(target).tooltipster('disable');

}

function dropHandler(target, e) {
    var status = 1;
    var id = e.dataTransfer.getData('Text');
    var teacher = $(target).find('.teacher');
    var teacher_id = $('#' + id).attr('teacher_id');
    var tagert_class = $('#' + id).parents('.list_teacher').attr('tagert_field');
    var btn_add_teacher = $(target).find('.btn_add_teacher');
    var teacher_type = $(target).attr('teacher_type');
    var teacher_type_compare = $('#' + id).attr('teacher_type');
    if ($(target).hasClass(tagert_class) && (teacher_type == teacher_type_compare || teacher_type_compare == 3)) {
        var day = $('#' + id).attr('day');
        var list_tr = $(target).parents('.e_table_data').find('.' + day);
        var value_id_del;
        if (teacher.length) {
            var id_teacher = teacher.attr('id');
            value_id_del = $('#' + id_teacher).attr('teacher_id');
            var tagert_field_id = $(target).attr('tagert_field');
            var tagert_list_teacher = document.getElementById(tagert_field_id);
            tagert_list_teacher.appendChild(document.getElementById(id_teacher));
            change_info_support(value_id_del, 0);
        }
        var array_class = tagert_class.split('&&');
        var text = '';
        $('#' + id).parents('.e_table_data').find('.' + array_class[1]).each(function () {
            var teacher_backup = $(this).find('.teacher_backup');
            var current_val = teacher_backup.val();
            if (value_id_del) {
                current_val = current_val + ';' + value_id_del;
            }
            if (current_val) {
                var array_val = current_val.split(';');

                for (var index = 0; index < array_val.length; index++) {
                    if (array_val[index] != teacher_id) {
                        if (text) {
                            text += ';' + array_val[index];
                        } else {
                            text += array_val[index];
                        }
                    }

                }
                teacher_backup.val(text);
            }

        });

        $("#" + tagert_field_id).mCustomScrollbar({
            theme: "dark"
        });
        change_info_support(teacher_id, status);
        target.appendChild(document.getElementById(id));
        list_tr.each(function () {
            var e_teacher = $(this).find('.e_teacher');
            var i = 0;
            e_teacher.each(function () {
                if ($(this).attr('teacher_id') == teacher_id) {
                    $(this).hide();
                }
                if ($(this).attr('teacher_id') == value_id_del) {
                    i++;
                    if (i > 1) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                }
            });

        });
        var e_teacher_id = $(target).find('.teacher_id');
        var e_assistant_id = $(target).find('.assistant_id');
        if ($(target).hasClass('e_field_info')) {
            e_teacher_id.val(teacher_id);
            e_assistant_id.val(teacher_id);
        }
        var icon_status = $(target).parents('.info_class').find('.icon_status');
        if (icon_status.hasClass('icon_status_3')) {
            icon_status.removeClass('icon_status_3');
            if (icon_status.attr('typeclass') == 2 && icon_status.attr('levelclass') == 'BASIC') {
                icon_status.addClass('icon_status_2');
            } else {
                icon_status.addClass('icon_status_1');
            }

        } else if (icon_status.hasClass('icon_status_2')) {
            icon_status.removeClass('icon_status_2');
            icon_status.addClass('icon_status_1');
        }
        e.preventDefault();
        update_calendar(target);
        btn_add_teacher.hide();
    } else {
        var msg = 'Giáo viên này không phù hợp với lớp được xếp';
        if (teacher_type_compare == 2) {
            msg = 'Trợ giảng này không phù hợp với lớp được xếp';
        }
        $.jGrowl("<i class='icon16 i-checkmark-3'></i> " + msg, {
            group: "error",
            position: 'top-right',
            sticky: false,
            closeTemplate: '<i class="icon16 i-close-2"></i>',
            animateOpen: {
                width: 'show',
                height: 'show'
            }
        });
    }
    $('#' + id).tooltipster('enable');
}

function change_info_support(teacher_id, status) {
    $('#i_fixed_wrap').find('.e_row_field').each(function () {
        if ($(this).attr('teacher_id') == teacher_id) {
            var field_h2 = $(this).find('.field_h2');
            var field_h1 = $(this).find('.field_h1');
            var current_val = field_h2.text();
            var field_h1_val = parseInt(field_h1.text());

            if (status) {
                field_h2.text(parseInt(current_val) + 1);
                if (parseInt(current_val) + 1 > field_h1_val) {
                    $(this).removeClass('row_field_3');
                    $(this).removeClass('row_field_2');
                    $(this).removeClass('row_field_1');
                    $(this).addClass('row_field_1');
                }
                if (parseInt(current_val) + 1 <= field_h1_val) {
                    $(this).removeClass('row_field_3');
                    $(this).removeClass('row_field_2');
                    $(this).removeClass('row_field_1');
                    $(this).addClass('row_field_2');
                }
            } else {
                if ((parseInt(current_val) - 1) > field_h1_val) {
                    $(this).removeClass('row_field_3');
                    $(this).removeClass('row_field_2');
                    $(this).removeClass('row_field_1');
                    $(this).addClass('row_field_1');
                }
                if (((parseInt(current_val) - 1) > 0) && ((parseInt(current_val) - 1) <= field_h1_val)) {
                    $(this).removeClass('row_field_3');
                    $(this).removeClass('row_field_2');
                    $(this).removeClass('row_field_1');
                    $(this).addClass('row_field_2');
                }
                if ((parseInt(current_val) - 1) == 0) {
                    $(this).removeClass('row_field_3');
                    $(this).removeClass('row_field_2');
                    $(this).removeClass('row_field_1');
                    $(this).addClass('row_field_3');
                }
                field_h2.text(parseInt(current_val) - 1);
            }
            $(this).animate({
                opacity: 0.5
            }, 1000, function () {
                $(this).css("opacity", "1");
            });
        } else {
            if (status) {
                var html_teacher = document.getElementById($(this).attr('id')).outerHTML;
                $('#i_content_scroll').find('.mCSB_container').append(html_teacher);
                $(this).remove();
            }
        }
//        $(".e_Scrollbar").mCustomScrollbar({
//            theme: "dark"
//        });
    });
}

function update_calendar(target, teacher_backup) {
    var teacher_id = $(target).find('.teacher_id');
    var assistant_id = $(target).find('.assistant_id');
    var calendar_id = $(target).attr('id');
    var week = $('select#i_select_week').val();
    var url = $(target).attr("ajax-submit");
    var data = {
        'id': calendar_id,
        'week': week,
        'teacher_id': teacher_id.val(),
        'assistant_id': assistant_id.val(),
        'teacher_backup': teacher_backup
    };
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        data: data,
        async: false,
        success: function (data) {
            if (!data.status) {
                alert(data.msg);
                location.reload();
            }
        },
        error: function (a, b, c) {
            alert('Có lỗi xảy ra trong quá trình phân lịch');
//                location.reload();
        }
    });
}

function  save_form_arrange_calendar_edit_response(data, form, button) {
    button.removeAttr('disabled');
    var jgrow = "error";
    if (data.state == 1) { /* Thành công */
        button.removeClass('btn-danger');
        button.addClass('btn-success');
        button.html('Thành công ...');
        jgrow = "success";

        form.parents(".modal_content").modal("hide");

        $('.info_teacher_' + data.calendar_id).html(data.info_teacher);
        $('.info_teacher_' + data.calendar_id).find('.e_teacher').each(function () {
            var html = $(this).find('.e_info_teacher').html();
            $(this).tooltipster({
                content: html,
                touchDevices: false,
                contentAsHTML: true,
                interactive: true,
                trigger: 'hover'
            });
        });
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
}
