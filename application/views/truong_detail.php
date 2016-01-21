<div class="content_wrap detail">
<h1>Thông tin chi tiết trường <?php echo $truong[0]->colege_name_vn; ?> </h1>
	<ul>
            
               <li> <label class="detail_info" >Tên trường tiếng Nhật: </label><span><?php echo $truong[0]->colege_name_jp; ?></span><br></li>
                 <li><label class="detail_info" >Tên trường tiếng Việt: </label><span><?php echo $truong[0]->colege_name_vn; ?></span><br></li>
                  <li><label class="detail_info" >Địa chỉ trường: </label><span><?php echo $truong[0]->colege_address; ?></span><br></li>
                   <li><label class="detail_info" >Thông tin về trường: </label><span><?php echo $truong[0]->colege_info; ?></span><br></li>
                    <li><label class="detail_info" >Trường ở vùng: </label><span><?php echo $truong[0]->zone_id; ?></span><br></li>
                     <li><label class="detail_info" >Trường ở tỉnh: </label><span><?php echo $truong[0]->province_id; ?></span><br></li>
                      <li><label class="detail_info" >Các kỳ nghỉ: </label><span><?php echo $truong[0]->holidays; ?></span><br></li>
                       <li><label class="detail_info" >Học phí năm đầu: </label><span><?php echo $truong[0]->first_year." Man"; ?></span><br></li>
                        <li><label class="detail_info" >Học phí toàn khóa: </label><span><?php echo $truong[0]->total." Man"; ?></span><br></li>
                         <li><label class="detail_info" >Được miễn giảm: </label><span><?php echo $truong[0]->discount." Man"; ?></span><br></li>
                          <li><label class="detail_info" >Học bổng: </label><span><?php echo $truong[0]->scholarship." Man"; ?></span><br></li>
                           <li><label class="detail_info" >Bắt đầu nộp hồ sơ: </label><span><?php echo $truong[0]->submit_time; ?></span><br></li>
                            <li><label class="detail_info" >Ngày thi: </label><span><?php echo $truong[0]->date_exam; ?></span></li>
                             <li><label class="detail_info" >Ngày có kết quả: </label><span><?php echo $truong[0]->date_result; ?></span></li>
                              <li><label class="detail_info" >Hạn nộp hồ sơ: </label><span><?php echo $truong[0]->deadline; ?></span></li>
        </ul>                     
      
</div>