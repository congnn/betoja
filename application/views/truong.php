<div class="content_wrap">
<h1>Thông tin các trường đại học</h1>
<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered table-hover">
    <thead>
        <tr>
            
                <th class="" >Tên trường tiếng Nhật</th>
                 <th class="" >Tên trường tiếng Việt</th>
                  <th class="" >Địa chỉ trường</th>
                   <th class="" >Học phí năm đầu</th>
                    <th class="" >Miễn giảm học phí</th>
                     <th class="" >Học bổng</th>
                     <th class="" >Hạn chót làm thủ tục</th>
                     <th class="" >Action</th>

           
        </tr>
    </thead>
   
        <tbody>
            <?php foreach ($truong as $item) { 

                ?>

                <tr class="gradeX" >
                   
                        <td ><?php echo $item->colege_name_jp; ?></td>
                         <td ><?php echo $item->colege_name_vn; ?></td>
                          <td ><?php echo $item->colege_address; ?></td>
                           <td ><?php echo $item->first_year; ?></td>
                            <td ><?php echo $item->discount; ?></td>
                             <td ><?php echo $item->scholarship; ?></td>
                              <td ><?php echo $item->   deadline; ?></td>
                               <td ><a href="<?php echo 'truong/truong_id/'.$item->id ;?>">Xem chi tiết</a></td>

                   
                </tr>
            <?php } ?>
        </tbody>
   
</table>
</div>
