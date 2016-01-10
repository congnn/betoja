<div class="container-fluid">
    <div id="login">
        <div class="login-wrapper" data-active="log"> 
            <a class="brand" href="<?php echo site_url(); ?>">
                <!--<img src="<?php echo $this->path_static_file; ?>images/betoja.png" alt="Betoja Manager">-->
            </a>
            <div id="log">
                <div class="page-header">
                    <h3 class="center">Đăng nhập - Betoja</h3>
                </div>
                <form id="login-form" class="form-horizontal e_ajax_submit" action="<?php echo $login_url; ?>">
                    <div class="row-fluid">
                        <div class="control-group">
                            <div class="controls-row">
                                <div class="icon"><i class="icon20 i-user"></i></div>
                                <input class="span12 valid_item" name="admin_email" id="admin_email" placeholder="<?php echo $form["field_form"]["user_name"]; ?>" <?php echo $this->account->get_display_rule($form["rule"]["user_name"]); ?> />
                                <label class="error"></label>
                            </div>
                        </div>
                        <!-- End .control-group -->
                        <div class="control-group">
                            <div class="controls-row">
                                <div class="icon"><i class="icon20 i-key"></i></div>
                                <input class="span12 valid_item" type=password name="admin_password" id="admin_password" placeholder="<?php echo $form["field_form"]["user_password"]; ?>" <?php echo $this->account->get_display_rule($form["rule"]["user_password"]); ?> />
                                <label class="error"></label>
                            </div>
                        </div>
                        <!-- End .control-group -->
                        <div class="form-actions full">
                            <label class="checkbox pull-left hidden">
                                <input type="checkbox" value="1" name="remember">
                                <span class="pad-left5">Ghi nhớ ?</span>
                            </label>
                            <button id="loginBtn" type="submit" class="btn btn-primary pull-right span5">Đăng nhập</button>
                        </div>
                    </div>
                    <!-- End .row-fluid -->
                </form>
            </div>
            <div id="forgot">
                <div class="page-header">
                    <h3 class="center">Quên mật khẩu</h3>
                </div>
                <form class="form-horizontal" action="<?php echo $recover_url; ?>">
                    <div class="row-fluid">
                        <div class="control-group">
                            <div class="controls-row">
                                <div class="icon"><i class="icon20 i-envelop-2"></i></div>
                                <input class="span12" type="text" name="email" id="email-field" placeholder="Email">
                            </div>
                        </div>
                        <!-- End .control-group -->
                        <div class="form-actions full">
                            <button type="submit" class="btn btn-large btn-block btn-success">Lấy lại mật khẩu</button>
                        </div>
                    </div>
                    <!-- End .row-fluid -->
                </form>
            </div>
        </div>
        <div id="bar" data-active="log">
            <div class="btn-group btn-group-vertical"> 
                <a id="log" href="#" class="btn tipR" title="Đăng nhập"><i class="icon16 i-key"></i></a> 
                <a id="forgot" href="#" class="btn tipR" title="Quên mật khẩu"><i class="icon16 i-question"></i></a> 
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
</div>