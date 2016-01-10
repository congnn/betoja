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
class email_template extends admin_manager_base {

    public function __construct() {
        parent::__construct();
    }

    public function setting_class() {
        $this->name = Array(
            "class" => "email_template",
            "view" => "email_template",
            "model" => "m_email_template",
            "object" => "mẫu email"
        );
    }

}
