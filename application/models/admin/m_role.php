<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class m_role extends data_base{

    public function __construct() {
        parent::__construct();
    }

    public function setting_table() {
        $this->_table_name = "role";
        $this->_key_name = "role_id";
        $this->_schema = Array(
            "role_id", "role_name", "role_data", "role_description","role_value"
        );
        $this->_rule = Array(
            "role_id" => array(
                'type' => 'hidden',
            ),
            "role_name" => array(
                'type' => 'text',
                'maxlength' => '255',
                'required' => 'required',
                'unique' => 'true',
            ),
            "role_data" => array(
                'type' => 'textarea',
                'required' => 'required',
            ),
            "role_description" => array(
                'type' => 'textarea',
                'required' => 'required',
            ),
            "role_value" => array(
                'type' => 'textarea',
                'required' => 'required',
            ),
        );
        $this->_field_form = Array(
            "role_id" => "ID",
            "role_name" => "Tên nhóm quyền",
            "role_data" => "Nội dung",
            "role_description" => "Mô tả",
            "role_value" => "Giá trị",
        );
        $this->_field_table = Array(
            "role_id" => "ID",
            "role_name" => "Nhóm quyền",
            "role_description" => "Mô tả",
            "role_value" => "Giá trị",
        );
    }

    public function setting_select() {
        $this->db->select("m.*");
        $this->db->from($this->_table_name . " as m");
    }

}