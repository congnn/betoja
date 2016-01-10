<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Role extends admin_manager_base {

    public function __construct() {
        parent::__construct();
    }

    public function setting_class() {
        $this->name = Array(
            "class" => "role",
            "view" => "role",
            "model" => "m_role",
            "object" => "Quyền"
        );
    }
    
    public function manager($data = Array()) {
        $data['per_link'] = '';
        parent::manager($data);
    }

    public function delete($id = 0, $data = array()) {
        
    }
    
}