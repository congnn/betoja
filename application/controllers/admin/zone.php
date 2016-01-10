<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Zone extends admin_manager_base {

    public function __construct() {
        parent::__construct();
        ini_set('display_errors', 1);
    }

    public function setting_class() {
        $this->name = Array(
            "class" => "zone",
            "view" => "zone",
            "model" => "m_zone",
            "object" => "Vùng"
        );
    }

    
}