<?php

/**
 * Description of m_customer
 *
 * @author Tùng Arsenal
 */
class m_college extends data_base {

    public function __construct() {
        parent::__construct();
    }

    public function setting_table() {
        $this->_table_name = 'college';
        $this->_key_name = 'id';
        $province=$this->get_province();
        $zone=$this->get_zone();
     
        $this->_schema = array(
            "id", "colege_name_jp", "colege_name_vn", "colege_address",
            "colege_info", "zone_id", "province_id", "holidays",
            "first_year", "total", "discount","scholarship","submit_time",
            "date_exam","date_result","deadline"
        );
        $this->_rule = array(
            "id" => array(
                "type" => "hidden"
            ),
            "colege_name_jp" => array(
                'type' => 'text',
                'maxlength' => '255',
                'required' => 'required',
                
            ),
            "colege_name_vn" => array(
                'type' => 'text',
                'maxlength' => '255',
                
            ),
            "colege_address" => array(
                'type' => 'text',
                'maxlength' => '255',
                'minlength' => '6',
                
            ),
            "colege_info" => array(
                'type' => 'textarea',
                
            ),
            "zone_id" => array(
                'type' => 'select',               
                
                'option'=>$zone
              
            ),
            "province_id" => array(
                'type' => 'select',
                 
                'option'=>$province
            ),
            "holidays" => array(
                'type' => 'textarea',
              
            ),
            "first_year" => array(
                'type' => 'number',
                'maxlength' => '355',
              
            ),
            "total" => array(
                'type' => 'number',
                'maxlength' => '355',
              
            ),
            "discount" => array(
                'type' => 'number',
                'maxlength' => '355',
              
            ),
            "scholarship" => array(
                'type' => 'number',
                'maxlength' => '355',
              
            ),
            "submit_time" => array(
                'type' => 'date',
               
              
            ),
            "date_exam" => array(
                'type' => 'date',
               
              
            ),
            "date_result" => array(
                'type' => 'date',
            
              
            ),
            "deadline" => array(
                'type' => 'date',
               
              
            ),
           
        );
        $this->_field_form = array(
            "id" => "ID",
            "colege_name_jp" => "Tên trường tiếng Nhật",
            "colege_name_vn" => "Tên trường tiếng Việt",
            "colege_address" => "Địa chỉ trường",
            "colege_info" => "Thông tin trường",
            "zone_id" => "Thuộc vùng",
            "province_id" => "Tỉnh",
            "holidays" => "Các kỳ nghỉ",
            "first_year" => "Học phí năm đầu (Man)",
            "total" => "Học phí toàn khóa (Man)",
            "discount" => "Miễn giảm học phí(Man)",
            "scholarship" => "Học bổng (Man)",
            "submit_time" => "Thời gian nộp hồ sơ",
            "date_exam" => "Thời gian thi",
            "date_result" => "Ngày có kết quả",
            "deadline" => "Hạn nộp hồ sơ",
        );
        $this->_field_table = array(
            "m.id" => "ID",
            "m.colege_name_jp" => "Tên trường tiếng Nhật",
            "m.colege_name_vn" => "Tên trường tiếng Việt",
            "m.colege_address" => "Địa chỉ trường",
            "m.first_year" => "Học phí năm đầu",
            "m.discount" => "Miễn giảm học phí",
            "m.scholarship" => "Học bổng",
            "m.deadline" => "Hạn chót làm thủ tục"
        );
    }
    protected function get_province(){
           $this->db->select("id as 'value',province_name as 'display'");
        $this->db->from(" province");
        $query = $this->db->get();
        return $query->result();
    }
    protected function get_zone(){
         $this->db->select("id as 'value',zone_name as 'display'");
        $this->db->from(" zone");
        $query = $this->db->get();
        return $query->result();
    }

    public function setting_select() {
        $this->db->select("m.*");
        $this->db->from($this->_table_name . " as m");
//        $this->db->join("role as r", "r.role_id = m.user_role", "left");
//        $this->db->where("r.role_id", 2);
    }

}
