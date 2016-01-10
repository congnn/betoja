<div class="navbar-inner">
    <div class="container-fluid">
        <a class="brand" href="<?php  echo site_url();  ?>">
            <img src="<?php // echo $logo;  ?>" alt="Manager - Betoja" style="">
        </a>
        <div class="nav-no-collapse">
            <div class="pull-right">
                <?php if (!$this->session->userdata('id')) { ?>
                    <strong>Login as: </strong>Guest
                <?php } ?>
            </div>
            <ul class="nav pull-right">
                            <li class="dropdown user">
                                <a href="#" class="dropdown-toggle avatar" data-toggle="dropdown">
                                    <?php if ($this->session->userdata('id')) { ?>
                                        <img src="<?php echo $avatar; ?>" alt="avatar">
                                    <?php } ?>
                                      </a>
                                   <span class='user-name'><?php echo $this->session->userdata('userName') ?></span>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="<?php echo $changer_info_url  ?>" class="e_ajax_link">
                                            <i class="icon16 i-user-cus"></i>
                                            Profile</a>
                                    </li>
                                    <li>
                                        <a href="<?php  echo $logout_url;  ?>" class="">
                                            <i class="icon16 i-exit-cus"></i>
                                            Logout</a>
                                    </li>
                                </ul>
                            </li>
            </ul>
        </div>
    </div>
</div>