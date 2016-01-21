<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">
        <title>Betoja</title>
        <link href="<?php echo base_url();?>lib/bootstrap/css/normalize.css" rel="stylesheet" type="text/css"/>
        <link href="<?php echo base_url();?>lib/fontawesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link href="<?php echo base_url();?>lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="<?php echo base_url();?>lib/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/>
        <link href="<?php echo base_url();?>css/style.css" rel="stylesheet" type="text/css"/>
        <script src="<?php echo base_url();?>lib/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url();?>lib/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url();?>js/home.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="wraper">
            <div id="header-content" class="header">
               
                <nav class="navbar ows-nav-bar no-padding no-margin">
                    <div class="container-fluid max-width">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle betoja-nav-button" data-toggle="collapse" data-target="#myNavbar">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand no-padding logo-contain visible-xs-block" style="font-weight:bold;font-size:32px;margin-top:15px"> href="<?php echo base_url(); ?>">
                                BETOJA<!-- <img src="images/logo_big_betoja.png" alt="Betoja logo"/> -->
                            </a>
                            <a class="navbar-brand no-padding logo-contain hidden-xs" style="font-weight:bold;font-size:32px;margin-top:15px" href="<?php echo base_url(); ?>">
                              BETOJA <!--   <img src="images/logo_betoja.png" alt="Betoja logo"/>-->
                            </a>
                        </div>
                        <div class="collapse navbar-collapse" id="myNavbar">
                            <ul class="nav navbar-nav navbar-right head menu">
                                <li><a href="<?php echo base_url();?>home" class='<?php if(PAGE=="Home")echo "active"; ?>'>Home</a></li>
                                <li><a href="<?php echo base_url();?>truong" class='<?php if(PAGE=="Truong")echo "active"; ?>'>Trường</a></li>
                                <li ><a href="<?php echo base_url();?>gioithieu" class='<?php if(PAGE=="Gioithieu")echo "active"; ?>'>Giới thiệu</a></li>
                                <li><a href="<?php echo base_url();?>lienhe" class='<?php if(PAGE=="Lienhe")echo "active"; ?>'>Liên hệ</a></li>   
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <script type="text/javascript">
              function active_menu(obj){
                 var list_menu_item=$('#myNavbar a');
                 $.each(list_menu_item,function(){
                     $(this).removeClass('active');
                 });
                  obj.classList.add("active");
              }
            </script>