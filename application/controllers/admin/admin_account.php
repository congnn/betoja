<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Admin_account extends admin_manager_base {

    public function __construct() {
        parent::__construct();
        ini_set('display_errors', 1);
    }

    public function setting_class() {
        $this->name = Array(
            "class" => "admin_account",
            "view" => "admin_account",
            "model" => "m_admin_account",
            "object" => "tài khoản"
        );
    }

    protected function _validate_form_data($data, $id = 0) {
        if ($id && ($data["user_password"] != $data["_user_password"])) {
            if (!isset($data["_user_password"]) || strlen($data["_user_password"]) == 0) {
                unset($data["user_password"]);
                unset($data["_user_password"]);
            } else {
                $data_return = Array();
                $data_return["state"] = FALSE; /* state = 0 : dữ liệu không hợp lệ */
                $data_return["error"]["_userPassword"] = "Mật khẩu nhập lại không chính xác";
                return $data_return;
            }
        }
        return parent::_validate_form_data($data, $id);
    }
}