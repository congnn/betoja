<?php

/**
 * Description of m_customer
 *
 * @author Tùng Arsenal
 */
class m_truong extends CI_model {

    public function __construct() {
        parent::__construct();

    }

   
    public function get_college(){
           $this->db->select("*");
        $this->db->from(" college");
        $query = $this->db->get();
        return $query->result();
    }
    public function get_college_id($id){
           $this->db->select("*");
        $this->db->from(" college");
         $this->db->where("id", $id);
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
