<?php


class InfoTeach extends REST_Controller {

    public function __construct() {
        date_default_timezone_set('Asia/Ho_Chi_Minh'); //setup lai timezone
        parent::__construct();
    }

    public function configTeach_get() {
        $data = array();

        $this->load->model('m_sys_dead_line');
        $this->load->model('m_hour_teach');

        $data['info_dead_line'] = $this->m_sys_dead_line->get_one(array());
        $data['info_hour_teach'] = $this->m_hour_teach->get_list();

        $response = array(
            'status' => true,
            'data' => $data,
            'msg' => 'đã kết nối thành công'
        );
        $this->response($response);
    }

    public function configHourTeach_get() {
        $this->load->model('m_hour_teach');
        $data = $this->m_hour_teach->get_list();

        $response = array(
            'status' => true,
            'data' => $data,
            'msg' => 'đã kết nối thành công'
        );
        $this->response($response);
    }

    public function configDeadLine_get() {
        $this->load->model('m_sys_dead_line');
        $data = $this->m_sys_dead_line->get_one(array());

        $response = array(
            'status' => true,
            'data' => $data,
            'msg' => 'đã kết nối thành công'
        );
        $this->response($response);
    }

}
