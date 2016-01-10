<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * M_user
 * 
 * Description...
 * 
 * @package M_adminuser
 * @author Pham Trong <phamtrong204@gmail.com>
 * @version 0.0.0
 */
class M_admin_account extends data_base {

    public function __construct() {
        parent::__construct();
    }

    public function setting_table() {
        $this->_table_name = "admin";
        $this->_key_name = "user_id";
        $this->_schema = Array(
            "user_id", "user_name", "user_display_name", "user_password",
            "user_email", "user_bithday", "user_phone", "user_role"
        );
        $this->_rule = Array(
            "userId" => array(
                "type" => "hidden"
            ),
            "user_name" => array(
                'type' => 'text',
                'maxlength' => '255',
                'required' => 'required',
                'unique' => 'true',
            ),
            "user_display_name" => array(
                'type' => 'text',
                'maxlength' => '255',
                'required' => 'required',
            ),
            "user_password" => array(
                'type' => 'password',
                'maxlength' => '255',
                'minlength' => '6',
                'required' => 'required',
            ),
            "_user_password" => array(
                'type' => 'password',
                'maxlength' => '255',
                'minlength' => '6',
                'required' => 'required',
                'recheck' => 'user_password',
            ),
            "user_email" => array(
                'type' => 'text',
                'maxlength' => '255',
                'required' => 'required',
                'is_email' => '1',
            ),
            "user_phone" => array(
                'type' => 'text',
            ),
//            "user_role" => array(
//                'type' => 'select',
//                'target_model' => 'admin/m_role',
//                'target_value' => 'role_id',
//                'target_display' => 'role_name',
//                'allow_null' => 'true',
//            ),
        );
        $this->_field_form = Array(
            "user_id" => "ID",
            "user_name" => "Tên đăng nhập",
            "user_display_name" => "Tên hiển thị",
            "user_password" => "Mật khẩu",
            "_user_password" => "Nhập lại mật khẩu",
            "user_email" => "Email",
            "user_phone" => "Số điện thoại",
//            "user_role" => "Loại tài khoản",
        );
        $this->_field_table = Array(
            "m.user_id" => "ID",
            "m.user_name" => "Tên đăng nhập",
            "m.user_display_name" => "Tên hiển thị",
            "r.role_name" => "Loại tài khoản",
            "m.user_email" => "Email",
            "m.user_phone" => "Số điện thoại",
        );
    }

    public function setting_select() {
        $this->db->select("m.*,r.role_name,r.role_data,r.role_value");
        $this->db->from($this->_table_name . " as m");
        $this->db->join("role as r", "r.role_id = m.user_role", "left");
    }

    public function check_login($user_name, $password) {
        $this->setting_select();
        $this->db->where("user_name", $user_name);
        $this->db->where("user_password", $password);
        $query = $this->db->get();
        if ($query->num_rows()) {
            return $query->first_row();
        } else {
            return NULL;
        }
    }

    public function set_field_form($form = array()) {
        $this->_field_form = $form;
    }

}
