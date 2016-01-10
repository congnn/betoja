<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of email_template
 *
 * @author Tùng Arsenal
 */
class m_email_template extends data_base {

    public function __construct() {
        parent::__construct();
    }

    public function setting_table() {
        $this->_table_name = "email_template";
        $this->_key_name = "id";
        $this->_schema = Array(
            'id', 'name', 'subject', 'content', 'modifier_id',
            'time_modified', 'time_created', 'deleted', 'email_type'
        );
        $this->_rule = Array(
            "id" => array(
                'type' => 'hidden'
            ),
            "name" => array(
                'type' => 'text',
                'maxlength' => '255',
                'required' => 'required',
                'unique' => 'true'
            ),
            "subject" => array(
                'type' => 'text',
                'maxlength' => '255',
            ),
            "content" => array(
                'type' => 'rich_editor',
                'required' => 'required',
            ),
        );
        $this->_field_form = Array(
            "id" => "ID",
            "name" => "Mã hiển thị",
            "subject" => "Tiêu đề",
            "content" => "Nội dung",
        );
        $this->_field_table = Array(
            'id' => 'ID',
            "name" => "Tên hiển thị",
            "subject" => "Tiêu đề",
            "content" => "Nội dung"
        );
    }

}
