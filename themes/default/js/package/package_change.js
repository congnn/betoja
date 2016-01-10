$(document).ready(function() {
 $('#wizard').smartWizard({
            onLeaveStep: leaveAStepCallback,
            onShowStep: null,
            onFinish: onFinishCallback,
            autoHeight: true,
        });
});

//
//$(document).ready(function() {
//$('#wizard').smartWizard({
//onShowStep:OnShowStepCallback,
//});
//});
//
//function OnShowStepCallback(obj){
//$('#wizard').smartWizard('setError',{stepnum:obj.stepnumber,iserror:true});
//}
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
          
            if (isStepValid) {
                 $('.done_step_1').css('display','block');
                $('#wizard').smartWizard('setError', {stepnum: stepnumber, iserror: false});
                setTimeout(function(){
                    if($('.buttonFinish').hasClass('buttonDisabled')){
                        $('.buttonFinish').removeClass('buttonDisabled');
                    }
                }, 1000);
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
             $('.done_step_2').css('display','block');
            $('#wizard').smartWizard('setError', {stepnum: stepnumber, iserror: false});
            setTimeout(function(){
                if($('.buttonFinish').hasClass('buttonDisabled')){
                    $('.buttonFinish').removeClass('buttonDisabled');
                }
            }, 1000);
        }
    }
    // validate step 3
    if (stepnumber == 3) {
        $('.done_step_3').css('display','block');
    }
  
    return isStepValid;
}
function calculate_package_step1(){
      var form = $('#change_package');
      var url = form.attr('action');
     
      var success = false;
    form.ajaxSubmit({
        type: "POST",
        url: url,
        dataType: "html",
        async: false,
        success: function (data) {
            if (data) {
               success = true;
               $(".form-step2").html(data);
                //count down
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
    return calculate_package_step1();
}

function validateStep2() {
  return true;
     
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
   
    if (!isStepValid) {
        // $('#wizard').smartWizard('showMessage', 'Please correct the errors in the steps and continue');
    }
    return isStepValid;
}

function onFinishCallback() {
    var form = $('#change_package_confirm');
    var url = form.attr('action');
     alert(url);
    var success = false;
    form.ajaxSubmit({
        type: "POST",
        url: url,
        dataType: "html",
        async: false,
        success: function (data) {
            if (data) {

                alert(data);
                success = true;
                //count down
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
    
//    if (validateAllSteps()) {
//        window.location.assign($('#wizard').attr('home'));
//        
//    }
    return success;
}
