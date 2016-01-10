<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Province extends admin_manager_base {

    public function __construct() {
        parent::__construct();
    }

    public function setting_class() {
        $this->name = Array(
            "class" => "province",
            "view" => "province",
            "model" => "m_province",
            "object" => "Tỉnh"
        );
    }
  
}