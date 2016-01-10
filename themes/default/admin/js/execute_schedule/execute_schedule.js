$(document).ready(function () {
    $.map($(".e_widget_content").find('._e_sum'), function (item) {
        $(item).parents(".e_data_wrap").find('.e_sum').text("Sum: "+$(item).val());
    });
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
        var e_field_info = $(this).parents('.e_wrap_scroll');
        var url_string = $(this).parents('.e_widget_content').attr('data_url');
        var class_backup = $(this).attr("attr");
        var data = {
            'week': $('#i_select_week').val(),
            'year': $('#i_select_year').val(),
            'week_day': $(this).parents('.week_day').find('.e_week_day').val(),
            'hour_id': e_field_info.attr('hour_id'),
            'teacher_type': $('#i_select_teacher_type').val(),
            'class_backup': class_backup
        };
        $.ajax({
            url: url_string,
            dataType: "json",
            type: "post",
            data: data,
            success: function (data) {
                if (data.total_teacher) {
                    console.log(data.register)
                    if (data.register !== undefined) {
                        $.map(data.register, function (item) {
                            var temp_arr = {
                                value: item.teacher_id,
                                name: item.first_name,
                                category: "Register"
                            };
                            if (item.type_register == 2) {
                                temp_arr.label = "<span class='e_available'>" + item.first_name + "</span>";
                                temp_arr.type_teacher = 'e_available';
                            } else if (item.type_register == 4) {
                                temp_arr.label = "<span class='e_fixed'>" + item.first_name + "</span>";
                                temp_arr.type_teacher = 'e_fixed';
                            } else if (item.type_register == 3) {
                                temp_arr.label = "<span class='e_backup'>" + item.first_name + "</span>";
                                temp_arr.type_teacher = 'e_backup';
                            }
                            response_arr.push(temp_arr);
                        });
                    }
                    if (data.not_register !== undefined) {
                        $.map(data.not_register, function (item_not) {
                            var temp_arr_not = {
                                label: item_not.first_name,
                                value: item_not.teacher_id,
                                name: item_not.first_name,
                                category: "Not Register"
                            };
                            temp_not_register.push(temp_arr_not);
                        });
                    }
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
                var e_info_teacher = $(this).parent('.info_class');
                e_info_teacher.find('.e_teacher_id').val(ui.item.value);
                e_info_teacher.find('.e_icon_del').show();
                $('.ui-autocomplete').hide();
                $(this).after('<span title="Giáo viên" class="icon_del e_icon_del" style="margin-left: -8px;">x</span>')
                ajax_change_calendar(e_info_teacher);
                return false;
            }
        });
        $(this).keydown();
    });
//    $(document).on("click", 'input.e_input_arrange', function () {
//        $(this).keypress(13);
//        $(this).keyup();
//    });
    $(".info_class").hover(function () {
        $(this).find(".e_icon_del").show();
    }, function () {
        $(this).find(".e_icon_del").hide();
    });

    $(document).on("click", 'span.e_icon_del', function () {
        var e_info_teacher = $(this).parent('.info_class');
        var teacher_id = e_info_teacher.find('.e_teacher_id').val();
        e_info_teacher.find('.e_teacher_id').val('');
        e_info_teacher.find('.e_teacher_id_deleted').val(teacher_id);
        e_info_teacher.find('.e_input_arrange').val('');
        $(this).attr('style', 'display:none');
        ajax_change_calendar(e_info_teacher);
    });
    $('.e_select_submit').change(function () {
        $('#total_register_filter_form').submit();
    });
    $(document).on('click', '.e_btn_update_calendar_teach_lms', update_calendar_teach_lms);
    $(window).scroll(function () {
        var height_scrollTop = $(window).scrollTop();
        if (height_scrollTop > 150) {
            $('#i_row_data_title').show();
            $('.e_row_data_title').hide();
        } else {
            $('#i_row_data_title').hide();
            $('.e_row_data_title').show();
        }
    });
    $(document).on('click', '.e_add_backup', add_class_backup);
});

function ajax_change_calendar(e_info_teacher) {
    var calendar_id = e_info_teacher.find('.e_id').val();
    var teacher_id = e_info_teacher.find('.e_teacher_id').val();
    var teacher_id_deleted = e_info_teacher.find('.e_teacher_id_deleted').val();
    var teacher_type = $('#i_select_teacher_type').val();
    var url = e_info_teacher.parents(".e_widget_content").attr("ajax-submit");
    if (calendar_id == undefined) {
        var list_teacher_id = '';
        var data = e_info_teacher.parents(".e_data_wrap");
        var backup = data.find('.e_teacher_id_backup');
        backup.each(function(index){
            list_teacher_id += $(this).val()+",";
        });
        var e_week_day = data.parent(".week_day").find('.e_week_day').val();
        var hour_id = data.find('.e_wrap_scroll').attr('hour_id');
    }
    var data = {
        'id': calendar_id,
        'teacher_id': teacher_id,
        'teacher_type': teacher_type,
        'teacher_backup': list_teacher_id,
        'week_day': e_week_day,
        'hour_id': hour_id,
        'week': $('#i_select_week').val(),
        'year': $('#i_select_year').val(),
        'teacher_id_deleted':teacher_id_deleted
    };
    console.log(data);
    $.ajax({
        url: url,
        type: "post",
        data: data,
        dataType: 'json',
        success: function (data) {
            if(data.status === '0'){
                alert(data.msg);
                location.reload();
            }
            console.log(data.msg);
        },
        error: function (a, b, c) {
            alert('Có lỗi xảy ra trong quá trình phân lịch');
//            location.reload();
        }
    });
}
function update_calendar_teach_lms() {
    var obj = $(this);
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
    }
    );
}
function add_class_backup() {
    var obj = $(this);
    obj.before('<div class="item_class"><div class="info_class backup"><span title="Giáo viên" class="icon_del e_icon_del" style="display: none;">x</span><input class="e_input_arrange input_arrange class_backup" type="text" attr="backup" value="">' +
            '<input type="hidden" name="teacher_id" class="e_teacher_id e_teacher_id_backup" value=""><input type="hidden" class="e_teacher_id_deleted" value=""/></div></div>');
}