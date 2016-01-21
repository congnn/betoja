<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/*
 * Description of ms_base
 *
 */

class home_base extends MX_Controller {

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
    var $domain_url = "http://betoja.webstarterz.com/";
    var $link_upload = './uploads';
    var $folder_upload = 'uploads';

    public function __construct() {
        parent::__construct();
        $this->removeMobile();
        $this->load->helper('text');
        $this->load->library('session');
        $this->_setting_config();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        session_start();
        $_SESSION['enable_editor'] = true;
        $_SESSION['img_absolute_path'] = 'galery/'; /* không bắt đầu bằng dấu "/" */
        $_SESSION['img_domain'] = base_url('galery');
        $class = $this->router->fetch_class();
       
        
    }

    function removeMobile() {
        $tablet_browser = 0;
        $mobile_browser = 0;

        if (preg_match('/(tablet|ipad|playbook)|(android(?!.*(mobi|opera mini)))/i', strtolower($_SERVER['HTTP_USER_AGENT']))) {
            $tablet_browser++;
        }

        if (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|android|iemobile)/i', strtolower($_SERVER['HTTP_USER_AGENT']))) {
            $mobile_browser++;
        }

        if ((strpos(strtolower($_SERVER['HTTP_ACCEPT']), 'application/vnd.wap.xhtml+xml') > 0) or ( (isset($_SERVER['HTTP_X_WAP_PROFILE']) or isset($_SERVER['HTTP_PROFILE'])))) {
            $mobile_browser++;
        }

        $mobile_ua = strtolower(substr($_SERVER['HTTP_USER_AGENT'], 0, 4));
        $mobile_agents = array(
            'w3c ', 'acs-', 'alav', 'alca', 'amoi', 'audi', 'avan', 'benq', 'bird', 'blac',
            'blaz', 'brew', 'cell', 'cldc', 'cmd-', 'dang', 'doco', 'eric', 'hipt', 'inno',
            'ipaq', 'java', 'jigs', 'kddi', 'keji', 'leno', 'lg-c', 'lg-d', 'lg-g', 'lge-',
            'maui', 'maxo', 'midp', 'mits', 'mmef', 'mobi', 'mot-', 'moto', 'mwbp', 'nec-',
            'newt', 'noki', 'palm', 'pana', 'pant', 'phil', 'play', 'port', 'prox',
            'qwap', 'sage', 'sams', 'sany', 'sch-', 'sec-', 'send', 'seri', 'sgh-', 'shar',
            'sie-', 'siem', 'smal', 'smar', 'sony', 'sph-', 'symb', 't-mo', 'teli', 'tim-',
            'tosh', 'tsm-', 'upg1', 'upsi', 'vk-v', 'voda', 'wap-', 'wapa', 'wapi', 'wapp',
            'wapr', 'webc', 'winw', 'winw', 'xda ', 'xda-');

        if (in_array($mobile_ua, $mobile_agents)) {
            $mobile_browser++;
        }

        if (strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'opera mini') > 0) {
            $mobile_browser++;
            //Check for tablets on opera mini alternative headers
            $stock_ua = strtolower(isset($_SERVER['HTTP_X_OPERAMINI_PHONE_UA']) ? $_SERVER['HTTP_X_OPERAMINI_PHONE_UA'] : (isset($_SERVER['HTTP_DEVICE_STOCK_UA']) ? $_SERVER['HTTP_DEVICE_STOCK_UA'] : ''));
            if (preg_match('/(tablet|ipad|playbook)|(android(?!.*mobile))/i', $stock_ua)) {
                $tablet_browser++;
            }
        }

        if ($tablet_browser > 0) {
            // do something for tablet devices
            print '<html>
            <head>
            <meta charset="utf-8"> </head>
            <body style="font-weight:bold; text-alight:center;">Phiên bản hiện tại chúng tôi chưa hỗ trợ Tablet, Tablet sẽ được hỗ trợ ngay ở phiên bản kế tiếp, xin quý khách hãy sử dụng hệ thống bằng máy tính</body>
        </html>';
            exit;
        } else if ($mobile_browser > 0) {
            print '<html>
            <head>
            <meta charset="utf-8"> </head>
            <body style="font-weight:bold; text-alight:center;">Phiên bản hiện tại chúng tôi chưa hỗ trợ Mobile, Mobile sẽ được hỗ trợ ngay ở phiên bản kế tiếp,xin quý khách hãy sử dụng hệ thống bằng máy tính</body>
        </html>';
            exit;
        } else {
            // do something for everything else
        }
    }

    protected function require_login() {
        return false;
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
        $data["header_base"] = $this->load->view($this->site_config->path_theme_view . "base_master/head", $data, TRUE);
        /* head riêng của các masterPage */
        $data["header_master_page"] = "";
        /* head riêng của các từng page */
        $data["header_page"] = $header_page ? $header_page : "";
        /* Lấy thông tin phần html */
        $data ["content"] = $content;

        $this->load->view($this->site_config->path_theme_view . "base_master/master_page_blank", $data);
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
        $data["title"] = $title ? $title : "Betoja";

        $data["description"] = $description ? $description : "Manager - Betoja"; //THông tin này về sau sẽ cho vào cơ sở dữ liệu
        $data["keywords"] = "Betoja, " . $keywords;
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

        $id = $this->session->userdata('id');
        $data["logout_url"] = site_url('login/logout');
        //$data["changer_info_url"] = site_url('admin_account/edit/' . $id);
        $data["changer_info_url"] = site_url('profile');
        $data["logo"] = $this->path_static_file . "images/logo_white.png";
        $data["avatar"] = $this->path_static_file . "images/default_avatar.png";

        return $this->load->view($this->site_config->path_theme_view . "base_master/menu_bar", $data, TRUE);
    }

    protected function get_left_content($data = Array()) {
        $data["menu_data"] = $this->_get_left_content_data();
        return $this->load->view($this->site_config->path_theme_view . "base_master/left_content_meeting", $data, TRUE);
    }

    protected function _get_left_content_data($data = Array()) {
        $data[] = Array(
            "text" => "Trang chủ",
            //"icon" => "i-home-9",
            "icon" => "icon-home-cus",
            "url" => site_url('home'),
            "controller" => "home",
            "method" => "*",
        );
        $data[] = Array(
            "text" => "Tạo phòng họp",
            //"icon" => "i-plus-circle",
            "icon" => "icon-plus-circle-cus",
            "url" => site_url('create_room'),
            "controller" => "create_room",
            "method" => "*",
        );
        $data[] = Array(
            "text" => "Quản lý user",
            "icon" => "i-users",
            //"icon" => "icon-users",
            "url" => site_url('users'),
            "controller" => "users",
            "method" => "*",
        );
        $data[] = Array(
            "text" => "Quản lý khách hàng",
            "icon" => "i-users-2",
            // "icon" => "icon-users-2-cus",
            "url" => site_url('customer'),
            "controller" => "customer",
            "method" => "*",
        );

        $data[] = Array(
            "text" => "Nhật ký sử dụng",
            //"icon" => "i-clipboard",
            "icon" => "icon-clipboard-cus",
            "url" => site_url('use_log'),
            "controller" => "use_log",
            "method" => "*",
        );
        $data[] = Array(
            "text" => "Giám sát sử dụng",
            //"icon" => "i-clipboard",
            "icon" => "icon-clipboard-cus",
            "url" => site_url('use_log_all'),
            "controller" => "use_log_all",
            "method" => "*",
        );
        $data[] = Array(
            "text" => "Gói sử dụng",
            "icon" => "i-stack-2",
            "url" => '#',
            "child" => Array(
                Array(
                    "text" => "Danh sách các gói",
                    //  "icon" => "i-stack-2",
                    "url" => site_url('package'),
                    "controller" => 'package',
                    "method" => '*',
                ),
                Array(
                    "text" => "Kích hoạt gói",
                    // "icon" => "i-stack-2",
                    "url" => site_url('package/package_bought'),
                    "controller" => 'package',
                    "method" => 'package_bought',
                ),
                Array(
                    "text" => "Gói đang sử dụng",
                    // "icon" => "i-stack-2",
                    "url" => site_url('package/package_using'),
                    "controller" => 'package',
                    "method" => 'package_using',
                ),
                Array(
                    "text" => "Lịch sử mua gói",
                    //"icon" => "i-stack-2",
                    "url" => site_url('package/package_history'),
                    "controller" => 'package',
                    "method" => 'package_history',
                )
            )
        );
        $data[] = Array(
            "text" => "Danh bạ",
            //"icon" => "i-address-book",
            "icon" => "icon-address-book-cus",
            "url" => site_url('contact'),
            "controller" => "contact",
            "method" => "*",
        );
        $data[] = Array(
            "text" => "Thanh toán",
            //"icon" => "i-paypal",
            "icon" => "icon-paypal-cus",
            "url" => site_url('#'),
            "controller" => "",
            "method" => "*",
        );
        $data[] = Array(
            "text" => "Thiết lập",
            //"icon" => "i-cog-3",
            "icon" => "icon-cog-3-cus",
            "url" => site_url('#'),
            "controller" => "",
            "method" => "*",
        );
        $data[] = Array(
            "text" => "Hướng dẫn sử dụng",
            //"icon" => "i-question-3",
            "icon" => "icon-question-3-cus",
            "url" => site_url('#'),
            "controller" => "",
            "method" => "*",
        );
        // $data[] = Array(
        //     "text" => "Đăng xuất",
        //     "icon" => "i-exit",
        //     "url" => site_url('login/logout'),
        //     "controller" => "login",
        //     "method" => "*",
        // );

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
        $this->site_config->path_theme_view = $this->site_config->theme_name . "/";
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
				