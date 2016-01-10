<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Station extends admin_manager_base {

    public function __construct() {
        parent::__construct();
        ini_set('display_errors', 1);
    }

    public function setting_class() {
        $this->name = Array(
            "class" => "station",
            "view" => "station",
            "model" => "m_station",
            "object" => "Ga"
        );
    }

    
}