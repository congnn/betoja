<?php


class Auth extends REST_Controller {

    public function __construct() {
        date_default_timezone_set('Asia/Ho_Chi_Minh'); //setup lai timezone
        parent::__construct();
    }

    public function auth_post() {
        $this->load->model("m_user_account", "account");
        $loginname = $this->post('loginname');
        $password = $this->post('password');
        $userInfo = $this->account->check_login($loginname, $password);
        if ($userInfo) {
            $this->session->set_userdata('id', $userInfo->id);
            $response = array(
                'status' => true,
                'status_code' => 'OK'
            );
            $this->response($response, $this->header_200);
        } else {
            //Return fail
            $response = array(
                'status' => false,
                'status_code' => 'INVALID_USER_PASSWORD',
                'msg' => 'Invalid login.',
            );
            $this->response($response, $this->header_400);
        }
    }

}
