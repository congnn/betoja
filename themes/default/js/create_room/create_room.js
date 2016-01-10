/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    //Modal moi ban be
    // $(document).on('click', '.e_select_invite', select_invite_popup);
    // $(document).on('click', '.e_select_invite', select_invite_process);
    //Invite member
    $(document).on('click', '#i_btn_invite_member', invite_member_process);

    $(document).on('click', '.e_invite', add_save_invite);
    $(document).on('click', '.e_invite_quick', add_save_invite_quick);
    //Them form upload
    $(document).on('click', '#i_add_form_upload', add_form_upload);

    //Edit room
    $(document).on('click', '.e_edit_room', edit_room);
    //Add agenda
    $(document).on('click', '#i_add_agenda', add_agenda);
    //delete agenda
    $(document).on('click', '#i_delete_agenda', removeRow);
    //select change
    $(document).on('change', '.time_start select', select_time_change);

    //Upload file
    $('.uploader').addClass('span10');

    $(document).on('click', '.btn_upload', uploadFiles);
    //Delete file
    $(document).on('click', '.e_delete_file', delete_file);
// $(document).on('click','.bt_upload', function()
//            {
//
//                $('.fileupload').click();
//                return false;
//            }
//        );
    //Multi steps Smart Wizard
    var check = parseInt($('.e_edit_data').val());
    if (check != 0) {
        var hash = (window.location.hash).replace("#", "");
        var step_init = 0;
        if (hash && hash <= 3 && hash >= 0) {
            step_init = parseInt(hash) - 1;
        }
        $('#wizard').smartWizard({
            selected: step_init,
            enableAllSteps: true,
            onLeaveStep: leaveAStepCallback,
            onShowStep: null,
            onFinish: onFinishCallback,
            autoHeight: true,
        });
        use_timecountdown($('.e_time_count').attr('time'));
        $(".e_datetime_picker").datetimepicker("destroy").datetimepicker();

    } else {
        $('#wizard').smartWizard({
            onLeaveStep: leaveAStepCallback,
            onShowStep: null,
            onFinish: onFinishCallback,
            autoHeight: true,
        });
        $('#i_add_form_upload').click();
    }
    //use_datatable();
    use_datetimepicker();
    autocomplete_select();
    datatable_agenda = $('table.datatable_agenda').dataTable();
    $('table.datatable_agenda').css({'width': '100%'});
    datatable_invite = $('table.datatable_invite').dataTable({
        "bPaginate": false,
        "fnDrawCallback": function (oSettings) {
            var url_quick_invite = $('#i_invite_table').attr('url-invite');
            var url_add_contact = $('#i_invite_table').attr('url-contact');
            var obj_json = new Object();
            obj_json.meetingid = parseInt($('.e_edit_data').val());
            var empty_table = $('.datatable_invite .dataTables_empty');
            var content = '<span>Không có bản ghi nào thỏa mãn</span>' +
                '<a class="btn-empty-data btn-primary e_ajax_link" href="' + url_add_contact + '">Thêm danh bạ</a>' +
                '<a class="btn-empty-data btn-primary e_ajax_link" data=' + JSON.stringify(obj_json) + ' href="' + url_quick_invite + '">Mời nhanh</a>';
            empty_table.html(content);
        }
    });
    //edit searchbox
    var dt_table = $('#step-3 .select_invite .dataTables_filter input[type=text]');
    dt_table.addClass('span10');
    dt_table.attr('placeholder', 'Nhập tên hoặc số điện thoại');
});
//function getfilename(){
//    var fileInput = $(':file');
//
//        $this = $(this);
//        $('.filename').text($this.val());
//        alert('sdfdf');
//
//    }

function autocomplete_select() {
    // Autocomplete
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

    /*$(document).on("click", 'input.e_get_speaker', function () {
     var obj = $(this);
     var data_url = $('.table_agenda').attr("data-speaker");
     var source = [];

     // Lay data
     $.ajax({
     url: data_url,
     dataType: "json",
     success: function (response) {
     $.each(response.list_speaker, function (k, speaker) {
     var speaker_tmp = {
     value: speaker.user_id,
     name: speaker.user_name,
     category: "Lựa chọn",
     label: speaker.user_name
     };
     source.push(speaker_tmp);
     });
     }
     });
     $(this).catcomplete({
     minLength: 0,
     source: source,
     change: function (event, ui) {

     },
     select: function (event, ui) {
     obj.val(ui.item.name);
     return false;
     }
     });
     $(this).keydown();
     });*/
}

function add_agenda(e) {
    e.preventDefault();
    var obj = $(this);
    if ($('.dataTables_empty').length) {
        $('.dataTables_empty').parent().remove();
    }
    addMoreRows();
}

function addMoreRows() {
    var date = new Date();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var y = date.getFullYear();
    rowCount = 0;
    var number_agenda = $('table.datatable_agenda tbody tr');
    rowCount = number_agenda.length;
    rowCount++;
    var recRow = '<tr class="row' + rowCount + '">' +
        '<td><span style="display:none;">' + rowCount + '</span><input required class="e_datetime_picker" name="time[]" type="text" /></td>' +
        '<td><input required class="span12" name="content[]" type="text"/></td>' +
        '<td><input required class="e_get_speaker" name="speaker[]" type="text" /></td>' +
        '<td><a href="javascript:void(0);" id="i_delete_agenda" class="i-remove-own-new"></a></td>' +
        '</tr>';
    $('.table_agenda table tbody').append(recRow);
    $(".e_datetime_picker").datetimepicker("destroy").datetimepicker({
        minDate: new Date('' + y + '/' + m + '/' + d + ''),
        step: 15
    });
    datatable_agenda.fnDestroy();
    datatable_agenda = $('table.datatable_agenda').dataTable({"iDisplayLength": 5});
}

function removeRow() {
    var obj = $(this);
    var td = $(this).parent();
    var tr = td.parent();
    var removeNum = tr.parent().children().index(tr);
    datatable_agenda.fnDeleteRow(removeNum);
}

function add_form_upload() {
    var obj = $(this);
    var list_form = $('.list_form_upload');
    var url = obj.attr('data-url');
    var number_form = $('.list_form_upload form').size();
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
            number: number_form
        },
        success: function (data) {
            list_form.append(data.content_form);
            obj.css('display', 'none');
        },
        error: function (a, b, c) {
            alert(a + b + c);
        },
        complete: function (jqXHR, textStatus) {

        }
    });
}

function edit_room() {
    var step_create = $('.anchor a[href=#step-1]');
    step_create.click();
}

function save_form_add_create_room_response(data) {
    var jgrow = "error";
    if (data.state == 1) {
        jgrow = "success";
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

function save_form_edit_create_room_response(data) {
    var jgrow = "error";
    if (data.state == 1) {
        jgrow = "success";
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

function default_response(data) {
    var jgrow = "error";
    if (data.state == 1) {
        jgrow = "success";
    }
    if (data.msg == '<p>The filetype you are attempting to upload is not allowed.</p>') {
        $('.progressbar').css({'width': '0'});
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

function addsave_agenda_response(data, form, btn) {
    default_response(data);
    form.parents(".modal_content").modal("hide");
    var agenda_data = $('#agenda_data');
    var agenda_data_old = agenda_data.html();
    var agenda_data_new = '';
    if (!$.trim(agenda_data_old)) {
        agenda_data_new = JSON.stringify(data.data_response);
    } else {
        agenda_data_new = agenda_data_old + ';' + JSON.stringify(data.data_response);
    }
    agenda_data.html(agenda_data_new);
    create_table_agenda(agenda_data_new, true);
}

function create_table_agenda(agenda_data, using_datatable) {
    var table = $('.table_agenda');
    var data = agenda_data.split(';');
    var html = '<table>';
    html += '<thead>';
    html += '<tr>';
    html += '<td>Time</td>';
    html += '<td>Content</td>';
    html += '<td>Speaker</td>';
    html += '</tr>';
    html += '</thead>';
    $.each(data, function (index, element) {
        var row_data = jQuery.parseJSON(element);
        html += '<tr>';
        html += '<td>' + row_data.agenda_time + '</td>';
        html += '<td>' + row_data.agenda_content + '</td>';
        html += '<td>' + row_data.agenda_speaker_name + '</td>';
        html += '</tr>';
    });
    html += '</table>';
    table.html(html);
    $('.table_agenda table').addClass('table');
    $('.table_agenda table').addClass('use_datatable');
    if (using_datatable == true) {
        $('.table_agenda table').dataTable();
    }
}

function leaveAStepCallback(obj) {
    var step_num = obj.attr('rel'); // get the current step number
    return validateSteps(step_num);
}

// Your Step validation logic
function validateSteps(stepnumber) {
    var isStepValid = true;
    var label_step = $('#wizard ul li a[rel=' + stepnumber + '] .stepNumber').html();
    // validate step 1
    if (stepnumber == 1) {
        if (validateStep1() == false) {
            isStepValid = false;
//            $('#wizard').smartWizard('showMessage', 'Có lỗi khi "' + label_step + '"');
            $('#wizard').smartWizard('setError', {stepnum: stepnumber, iserror: true});
        } else {
            //Ko co loi, luu thong tin tao phong
            isStepValid = add_save_subject();
            if (isStepValid) {
                $('.done_step_1').css('display', 'block');
                $('#wizard').smartWizard('setError', {stepnum: stepnumber, iserror: false});
//                setTimeout(function(){
//                    if($('.buttonFinish').hasClass('buttonDisabled')){
//                        $('.buttonFinish').removeClass('buttonDisabled');
//                    }
//                }, 1000);
            } else {
//                $('#wizard').smartWizard('showMessage', 'Có lỗi khi lưu thông tin tạo phòng');
                $('#wizard').smartWizard('setError', {stepnum: stepnumber, iserror: true});
            }
        }
    }
    // validate step 2
    if (stepnumber == 2) {
        if (validateStep2() == false) {
            isStepValid = false;
//            $('#wizard').smartWizard('showMessage', 'Có lỗi khi "' + label_step + '"');
            $('#wizard').smartWizard('setError', {stepnum: stepnumber, iserror: true});
        } else {
            $('.done_step_2').css('display', 'block');
            $('#wizard').smartWizard('setError', {stepnum: stepnumber, iserror: false});
//            setTimeout(function(){
//                if($('.buttonFinish').hasClass('buttonDisabled')){
//                    $('.buttonFinish').removeClass('buttonDisabled');
//                }
//            }, 1000);
        }
    }
    // validate step 3
    if (stepnumber == 3) {
        $('#i_btn_invite_member').click();
        if (validateStep3() == false) {
            isStepValid = false;
//            $('#wizard').smartWizard('showMessage', 'Có lỗi khi "' + label_step + '"');
            $('#wizard').smartWizard('setError', {stepnum: stepnumber, iserror: true});
        } else {
            $('#wizard').smartWizard('setError', {stepnum: stepnumber, iserror: false});
            $('.done_step_3').css('display', 'block');
            setTimeout(function () {
                if ($('.buttonFinish').hasClass('buttonDisabled')) {
                    $('.buttonFinish').removeClass('buttonDisabled');
                }
            }, 3000);

        }
    }
    // validate step 4
    if (stepnumber == 4) {
        $('.done_step_4').css('display', 'block');
    }
    return isStepValid;
}

function get_room_info() {
    var meetingId = $('.e_edit_data').val();
    var url = $('.info_conference').attr('data-url');
    $.ajax({
        type: "POST",
        url: url,
        data: {
            meetingId: meetingId,
        },
        dataType: "json",
        success: function (data) {
            if (data.state == 1) {
                $('#i_meeting_info').html(data.content);
            }
        },
        error: function (a, b, c) {
            alert(a + b + c);
        },
        complete: function (jqXHR, textStatus) {

        }
    });
}

function add_save_subject() {
    var form = $('#i_form_create_room');
    var url = form.attr('action');
    var success = false;
    form.ajaxSubmit({
        type: "POST",
        url: url,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.state == 1) {
                success = true;
                //count down
                use_timecountdown(data.time_count_down);
                $('.msgBox').remove();
                $('.e_edit_data').val(data.record.id);
                $('#i_add_agenda').attr('data', '{"meetingid":"' + data.record.id + '"}');
            }
            if (window[data.callback]) {
                console.log("Gọi hàm: ", data.callback);
                window[data.callback](data);
            }
        },
        error: function (a, b, c) {

        },
        complete: function (jqXHR, textStatus) {

        }
    });
    return success;
}

function validateStep1() {
    var isValid = true;
    //validate...
    var data_input = ['name', 'timestart', 'timeend', 'daystart', 'dayend'];
    $.each(data_input, function (index, value) {
        var obj = $('input[name=' + data_input[index] + ']');
        if (obj.val() == '') {
            isValid = false;
            if (data_input[index] == 'timestart' || data_input[index] == 'timeend') {
                var select = obj.parent().find('select.hour');
                select.css({'border': '1px solid #E9322D'});
            } else {
                obj.focus();
            }
        }
        return isValid;
    });
    var hour_start = $('input[name=timestart]').val();
    var hour_end = $('input[name=timeend]').val();

    var day_start = Date.parse($('.e_datetime_from').val());
    var day_end = Date.parse($('.e_datetime_to').val());
    if (day_start > day_end) {
        isValid = false;
        alert('Thời gian kết thúc phải lớn hơn thời gian bắt đầu !');
        return isValid;
    }
    if (day_start == day_end) {
        var item_hour_start = hour_start.split(':');
        var time_start_int = item_hour_start[0] * 60 * 60 + item_hour_start[1] * 60;
        var item_hour_end = hour_end.split(':');
        var time_end_int = item_hour_end[0] * 60 * 60 + item_hour_end[1] * 60;
        if ((time_end_int - time_start_int) <= 0) {
            isValid = false;
            alert('Thời gian kết thúc phải lớn hơn thời gian bắt đầu !');
        }
    }

    return isValid;
}

function validateStep2() {
    var isValid = true;
    //validate...
    return isValid;
}

function validateStep3() {

    var isValid = true;
    //validate...
    return isValid;
}

function validateAllSteps() {
    var isStepValid = true;
    if (validateStep1() == false) {
        isStepValid = false;
        $('#wizard').smartWizard('setError', {stepnum: 1, iserror: true});
    } else {
        $('#wizard').smartWizard('setError', {stepnum: 1, iserror: false});
    }
    if (validateStep2() == false) {
        isStepValid = false;
        $('#wizard').smartWizard('setError', {stepnum: 2, iserror: true});
    } else {
        $('#wizard').smartWizard('setError', {stepnum: 2, iserror: false});
    }
    if (validateStep3() == false) {
        isStepValid = false;
        $('#wizard').smartWizard('setError', {stepnum: 3, iserror: true});
    } else {
        $('#wizard').smartWizard('setError', {stepnum: 3, iserror: false});
    }
    if (!isStepValid) {
        // $('#wizard').smartWizard('showMessage', 'Please correct the errors in the steps and continue');
    }
    return isStepValid;
}

function onFinishCallback() {
    if (validateAllSteps()) {
        window.location.assign($('#wizard').attr('home'));
    }
}

function select_time_change() {
    var obj = $(this);
    if (obj.val() == '') {
        obj.css({"border": "1px solid #E9322D"});
        obj.next('label.error').remove();
    } else {
        obj.css({"border": "1px solid #A6E0B0"});
    }
}

function use_timecountdown(time_count) {
    var count_down = $('.e_time_count');
    if (count_down.hasClass('is-countdown')) {
        count_down.removeClass('is-countdown');
    }
    count_down.countdown({
        until: +time_count,
        onTick: update_time,
        onExpiry: countdown_complete
    });
}

function update_time(periods) {
    $(this).attr('time', $.countdown.periodsToSeconds(periods));
}

function countdown_complete() {

}

function use_datetimepicker() {
    var date = new Date();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var y = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var is_edit = parseInt($(".e_edit_data").val());
    //Xu ly ngay thang default khi tao moi
    if (is_edit == 0) {
        var minutes = min + 15;
        if (minutes > 59) {
            hour++;
            minutes = minutes - 60;
        }
        if (hour > 23) {
            d++;
            hour = hour - 24;
        }
        var dayinmoth = daysInMonth(m, y);
        if (d > dayinmoth) {
            m++;
            d = d - dayinmoth;
        }
        if (m > 12) {
            y++;
        }
    }
    $(".e_datetime_from").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        numberOfMonths: 1,
        minDate: new Date('' + y + '/' + m + '/' + d + ''),
        onClose: function (selectedDate) {
            $(".e_datetime_to").datepicker("option", "minDate", selectedDate);
        }
    });//cam giao dien kieu date time cho the thoi gian
    $(".e_datetime_to").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function (selectedDate) {
            $(".e_datetime_from").datepicker("option", "maxDate", selectedDate);
        }
    });//cam giao dien kieu date time cho the thoi gian

    var time_picker = $('.e_timepicker');
    time_picker.combodate({
        firstItem: 'none', //show 'hour' and 'minute' string at first item of dropdown
        minuteStep: 1,
    });
    if (is_edit == 0) {
        $("input[name=timestart]").val(hour + ":" + minutes);
        $("input[name=timeend]").val((hour + 1) + ":" + minutes);

        $(".start_time select.hour").val(hour);
        $(".start_time select.minute").val(minutes);
        $(".e_datetime_from").val(y + '-' + m + '-' + d);
        if (hour + 1 > 23) {
            d += 1;
            hour = hour - 24;
            var dayinmoth = daysInMonth(m, y);
            if (d > dayinmoth) {
                m++;
                d = d - dayinmoth;
            }
            if (m > 12) {
                y++;
            }
        }
        $(".end_time select.hour").val(hour + 1);
        $(".end_time select.minute").val(minutes);
        $(".e_datetime_to").val(y + '-' + m + '-' + d);
    }
    $('.combodate select').select2();

    $(".uniform").find("[type='datetimepicker']").datetimepicker();
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function use_datatable() {
    $("table.use_datatable").dataTable({
        "bFilter": true,
        "iDisplayLength": 5,
    });

}

function uploadFiles(e) {
    e.preventDefault();
    var obj = $(this);
    var form = obj.parent();
    var file = form.find('input[type=file]').val();
    if (file == '') {
        alert('Bạn chưa chọn file !');
        return false;
    }
    var url = form.attr('action');
    var meetingid = $('.e_edit_data').val();
    var number_form = $('.list_form_upload form').size();
    form.ajaxSubmit({
        xhr: function ()
        {
            var xhr = new window.XMLHttpRequest();
            //Upload progress
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    //Do something with upload progress
                    form.find('.progressbar').css({'width': percentComplete * 100 + '%'});
                    console.log(percentComplete);
                }
            }, false);
            //Download progress
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    //Do something with download progress
                    console.log(percentComplete);
                }
            }, false);
            return xhr;
        },
        type: "POST",
        url: url,
        dataType: "json",
        data: {
            meetingid: meetingid,
            number: number_form,
        },
        success: function (data) {

            if (data.state == 1) {
                $('.uploader').addClass('uploaded');
                //  $('#i_add_form_upload').css('display', 'block');

                $('.progressbar').html(data.file_name);
                $('.progressbar').attr('disable', 'disabled');
                $('.show_filename_css').html('');
                var a_delete = form.find('a.e_delete_file');
                a_delete.css('display', 'inline');
                a_delete.attr('fileid', data.file_id);
                a_delete.attr('filename', data.file_path);
                a_delete.attr('foldername', data.folder_name);
                obj.removeClass('btn_upload');
                obj.attr('disabled', 'disabled');
                obj.css({'display': 'none'});
            }
            if (window[data.callback]) {
                console.log("Gọi hàm: ", data.callback);
                window[data.callback](data);
            }
        },
        error: function (a, b, c) {
            $('.progressbar').css({'width': '0'});
            alert('Có lỗi khi tải file !');
        },
        complete: function (jqXHR, textStatus) {

        }
    });
}

function delete_file() {
    var obj = $(this);
    var form = obj.parent();
    var url = obj.attr('data-url');
    var fileid = obj.attr('fileid');
    var file_name = obj.attr('foldername') + '/' + obj.attr('filename');
    $("<div title='Bạn chắc chắn?'>").html("Dữ liệu không thể khôi phục sau khi làm thao tác này, bạn chắc chắn sẽ làm điều này chứ?").dialog({
        resizable: false,
        height: 180,
        modal: true,
        buttons: {
            "Chắc chắn": function () {
                $(this).dialog("destroy");
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: {
                        file_id: fileid,
                        file_name: file_name,
                    },
                    success: function (data) {
                        if (data.state == 1) {
                            form.remove();
                        }
                        if (window[data.callback]) {
                            console.log("Gọi hàm: ", data.callback);
                            window[data.callback](data);
                        }
                    },
                    error: function (a, b, c) {
                        alert(a + b + c);
                    },
                    complete: function (jqXHR, textStatus) {

                    }
                });
            },
            "Thôi": function () {
                $(this).dialog("destroy");
            }
        },
        close: function () {
            $(this).dialog("destroy");
        }
    });
}

function invite_member_process() {
      var data=[];
      var list_checkbox = $('.e_select_invite');
      $.each(list_checkbox, function (index, element) {
            var disabled = $(this).attr('disabled');
            if ($(this).is(":checked") && (typeof disabled == 'undefined')) {
                data.push($(this).val());
            }
        });
        if(data.length>0){
              var obj = $(this);
            $("<div title='Mời người tham gia'>").html("Mời các thành viên đã lựa chọn ?").dialog({
                resizable: false,
                height: 180,
                modal: true,
                buttons: {
                    "Mời": function () {
                        ajax_invite_member(obj);
                        $(this).dialog("destroy");
                    },
                    "Thôi": function () {
                        $(this).dialog("destroy");
                        get_room_info();
                    }
                },
                close: function () {
                    $(this).dialog("destroy");
                    get_room_info();
                }
            });
        }
}

function ajax_invite_member(obj) {
    var url = obj.attr('data-url');
    var data = [];
    var meetingid = $('.e_edit_data').val();
    var list_checkbox = $('.e_select_invite');
    $.each(list_checkbox, function (index, element) {
        var disabled = $(this).attr('disabled');
        if ($(this).is(":checked") && (typeof disabled == 'undefined')) {
            data.push($(this).val());
        }
    });
    $.ajax({
        type: "POST",
        url: url,
        data: {
            meeting_id: meetingid,
            list_member: data,
        },
        dataType: "json",
        success: function (data) {
            if (data.state == 1) {
                $.each(list_checkbox, function (index, element) {
                    if ($(this).is(":checked")) {
                        $(this).attr('disabled', 'disabled');
                    }
                });
                $('#i_btn_invite_member').addClass('no_selected');
            } else {
                $.each(list_checkbox, function (index, element) {
                    if ($(this).is(":checked")) {
                        $(this).attr('checked', false);
                    }
                });
            }
            default_response(data);
        },
        error: function (a, b, c) {
            alert(a + b + c);
        },
        complete: function (jqXHR, textStatus) {
            get_room_info();
        }
    });
}

function select_invite_process() {
    var btn_invite = $('#i_btn_invite_member');
    var obj = $(this);
    var checked = false;
    var list_checkbox = $('.e_select_invite');
    $.each(list_checkbox, function (index, element) {
        var disabled = $(this).attr('disabled');
        if ($(this).is(":checked") && (typeof disabled == 'undefined')) {
            checked = true;
        }
    });
    if (checked) {
        btn_invite.removeClass('no_selected');
    } else {
        btn_invite.addClass('no_selected');
    }
}

function select_invite_popup() {
    var obj = $(this);
    var url = obj.attr('data-url');
    var cid = obj.attr('cid');
    if (obj.is(":checked")) {
        $.ajax({
            type: "POST",
            url: url,
            data: {
                cid: cid,
            },
            dataType: "json",
            success: function (data) {
                if (data.state == 1) {
                    use_modal(data.content);
                } else {
                    default_response(data);
                }
            },
            error: function (a, b, c) {
                alert(a + b + c);
            },
            complete: function (jqXHR, textStatus) {

            }
        });
    }
}

function add_save_invite(e) {
    e.preventDefault();
    var obj = $(this);
    var form = $('.e_ajax_submit_invite');
    var url = form.attr('action');
    var meeting_id = $('.e_edit_data').val();
    form.ajaxSubmit({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
            meetingid: meeting_id,
        },
        success: function (data) {
            if (data.state == 1) {
                form.parents(".modal_content").modal("hide");
                $('tr[cemail="' + data.contact_email + '"]').fadeOut('highlight');
                $('tr[cemail="' + data.contact_email + '"]').remove();
//                datatable_invite.fnDestroy();
//                datatable_invite_use();
            }
            if (window[data.callback]) {
                console.log("Gọi hàm: ", data.callback);
                window[data.callback](data);
            }
        },
        error: function (a, b, c) {
            alert(a + b + c);
        },
        complete: function (jqXHR, textStatus) {

        }
    });
}

function add_save_invite_quick(e) {
    e.preventDefault();
    var obj = $(this);
    var form = $('.e_ajax_submit_invite_quick');
    var url = form.attr('action');
    // var meeting_id = $('.e_edit_data').val();
    var name = $('input[name=contact_name]');
    var email = $('input[name=contact_email]');
    if (name.val() == '') {
        alert("Họ tên không được để trống !");
        name.focus();
        return false;
    }
    if (email.val() == '') {
        alert("Email không được để trống !");
        email.focus();
        return false;
    }
    form.ajaxSubmit({
        type: "POST",
        url: url,
        dataType: "json",
        // data: {
        //     meetingid: meeting_id,
        // },
        success: function (data) {
            if (data.state == 1) {
                form.parents(".modal_content").modal("hide");
            }
            if (window[data.callback]) {
                console.log("Gọi hàm: ", data.callback);
                window[data.callback](data);
            }
        },
        error: function (a, b, c) {
            alert(a + b + c);
        },
        complete: function (jqXHR, textStatus) {

        }
    });
}

function use_modal(content) {
    var $modal = $("<div class='modal fade out modal_content'>");
    $modal.html(content);
    $modal.modal();
}



