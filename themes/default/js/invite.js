$(document).ready(function () {
    $("body").addClass("iframe-content");
    //Quick invite
    $(document).on("click", "#invite_content .e_invite_this", toggleSelect);
    //search
    $(document).on("change", "#invite_content .e_search", change_search);
    //Invite bình thường
    $(document).on("click", "#invite_content .e_confirm:not(.e_close)", invite);
    //Close popup
    $(document).on("click", "#invite_content .e_close", close_popup);


    $(document).on('click', '.e_invite_quick', add_save_invite_quick);

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
            success: function (data) {
                var temp = $("<div>").html(data.msg);
                alert(temp.text());
                if (data.state == 1) {
                    form.parents(".modal_content").modal("hide");
                }
            },
            error: function (a, b, c) {
                alert(a + b + c);
            },
            complete: function (jqXHR, textStatus) {

            }
        });
    }

    function invite() {
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
                }
            },
            close: function () {
                $(this).dialog("destroy");
            }
        });
    }

    function ajax_invite_member(obj) {
        var url = obj.data('url');
        var meetingid = obj.data('meetingid');
        var dataId = [];
        var dataEmail = [];

        $("#invite_content .content .list_user .list_item").each(function () {
            var inviteButton = $(this).find(".e_invite_this");
            if (inviteButton.hasClass("selected")) {
                dataId.push(inviteButton.parents(".list_item").data("userid"));
                dataEmail.push(inviteButton.parents(".list_item").data("useremail"));
            }
        });
        $.ajax({
            type: "POST",
            url: url,
            data: {
                meeting_id: meetingid,
                list_member: dataEmail,
                list_member_id: dataId
            },
            dataType: "json",
            success: function (data) {
                if (data.state == 0) {
                    alert(data.msg);
                } else {
                    alert(data.msg);
                    close_popup();
                }
            },
            error: function (a, b, c) {
                alert(a + b + c);
            }
        });
    }

    function close_popup() {
        parent.postMessage({
            event: 'close-modal',
            data: ''
        }, "*");
    }


    function change_search(e) {
        var search = $(this).val().toLowerCase();
        if (search.length == 0) {
            $("#invite_content .content .list_user .list_item").show();
        }
        $("#invite_content .content .list_user .list_item").each(function () {
            var name = $(this).find(".list_col.name").html().toLowerCase();
            var email = $(this).find(".list_col.email").html().toLowerCase();
            if (name.indexOf(search) > -1) {
                $(this).show();
            } else if (email.indexOf(search) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }


        });
    }

    function toggleSelect(e) {
        $(this).toggleClass("selected");
        if ($(this).hasClass("selected")) {
            $(this).html("");
        } else {
            $(this).html("Mời");
        }
        if ($("#invite_content .e_invite_this.selected").length) {
            $("#invite_content .e_confirm").html("Mời vào họp");
            $("#invite_content .e_confirm").removeClass("e_close");
        } else {
            $("#invite_content .e_confirm").html("Hủy");
            $("#invite_content .e_confirm").addClass("e_close");
        }
    }

});