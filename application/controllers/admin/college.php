<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of customer
 *
 *
 */
class College extends admin_manager_base {

    public function __construct() {
        parent::__construct();
         ini_set('display_errors', 1);
    }

    public function setting_class() {
       
        $this->name = Array(
            "class" => "college",
            "view" => "college",
            "model" => "m_college",
            "object" => "Trường"
        );
    }

    public function add_save($data = array(), $data_return = array(), $re_validate = true) {
        $this->db->trans_begin();
        $data_return["callback"] = isset($data_return["callback"]) ? $data_return["callback"] : "save_form_add_response";
        if (sizeof($data) == 0) {
            $data = $this->input->post();
         
        }
        if ($re_validate) {
            $data_all = $this->_validate_form_data($data);
            if (!$data_all["state"]) {
                $data_return["data"] = $data;
                $data_return["state"] = 0; /* state = 0 : dữ liệu không hợp lệ */
                $data_return["msg"] = "Dữ liệu gửi lên không hợp lệ";
                $data_return["error"] = $data_all["error"];
                echo json_encode($data_return);
                return FALSE;
            } else {
                $data = $data_all["data"];
            }
        }
        $insert_id = $this->data->add($data);
        $data[$this->data->get_key_name()] = $insert_id;
        if ($insert_id) {
            $this->db->trans_commit();
            $data_return["key_name"] = $this->data->get_key_name();
            $data_return["record"] = $data;
            $data_return["state"] = 1; /* state = 1 : insert thành công */
            $data_return["msg"] = "Thêm trường thành công";
            $data_return["redirect"] = isset($data_return['redirect']) ? $data_return['redirect'] : "";
            echo json_encode($data_return);
            return $insert_id;
        } else {
            $data_return["state"] = 2; /* state = 2 : Lỗi thêm bản ghi */
            $data_return["msg"] = "Thêm trường thất bại, vui lòng thử lại sau";
            echo json_encode($data_return);
            return FALSE;
        }
    }

    

}
