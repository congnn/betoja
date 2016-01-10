<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Home extends admin_home_base {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data = Array();
        $data['user_name'] = $this->session->userdata('userName');
        $data['title'] = 'Quản lý thông tin trường';
        $content = $this->load->view($this->path_theme_view . "home/index", $data, true);
        $header_page = NULL; /* Dữ liệu đẩy thêm vào thẻ <head> (css, js, meta property) */
        $title = 'Quản lý thông tin trường';
        $description = NULL;
        $keywords = NULL;
        $canonical = NULL;
        $this->master_page($content, $header_page, $title, $description, $keywords, $canonical);
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */