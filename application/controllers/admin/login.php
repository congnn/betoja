<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * Login
 * 
 * Description...
 * 
 * @package login
 * @author Pham Trong <your@email.com>
 * @version 0.0.0
 */
class Login extends home_base {

    public function __construct() {
        parent::__construct();
        $this->load->model("admin/m_admin_account", "account");
    }

    public function index() {
        $data = Array();
        $data["login_url"] = site_url("admin/login/check");
        $data["recover_url"] = site_url("admin/login/reset_password");

        $data["form"] = $this->account->get_form();

        $content = $this->load->view($this->path_theme_view . "admin/login/content", $data, true);
        $header_page = $this->load->view($this->path_theme_view . "admin/login/header", $data, true); /* Dữ liệu đẩy thêm vào thẻ <head> (css, js, meta property) */
        $title = "Đăng nhập - Topimito Teacher";
        $description = NULL;
        $keywords = NULL;
        $canonical = NULL;
        $this->master_page_blank($content, $header_page, $title, $description, $keywords, $canonical);
    }

    public function check() {
        if ($this->input->is_ajax_request() && $this->input->post()) {
            $dataReturn = Array();
            $email = $this->input->post("admin_email");
            $pass = md5($this->input->post("admin_password"));
            $this->load->model("admin/m_admin_account", "account");
            $login = $this->account->check_login($email, $pass);
            if ($login) {
                $this->session->set_userdata("id", $login->user_id);
                $this->session->set_userdata("userName", $login->user_name);
                $this->session->set_userdata("perData", $login->role_data);
                $this->session->set_userdata("perValue", $login->role_value);
                $this->session->set_userdata("perId", $login->user_role);
                $this->session->set_userdata("perList", explode(";", $login->role_data));
                
                
                $dataReturn["state"] = 1;
                $dataReturn["msg"] = "Đăng nhập thành công";
                $dataReturn["redirect"] = site_url('admin');
            } else {
                $dataReturn["state"] = 0;
                $dataReturn["msg"] = "Tên đăng nhập hoặc mật khẩu không chính xác";
            }
            echo json_encode($dataReturn);
        } else {
            redirect();
        }
    }

    public function reset_password() {
        
    }

    protected function require_login() {
        return false;
    }

    protected function check_permission() {
        return true;
    }

    public function logout() {
        $this->session->set_userdata("id", 0);
        $this->session->set_userdata("userName", null);
        $this->session->set_userdata("userDisplayName", null);
        $this->session->set_userdata("roleData", null);
        redirect("admin/login");
    }

}

/* End of file login.php */
/* Location: ./application/controllers/login.php */