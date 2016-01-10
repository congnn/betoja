<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/*
 * Description of ms_base
 *
 * Author	: Pham Trong
 */

class admin_home_base extends MX_Controller {

    /**
     * 	$user_id : int -- Id của User đang đăng nhập (chưa đăng nhập thì $user_id = NULL)
     * 	$user_info : Object -- Thông tin chung của user đã đăng nhập (chưa đăng nhập, $user_info = NULL)
     * 	$site_config : Object -- Biến đối tượng config các thông tin của site, mới đầu sẽ fix cứng trong base, sau sẽ tách vào cơ sở dữ liệu
     */
    var $user_id = null;
    var $user_info = null;
    var $site_config = null;

    /**
     * Truyền biến bất quy tắc qua view, biến được gán giá trị trong hàm _setting_config()
     */
    var $path_theme_view = "";
    var $path_theme_file = "";
    var $path_static_file = "";

    /**
     * 
     */
    var $json_item_barack = ";mtb;";
    var $md5_salt = '1@ANmC^%^wrFO'; /* md5($this->md5_salt . sha1($pass . $this->md5_salt)) */
    var $domain_url = "http://teacher.topmito.edu.vn/";

    public function __construct() {
        parent::__construct();
        $this->load->helper('text');
        $this->load->library('session');
        $this->_setting_config();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        session_start();
        $_SESSION['enable_editor'] = true;
        $_SESSION['img_absolute_path'] = 'galery/'; /* không bắt đầu bằng dấu "/" */
        $_SESSION['img_domain'] = base_url('galery');
        $class = $this->router->fetch_class();
        if ($this->require_login()) {
            if (!$this->session->userdata('id')) {
                redirect(site_url('admin/login'));
            }
        }
        if (!$this->check_permission()) {
            if ($this->session->userdata("perData")) {
                if ($this->input->is_ajax_request()) {
                    $data_return = Array();
                    $data_return["callback"] = "permission_error";
                    $data_return["state"] = 0;
                    $data_return["msg"] = "Bạn ko có quyền truy nhập";
                    echo json_encode($data_return);
                    exit;
                } else {
                    $list_per = explode(";", $this->session->userdata("perData"));
                    $temp = explode(".", $list_per [0]);
                    if ($temp[0] == "*") {
                        $redirect = site_url();
                    } else {
                        if (isset($temp[1]) || $temp[1] == "*") {
                            $redirect = site_url($temp[0]);
                        } else {
                            $redirect = site_url($temp[0] . "/" . $temp[1]);
                        }
                    }
                    echo "<meta charset='utf-8'/>";
                    echo "<h2>Bạn không có quyền truy cập chức năng này!</h2>";
                    echo "Mục đích của bạn đến đây làm gì?<br />";
                    echo "Click vào <a href='" . $redirect . "'>đây</a> để về lại thế giới của bạn.";
                    exit;
                }
            } else {
                redirect(site_url('admin/login'));
            }
        }
    }

    protected function require_login() {
        return true;
    }

    protected function check_permission() {
        $perData = $this->session->userdata("perData");
        if (!$perData) {
            return true;
        }
        $class = $this->router->fetch_class();
        $method = $this->router->fetch_method();
        $per_list = explode(";", $perData);
        foreach ($per_list as $item) {
            $temp = explode(".", $item);
            if (count($temp) < 2) { /* Luật không hợp lệ, bỏ qua */
                continue;
            }
            if ($temp[0] == "*" && $temp[1] == "*") {
                return true;
            } elseif ($temp [0] == "*" && $temp[1] == $method) {
                return true;
            } elseif ($temp [0] == $class && $temp[1] == "*") {
                return true;
            } elseif ($temp[0] == $class && $temp[1] == $method) {


                return true;
            } else {
                continue;
            }
        }
        return false;
    }

    protected function master_page_blank($content, $header_page = NULL, $title = NULL, $description = NULL, $keywords = NULL, $canonical = NULL) {
        $data["title"] = $title ? $title : "Manager";

        $data["description"] = $description ? $description : "Manager"; //THông tin này về sau sẽ cho vào cơ sở dữ liệu
        $data["keywords"] = "Manager, " . $keywords;
        $data["canonical"] = $canonical ? $canonical : NULL;
        $data["icon"] = $this->site_config->favicon_link;
        /* head chung của các masterPage */
//        $data["header_base"] = null;
        $data["header_base"] = $this->load->view($this->site_config->path_theme_view . "admin/base_master/head", $data, TRUE);
        /* head riêng của các masterPage */
        $data["header_master_page"] = "";
        /* head riêng của các từng page */
        $data["header_page"] = $header_page ? $header_page : "";
        /* Lấy thông tin phần html */
        $data ["content"] = $content;

        $this->load->view($this->site_config->path_theme_view . "admin/base_master/master_page_blank", $data);
    }

    /**
     *
     * @param type $content
     * @param type $head_page
     * @param type $title
     * @param type $description
     * @param type $keywords
     * @param type $canonical
     */
    protected function master_page($content, $head_page = NULL, $title = NULL, $description = NULL, $keywords = NULL, $canonical = NULL) {
        $data = Array();
        /* Lấy thông tin phần head */
        $data["title"] = $title ? $title : "Manager";

        $data["description"] = $description ? $description : "Manager"; //THông tin này về sau sẽ cho vào cơ sở dữ liệu
        $data["keywords"] = "Manager, " . $keywords;
        $data["canonical"] = $canonical ? $canonical : NULL;
        $data["icon"] = $this->site_config->favicon_link;
        /* head chung của các masterPage */ $data["header_base"] = $this->load->view($this->site_config->path_theme_view . "base_master/head", $data, TRUE);
        /* head riêng của các masterPage */
        $data["header_master_page"] = "";
        /* head riêng của các từng page */
        $data["header_page"] = $head_page ? $head_page : "";

        /* Lấy thông tin phần html */
        $data["header"] = $this->get_header();
        $data["menu_bar"] = $this->get_menu_bar();
        $data["breadcrumb"] = $this->get_breadcrumb();
        $data["content"] = $content;
        $data["left_content"] = $this->get_left_content();
        $data["right_content"] = $this->get_right_content();

        $data["footer"] = $this->get_footer();

        $this->load->view($this->site_config->path_theme_view . "base_master/master_page", $data);
    }

    protected function get_header($data = Array()) {
        return $this->load->view($this->site_config->path_theme_view . "base_master/header", $data, TRUE);
    }

    protected function get_menu_bar($data = Array()) {
        if (!$this->session->userdata('id')) {
            $ret = "<style>";
            $ret .= "#sidebar{margin-top: 0 !important; display: none} .wrapper {margin-top: 0 !important;} #content {margin-left: 0;}";
            $ret .= "</style>";
            return $ret;
        }

        $id = $this->session->userdata('id');
        $data["logout_url"] = site_url('admin/login/logout');
        $data["changer_info_url"] = site_url('admin/admin_account/edit/' . $id);
        $data["logo"] = $this->path_static_file . "images/logo_white.png";
        $data["avatar"] = $this->path_static_file . "images/default_avatar.png";

        return $this->load->view($this->site_config->path_theme_view . "base_master/menu_bar", $data, TRUE);
    }

    protected function get_left_content($data = Array()) {
        $data["menu_data"] = $this->_get_left_content_data();
        return $this->load->view($this->site_config->path_theme_view . "base_master/left_content", $data, TRUE);
    }

    protected function _get_left_content_data($data = Array()) {
        $data[] = Array(
            "text" => "Trang chủ",
            "icon" => "i-screen",
            "url" => site_url('admin/home'),
            "controller" => "admin/home",
            "method" => "*",
        );
         $data[] = Array(
            "text" => "Quản lý trường",
            "icon" => "i-home",
            "url" => site_url('admin/college'),
             "controller" => "admin/college",
             "method" => "*"
             );
        $data[] = Array(
            "text" => "Quản lý",
            "icon" => "i-file",
            "url" => "#",
            "child" => Array(
                Array(
                    "text" => "Quản lý vùng",
                    "icon" => "i-power",
                    "url" => site_url('admin/zone'),
                    "controller" => "admin/zone",
                    "method" => "*",
                ),
                Array(
                    "text" => "Quản lý tỉnh",
                    "icon" => "i-power",
                    "controller" => "admin/province",
                    "method" => "*",
                    "url" => site_url('admin/province')
                  
                ),
                Array(
                    "text" => "Quản lý ga",
                    "icon" => "i-power",
                    "controller" => "admin/station",
                    "method" => "*",
                    "url" => site_url('admin/station'),
                ),
            ),
        );
//        $data[] = Array(
//            "text" => "Quản lý tài khoản",
//            "icon" => "i-users",
//            "url" => "#",
//            "child" => Array(
//                Array(
//                    "text" => "Danh sách tài khoản",
//                    "icon" => "i-file",
//                    "url" => site_url('admin/admin_account'),
//                    "controller" => "admin/admin_account",
//                    "method" => "*",
//                ),
//                Array(
//                    "text" => "Tạo tài khoản",
//                    "icon" => "i-user-plus",
//                    "controller" => "admin/admin_account",
//                    "method" => "add",
//                    "url" => site_url('admin/admin_account/add'),
//                    "class" => 'e_ajax_link'
//                ),
//                Array(
//                    "text" => "Phân quyền hệ thống",
//                    "icon" => "i-power",
//                    "controller" => "admin/role",
//                    "method" => "*",
//                    "url" => site_url('admin/role'),
//                ),
//            ),
//        );
        
//        $data[] = Array(
//            "text" => "Báo cáo",
//            "icon" => "i-stats-up",
//            "url" => site_url('report'),
//            "controller" => "report",
//            "method" => "index",
//        );
        $perData = $this->session->userdata('perData');

        $data_return = array();
        if ($perData) {
            $list_per = explode(";", $perData);

            foreach ($list_per as $item) {
                $temp = explode(".", $item);
                if (count($temp) < 2) { /* Luật không hợp lệ, bỏ qua */
                    $data_return = null;
                }
                if ($temp[0] == "*") {
                    $data_return = $data;
                    break;
                } else {
                    foreach ($data as $key => $value) {
                        if (isset($value['controller']) && isset($value['method'])) {
                            if ($value['controller'] == $temp[0] && ($value['method'] == '*' || $value['method'] == $temp[1])) {
                                $data_return[$key] = $value;
                            }
                        } else if (isset($value['child'])) {

                            foreach ($value['child'] as $k => $v) {
                                if (isset($v['controller']) && isset($v['method'])) {

                                    if ($temp[0] == $v['controller'] && ($temp[1] == '*' || $temp[1] == $v['method'])) {
                                        $data_return[$key]['text'] = $value['text'];
                                        $data_return[$key]['icon'] = $value['icon'];
                                        $data_return[$key]['url'] = $value['url'];
                                        $data_return[$key]['child'][$k] = $v;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return $data_return;
    }

    /**
     * 
     * @param type $data
     * @return type
     */
    protected function get_breadcrumb($data = Array()) {

        return $this->load->view($this->site_config->path_theme_view . "base_master/breadcrumb", $data, TRUE);
    }

    protected function get_right_content($data = Array()) {

        return $this->load->view($this->site_config->path_theme_view . "base_master/right_content", $data, TRUE);
    }

    protected function get_footer($data = Array()) {
        return $this->load->view($this->site_config->path_theme_view . "base_master/footer", $data, TRUE);
    }

    /* Private finction */

    /**
     * Hàm lấy html view khu vực phân trang
     * @param type $total = Tổng số trang
     * @param type $current = Trang hiện tại
     * @param type $display = Số link hiển thị
     * @param type $link = Link gốc
     * @param type $key = Key cần thêm
     * @return type HtmlString
     */
    protected function _get_pagging($total, $current, $display, $link, $key = "p") {
        $data["total_page"] = $total;
        $data["current_page"] = $current;
        $data["page_link_display"] = $display;
        $data["link"] = $link;

        $data["key"] = $key;
        return $this->load->view($this->path_theme_view . "base_manager/pagging", $data, true);
    }

    /**
     * 	Hàm cài đặt thông tin chung (theme_path, view_path...)
     * 	Lúc load view: dùng biến $this->site_config->path_theme_view ( cụ thể: $this->load->view($this->site_config->path_theme_view . "folder/file_view"); )
     * 		Mặc định $this->site_config->path_theme_view = "default/"
     * 	Lúc load css, js, images: dùng biến $this->site_config->path_theme_file.
     * 		Mặc định $this->site_config->path_theme_file = "http://domainname.com/themes/default/"
     */
    private function _setting_config() {
        $this->site_config = new stdClass();
        $this->site_config->theme_name = "default";
        $this->site_config->path_theme_view = $this->site_config->theme_name . "/admin/";
        $this->site_config->path_theme_file = base_url("themes/" . $this->site_config->theme_name) . "/";
        $this->site_config->path_static_file = base_url("static/") . "/";
        $this->site_config->favicon_link = $this->site_config->path_static_file . "icons/favicon.png";

        /* Truyền biến bất quy tắc qua view */
        $this->path_theme_view = $this->site_config->path_theme_view;
        $this->path_theme_file = $this->site_config->path_theme_file;
        $this->path_static_file = $this->site_config->path_static_file;
        $this->favicon_link = $this->site_config->path_static_file . "icons/favicon.png";
    }

    protected function delete_dir($dirPath) {
        if (is_dir($dirPath)) {
            if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
                $dirPath .= '/';
            }
            $files = glob($dirPath . '*', GLOB_MARK);
            foreach ($files as $file) {
                if (is_dir($file)) {
                    self::delete_dir($file);
                } else {
                    @unlink($file);
                }
            }
            @rmdir($dirPath);
        }
    }

    //Gui email voi noi dung $data(dang html) tu doi tuong emailFrom cho doi tuong $emailTo voi tieu de $title, chu de $subject
    protected function send_email($emailPass, $content, $emailTo, $emailFrom, $subject, $title = "TOPMITO") {
        $config['protocol'] = 'smtp';
        $config['smtp_host'] = 'ssl://112.78.5.200';
        $config['smtp_port'] = '465';
        $config['smtp_timeout'] = '600';
        $config['smtp_user'] = 'teacher-noreply@topmito.edu.vn';
        $config['smtp_pass'] = 'Teacher@123';
        $config['charset'] = 'utf-8';
        $config['newline'] = "\r\n";
        $config['mailtype'] = 'html'; // or html
        $config['validation'] = TRUE; // bool whether to validate email or not

        $this->load->library("email");

        $this->email->initialize($config);
        $this->email->from('teacher-noreply@topmito.edu.vn', $title);
        $this->email->to($emailTo);
        $this->email->cc('');
        $this->email->subject($subject);
        $this->email->message($content);
        $check = $this->email->send();
        echo $this->email->print_debugger();
        return $check;
    }

    protected function randomCode() {
        $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 16; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }

    public function get_info_dead_line($week, $year) {
        $data_return = array();
        $this->load->model('m_sys_dead_line');
        $info_dead_line = $this->m_sys_dead_line->get_one(array());
        $week = $week - 1;
        $first_day_week = strtotime($year . 'W' . str_pad($week, 2, '0', STR_PAD_LEFT));
        $data_return['deadlineRegister'] = $first_day_week + ($info_dead_line->deadDayRegister - 1) * 86400 + $info_dead_line->deadHourRegister * 3600 + 30 * 60;
        $data_return['deadlineConfirm'] = $first_day_week + ($info_dead_line->deadDayConfirm - 1) * 86400 + $info_dead_line->deadHourConfirm * 3600 + $info_dead_line->deadMinConfirm * 60;
        $data_return['firstDayWeek'] = $first_day_week;
        return $data_return;
    }

}

/* End of file ms_base.php */
/* Location: ./application/base/ms_base.php */
				