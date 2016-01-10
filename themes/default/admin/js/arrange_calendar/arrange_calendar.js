$(document).ready(function () {
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function (ul, items) {
            var that = this,
                    currentCategory = "";
            $.each(items, function (index, item) {
                if (item.category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                    currentCategory = item.category;
                }
                that._renderItemData(ul, item);
            });
        },
        _renderItem: function (ul, item) {
            return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
        }
    });
    $(document).on("focus", 'input.e_input_arrange', function () {
        var response_arr = [];
        var temp_not_register = [];
        var e_field_info = $(this).parents('.e_field_info');
        var url_string = $(this).parents('.wrap_info_class').attr('data_url');
        var data = {
            'week': $('#i_select_week').val(),
            'year': $('#i_select_year').val(),
            'week_day': e_field_info.attr('week_day'),
            'hour_id': e_field_info.attr('hour_id'),
            'teacher_type': e_field_info.attr('teacher_type')
        };
        $.ajax({
            url: url_string,
            dataType: "json",
            type: "post",
            data: data,
            success: function (data) {
                if (data.total_teacher) {
                    $.map(data.list_teacher, function (item) {
                        var temp_arr = {
                            value: item.teacher_id,
                            name: item.first_name
                        };
                        if (item.type_register != undefined) {
                            if (item.type_register == 1) {
                                temp_arr.label = "<span class='e_available'>" + item.teacher_id + '-' + item.first_name + ' ' + item.last_name + "</span>";
                                temp_arr.type_teacher = 'e_available';
                            } else if (item.type_register == 2) {
                                temp_arr.label = "<span class='e_fixed'>" + item.teacher_id + '-' + item.first_name + ' ' + item.last_name + "</span>";
                                temp_arr.type_teacher = 'e_fixed';
                            } else {
                                temp_arr.label = "<span class='e_backup'>" + item.teacher_id + '-' + item.first_name + ' ' + item.last_name + "</span>";
                                temp_arr.type_teacher = 'e_backup';
                            }
                            temp_arr.category = "Register";
                            response_arr.push(temp_arr);
                        } else {
                            temp_arr.label = item.teacher_id + '-' + item.first_name + ' ' + item.last_name;
                            temp_arr.category = "Not Register";
                            temp_not_register.push(temp_arr);
                        }
                    });
                    $.merge(response_arr, temp_not_register);
                }

            }
        });
        $(this).catcomplete({
            minLength: 0,
            source: response_arr,
            change: function (event, ui) {
                var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
                        valid = false;
                $.map(response_arr, function (item) {
                    if (item.name.match(matcher)) {
                        valid = true;
                        return false;
                    }
                });
                if (!valid) {
                    // remove invalid value, as it didn't match anything

                    $(this).val("");

                    return false;
                }
            },
            select: function (event, ui) {
                $(this).val(ui.item.name);
                $(this).attr("type_teacher", ui.item.type_teacher);
                var e_info_teacher = $(this).parents('.e_info_teacher');
                var e_teacher = $(this).parents('.e_teacher');
                e_teacher.find('.e_input_value').val(ui.item.value);
                e_teacher.find('.e_icon_del').show();
                ajax_change_calendar(e_info_teacher);
                return false;
            }
        });

    });
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
//                $(".e_wrap_info_class").mCustomScrollbar({
//                    theme: "dark"
//                });
//                $(".e_wrap_scrollbar").mCustomScrollbar({
//                    theme: "dark"
//                });
                $('.e_wrap_scrollbar').slimScroll({
                });
                $('.e_wrap_info_class').slimScroll({
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
    $('.e_wrap_scrollbar').slimScroll({
    });
    $('.e_wrap_info_class').slimScroll({
    });
//    $(".e_wrap_scrollbar").mCustomScrollbar({
//        theme: "dark"
//    });
//    $(".e_wrap_info_class").mCustomScrollbar({
//        theme: "dark"
//    });

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
        var e_info_teacher = obj.parents('.e_info_teacher');
        var e_teacher = obj.parent('.e_teacher');

        change_status_arrange(obj);//thay đổi trang thái phân lịch

        e_teacher.find('.e_input_value').val('');
        e_teacher.find('.e_input_arrange').val('');
        obj.attr('style', 'display:none');

        ajax_change_calendar(e_info_teacher);
    });
    $(document).on('click', '.e_export_calendar', function (e) {
        e.preventDefault();
        var obj = $(this);
        var url = obj.attr('href');
        var week = $('#i_select_week').val();
        var year = $('#i_select_year').val();
        window.location = url + '?week=' + week + '&year=' + year;
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

function ajax_change_calendar(e_info_teacher) {
    var calendar_id = e_info_teacher.attr('calendarid');
    var teacher_id = e_info_teacher.find('.e_teacher_value').val();
    var assistant_id = e_info_teacher.find('.e_assistant_value').val();
    var url = e_info_teacher.attr("ajax-submit");
    var data = {
        'id': calendar_id,
        'teacher_id': teacher_id,
        'assistant_id': assistant_id
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