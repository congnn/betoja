function get_form_edit_response_teacher_type(data, obj) {
    if (data.state != "1") {
        $.jGrowl("<i class='icon16 i-checkmark-3'></i> " + data.msg, {
            group: "error",
            position: 'top-right',
            sticky: false,
            closeTemplate: '<i class="icon16 i-close-2"></i>',
            animateOpen: {
                width: 'show',
                height: 'show'
            }
        });
    } else {
        if (!data.record_data) {
            $.jGrowl("<i class='icon16 i-checkmark-3'></i> Id không tồn tại", {
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
        if (data.html) {
            var $modal = $("<div class='modal fade out modal_content'>");
            $modal.html(data.html);
            for (var key in data.record_data) {
                var tempSelector = creat_input_selector("[name='" + key + "']");
                var inputObj = $modal.find(tempSelector);
                if (inputObj.attr("type") == "checkbox") {
                    inputObj.prop("checked", data.record_data[key] == 1 ? true : false);
                } else if (inputObj.prop("type") === "select-multiple") {
                    $.each(data.record_data[key].split(","), function (i, e) {
                        inputObj.find("option[value='" + e + "']").prop("selected", true);
                    });
                    
                } else {
                    inputObj.val(data.record_data[key]);
                }
            }
            $modal.find("button:not(.b_edit)").remove();
            $modal.modal();
        }
    }
}

