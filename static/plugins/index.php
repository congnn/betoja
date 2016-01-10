<?php if(isset($banner_main[0])){ ?>
<div class=" cover overlay cover-image-full home">
    <img class="parallax-layer" src="<?php echo base_url().$banner_main[0]['image'];?>" alt="<?php echo $banner_main[0]['name']; ?>" />
    <div class="parallax-layer overlay overlay-full overlay-bg-white bg-transparent" data-speed="8" data-opacity="true" style"position:absolute;top:0;left:0;">
        <div style="text-align: center; padding-top: 80px;">
           <div class="page-section overlay-bg-white-strong relative paper-shadow" data-z="1">
              <h1 class=" margin-v-0-15 display-inline-block" style="color:white;">Khoá học nào sẽ giúp ích cho bạn?</h1>
              <p class="text-subhead">Học hỏi những kỹ năng mới trực tuyến để làm chủ tương lai của bạn</p>
             <form action="#" class="form  pos-r fxac mb50">
				<input type="hidden" name="ref" value="home">
				<input type="hidden" name="src" value="ukw">
				<div class="search-inp-container ud-search fx">
					<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="search" name="q" class="search-field form-control quick-search ui-autocomplete-input" placeholder="Tìm một khóa học cho bạn..." autocomplete="off">
				</div>
				<button type="submit" class="home-search-btn">
					<i class="icon-search"></i>
				</button>
			</form> 
              <style type="text/css" media="screen">
			  .home{
				  height: 560px !important;
			  }
                ul.features {
                  list-style: none;
                  margin: 0;
                  padding: 0;
                }
                .features li {
                    max-width: 180px;
                    display: inline;
                }
                .fxac {
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    width: 100%;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    -ms-flex-align: center;
                    align-items: center;
                }
                .features {
                    margin-top: 40px !important;
                    font-size: 18px;
                    text-align: left;
                }
                .features i {
                   font-size: 20px;
                }
              </style>
              <ul class="features">
                  <li class="fxac">
                      <i class="fa fa-users"></i>
                      <span class="desc">1000 học viên</span>
                  </li>
                  <li class="fxac">
                      <i class="fa fa-rocket"></i>
                      <span class="desc">10 khoá học thực tiễn</span>
                  </li>
                  <li class="fxac">
                      <i class="fa fa-mobile"></i>
                      <span class="desc">Học trên mọi thiết bị</span>
                  </li>
              </ul>

           </div>
        </div>
    </div>
</div>
<?php } ?>

<div class="page-section">

    <div class="container">
        <div class="row" data-toggle="isotope">
            <?php if(isset($banner_1[0])){ ?>
            <div class="item col-xs-12 col-sm-6 col-lg-6">
                <a href="<?php if(!empty($banner_1[0]['link'])) echo $banner_1[0]['link']; else echo 'javascript:void(0);'; ?>" <?php echo $banner_1[0]['name']; ?>>
                 <img src="<?php echo base_url().$banner_1[0]['image'];?>" alt="<?php echo $banner_1[0]['name']; ?>" class="cover-image-full hover width-100pc">
                </a>
            </div>
            <?php } ?>

            <?php if(isset($banner_2[0])){ ?>
            <div class="item col-xs-12 col-sm-6 col-lg-6">
              <a href="<?php if(!empty($banner_2[0]['link'])) echo $banner_2[0]['link']; else echo 'javascript:void(0);'; ?>" <?php echo $banner_2[0]['name']; ?>>
                 <img src="<?php echo base_url().$banner_2[0]['image'];?>" alt="<?php echo $banner_2[0]['name']; ?>" class="cover-image-full hover width-100pc">
              </a>

              <?php if(isset($banner_2[1])){ ?>
              <a href="<?php if(!empty($banner_2[1]['link'])) echo $banner_2[1]['link']; else echo 'javascript:void(0);'; ?>" <?php echo $banner_2[1]['name']; ?>>
                 <img src="<?php echo base_url().$banner_2[1]['image'];?>" alt="<?php echo $banner_2[1]['name']; ?>" class="cover-image-full hover width-100pc padding-top-15">
              </a>
              <?php } ?>
           </div>
            <?php } ?>
        </div>
    </div>
</div>
<br>

  <?php if(isset($courses)){ ?>
  <div class="page-section bg-white">
      <div class="container">
        <div class="text-center">
           <h4 class="text-display-1">CÁC KHOÁ HỌC NỔI BẬT HÀNG ĐẦU CỦA LAKITA</h4>
        </div>
        <br/>
        <div class="row" data-toggle="isotope">
          <?php foreach ($courses as $key => $value) { ?>
           <div class="item col-xs-12 col-sm-4 col-lg-3">
              <div class="panel panel-default paper-shadow" data-z="0.5">
                 <div class="cover overlay cover-image-full hover">
                    <a href="<?php echo base_url().$value['slug'].'-2'.$value['id'];?>.html" title="<?php echo $value['name']; ?>">
                      <img src="<?php echo base_url().$value['image'];?>" alt="<?php echo $value['name']; ?>" class="img-responsive" width="100%" />
                    </a>
                 </div>
                 <div class="panel-body2">
                    <h4 class="text-headline margin-v-0-10">
                      <a href="<?php echo base_url().$value['slug'].'-2'.$value['id'];?>.html" title="<?php echo $value['name']; ?>"><?php echo $value['name']; ?></a>
                    </h4>
                    <p class="small margin-none">
                      <?php $rand = rand(2,5);
                      for ($i=0; $i < $rand; $i++) { ?>
                      <span class="fa fa-fw fa-star text-yellow-800"></span>
                      <?php } ?>

                      <?php for ($i=0; $i < 5-$rand; $i++) { ?>
                      <span class="fa fa-fw fa-star-o text-yellow-800"></span>
                      <?php } ?>
                    </p>
                 </div>
                 <!-- <hr class="margin-none" /> -->
                 <div class="panel-body2">
                    <p><?php //echo word_limiter($value['description'], 20); ?></p>
                    <?php $firs_courses = array_filter(explode(',', $value['speaker_id']));
                    if(isset($firs_courses[0])){
                    $firs_courses = str_replace('-', '', $firs_courses[0]);                    
                    $speaker = $this->lib_mod->detail('speaker', array('id'=>$firs_courses));
                    if(isset($speaker[0])){ ?>
                    <div class="media v-middle">
                       <div class="media-left">
                          <img src="<?php echo base_url().$speaker[0]['image'];?>" alt="<?php echo $speaker[0]['name']; ?>" class="img-circle width-40" />
                       </div>
                       <div class="media-body">
                          <h4><a href=""><?php echo $speaker[0]['name']; ?></a>
                             <br/>
                          </h4>
                          <?php echo $speaker[0]['organize']; ?>
                       </div>
                    </div>
                    <?php }} ?>
                 </div>
              </div>
           </div>
          <?php } ?>
        </div>
        <div class="text-center" style="padding-bottom: 40px;">
           <br/>
           <a class="btn btn-lg btn-primary" href="<?php echo base_url();?>khoa-hoc.html">Xem tất cả</a>
        </div>
     </div>
  </div>
  <br><br>
  <?php } ?>
  <p class="lead text-overlay overlay-bg-white-strong inline-block" style="    width: 100%;
    text-align: center;
    font-weight: bold;
    background: #41A85F;
    color: #fff;
    padding: 10px 0;
    margin-bottom: 0;">CẢM NHẬN HỌC VIÊN KHI THAM GIA CÁC KHOÁ HỌC TẠI LAKITA</p>
  <div class="parallax cover overlay height-300 margin-none">
     <img class="parallax-layer" data-auto-offset="true" data-auto-size="false" src="<?php echo base_url();?>styles/images/photodune-6745579-modern-creative-man-relaxing-on-workspace-m.jpg" alt="Learning Cover" />
     <div class="parallax-layer overlay overlay-full overlay-bg-white bg-transparent" data-opacity="true" data-speed="8">
        <div class="v-center">
           <div class="page-section">
            
           </div>
        </div>
     </div>
  </div>


  <div class="container">
     <div class="page-section">
        <div class="row">
           <?php foreach ($rate as $key => $value) {?>
           <div class="col-md-4">
              <div class="testimonial">
                 <div class="panel panel-default">
                    <div class="panel-body">
                       <p><?php echo $value['description']; ?></p>
                    </div>
                 </div>
                 <div class="media v-middle">
                    <div class="media-left">
                       <img src="<?php echo base_url().$value['thumbnail'];?>" alt="<?php echo $value['name']; ?>" class="img-circle width-40" />
                    </div>
                    <div class="media-body">
                       <p class="text-subhead margin-v-5-0">
                          <strong><?php echo $value['name']; ?></strong>
                       </p>
                       <p class="small">
                          <span class="fa fa-fw fa-star text-yellow-800"></span>
                          <span class="fa fa-fw fa-star text-yellow-800"></span>
                          <span class="fa fa-fw fa-star text-yellow-800"></span>
                          <span class="fa fa-fw fa-star-o text-yellow-800"></span>
                          <span class="fa fa-fw fa-star-o text-yellow-800"></span>
                       </p>
                    </div>
                 </div>
              </div>
           </div>
          <?php } ?>
        </div>
    </div>
    <br/>
</div>

