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

    $(document).on("change", '.e_select_arrange_submit', function () {
        var week = $('#i_select_week').val();
        var year = $('#i_select_year').val();
        var teacher_type = $('#i_select_teacher_type').val();
        var url = $(this).parents('.e_widget').attr('data_url');
        var data = {
            'week': week,
            'year': year,
            'teacher_type': teacher_type
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
                $('.e_widget').find('.e_teacher').each(function () {
                    var html = $(this).find('.e_detail_teacher').html();
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

    $(document).on('click', '.e_btn_update_calendar_teach_lms', function () {
        update_calendar_teach_lms($(this));
    });

    $('.e_select_submit').change(function () {
        $('#arrange_filter_form').submit();
    });

    $(".e_wrap_scrollbar").mCustomScrollbar({
        theme: "dark"
    });

    $(".e_teacher").attr("draggable", "true");

    $('.e_data_wrap').find('.e_teacher').each(function () {
        var html = $(this).find('.e_detail_teacher').html();
        $(this).tooltipster({
            content: html,
            touchDevices: false,
            contentAsHTML: true,
            interactive: true,
            trigger: 'hover'
        });
    });

    $(document).on('click', '.e_icon_del', function () {
        var obj = $(this);
        var status = 0;
        var e_info_teacher = obj.parents('.e_info_teacher');
        var e_teacher = obj.parent('.e_teacher');
        var id_teacher = e_teacher.attr('id');
        var e_field_info = obj.parents('.e_field_info');

        change_status_arrange(obj);//thay đổi trang thái phân lịch

        if (e_field_info.hasClass('assistant')) {
            e_info_teacher.attr('assistantid', '');
        } else {
            e_info_teacher.attr('teacherid', '');
        }
        //cập nhật giá trị teacherbackup
        var value_teacher = e_teacher.attr('teacher_id');
        var teacherbackup = e_info_teacher.attr('teacherbackup');
        if (teacherbackup) {
            teacherbackup += ';' + value_teacher;
        } else {
            teacherbackup += value_teacher;
        }
        e_info_teacher.attr('teacherbackup', teacherbackup);
        var day = e_teacher.attr('day');
        var e_table_data = e_field_info.parents('.e_table_data');
        var list_tr = e_table_data.find('.' + day);
        ajax_change_calendar(e_info_teacher, teacherbackup);
        var html_teacher = document.getElementById(id_teacher).outerHTML;
        var tagert_id = e_field_info.attr('tagert_field');
        $('#' + tagert_id).find('.mCSB_container').append(html_teacher);
        e_teacher.remove();
        change_display_teacher(list_tr, e_teacher.attr('teacher_id'), e_teacher.attr('teacher_id'));
        change_info_support(e_teacher.attr('teacher_id'), status);
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
        alert('ok');
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
    var e_info_teacher = $(target).parents('.e_info_teacher');
    if ($(target).hasClass(tagert_class)) {
        var day = $('#' + id).attr('day');
        var list_tr = $(target).parents('.e_table_data').find('.' + day);
        var value_id_del;
        if (teacher.length) {
            var id_teacher = teacher.attr('id');
            value_id_del = $('#' + id_teacher).attr('teacher_id');
            var tagert_field_id = $(target).attr('tagert_field');
            $("#" + tagert_field_id).mCustomScrollbar("destroy");
            var tagert_list_teacher = document.getElementById(tagert_field_id);
            tagert_list_teacher.appendChild(document.getElementById(id_teacher));
            change_info_support(value_id_del, 0);
        }
        $("#" + tagert_field_id).mCustomScrollbar({
            theme: "dark"
        });
        target.appendChild(document.getElementById(id));

        change_display_teacher(list_tr, teacher_id, value_id_del);//thay đổi hiển thị thông tin của giáo viên
        var teacherbackup = change_value_teacherBackup(e_info_teacher, teacher_id, value_id_del);
        e_info_teacher.attr('teacherbackup', teacherbackup);
        if ($('#' + id).hasClass('e_assistant')) {
            e_info_teacher.attr('assistantid', teacher_id);
        } else {
            e_info_teacher.attr('teacherid', teacher_id);
        }
        change_status_arrange(target);//cập nhật trang thái phân lịch
        change_info_support(teacher_id, status);//cập nhật thông tin hỗ trợ phân lịch
        ajax_change_calendar(e_info_teacher);
    } else {
        if ($(target).parents('.e_wrap_info_class').length) {
            var msg = 'Giáo viên không phù hợp với lớp muốn xếp';
            show_notify_calendar(msg);
        }
    }
    $('#' + id).tooltipster('enable');
}

/**
 * 
 * @param {type} id
 * @param {type} tagert_class
 * @param {type} teacher_id
 * @param {type} value_id_del
 * @returns {undefined}
 */
function change_value_teacherBackup(e_info_teacher, teacher_id, value_id_del) {
    var text = '';
    var current_val = e_info_teacher.attr('teacherbackup');
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
    }
    return text;
}

/**
 * 
 * @param {type} list_wrap_teacher
 * @returns {undefined}
 */
function change_display_teacher(list_wrap_teacher, teacher_id, value_id_del) {
    list_wrap_teacher.each(function () {
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
}

/**
 * 
 * @param {type} target
 * @returns {undefined}
 */
function change_status_arrange(target) {
    var class1 = 'icon_status_1'; //số lớp được phân lớn hơn số lớp mong muốn được dạy
    var class2 = 'icon_status_2'; //số lớp được phân thấp hơn số lớp mong muốn được dạy
    var class3 = 'icon_status_3'; //chưa được phân lớp nào cả
    var icon_status = $(target).parents('.info_class').find('.icon_status');
    if (icon_status.hasClass(class3)) {
        icon_status.removeClass(class3);
        if (icon_status.attr('typeclass') == 2 && icon_status.attr('levelclass') == 'BASIC') {
            icon_status.addClass(class2);
        } else {
            icon_status.addClass(class1);
        }

    } else if (icon_status.hasClass(class2)) {
        icon_status.removeClass(class2);
        icon_status.addClass(class1);
    }
}

/**
 * 
 * @param {type} msg
 * @returns {undefined}
 */
function show_notify_calendar(msg) {
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


/**
 * 
 * @param {type} teacher_id
 * @param {type} status
 * @returns {undefined}
 */
function change_info_support(teacher_id, status) {
    $('#i_fixed_wrap').find('.e_row_field').each(function () {
        if ($(this).attr('teacherid') == teacher_id) {
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
    });
}

function ajax_change_calendar(e_info_teacher) {
    var calendarId = e_info_teacher.attr('calendarid');
    var teacher_id = e_info_teacher.attr('teacherid');
    var assistantId = e_info_teacher.attr('assistantid');
    var teacherBackup = e_info_teacher.attr('teacherbackup');
    var url = e_info_teacher.attr("ajax-submit");
    var array_calendar_id = [];
    var e_wrap_info_class = e_info_teacher.parents('.e_wrap_info_class');
    e_wrap_info_class.find('.e_info_teacher ').each(function () {
        var calendar_id = $(this).attr('calendarid');
        array_calendar_id.push(calendar_id);
        $(this).attr('teacherbackup', teacherBackup);

    });
    var data = {
        'id': calendarId,
        'array_calendar_id': array_calendar_id,
        'teacher_id': teacher_id,
        'assistant_id': assistantId,
        'teacher_backup': teacherBackup
    };
    $.ajax({
        url: url,
        type: "post",
        data: data,
        dataType: 'json',
        success: function (data) {
            console.log(data.msg);
        },
        error: function (a, b, c) {
            alert('Có lỗi xảy ra trong quá trình phân lịch');
//            location.reload();
        }
    });


}
function update_calendar_teach_lms(obj) {
    var url = obj.attr('href');
    show_ajax_loading($('.e_widget'));
    $.ajax({
        url: url,
        type: "get",
        dataType: 'json',
        success: function (data) {
            obj.removeAttr('disabled');
            var jgrow = "error";
            if (data.state == 1) { /* Thành công */
                obj.removeClass('btn-danger');
                obj.addClass('btn-success');
                jgrow = "success";
            } else if (data.state == 0) { /* Lỗi dữ liệu không hợp lệ */
                obj.addClass('btn-danger');
                obj.removeClass('btn-success');
            } else if (data.state == 2) { /* Lỗi phía server */
                obj.addClass('btn-danger');
                obj.removeClass('btn-success');
                location.reload();
            } else {
                obj.addClass('btn-danger');
                obj.removeClass('btn-success');
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
        },
        complete: function (jqXHR, textStatus) {
            $('#i_img_loading').remove();
        },
        error: function (a, b, c) {
            alert('Có lỗi xảy ra trong quá trình phân lịch');
        }
    });
}