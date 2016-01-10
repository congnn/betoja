<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Payment
 *
 * @author Tùng Arsenal
 */
class Payment {

    private $_CI;

    public function __construct() {
        $this->_CI = & get_instance();
        $this->_CI->config->load('api_config');
        $config = $this->_CI->config->item('api_server_payment');
        $this->_CI->load->library("Rest_Client");
        $this->_CI->rest_client->initialize($config);
    }

    public function deposit_by_meeting($param) {
        $uri = "Balance/DepositByMeeting";
        $result = $this->_CI->rest_client->post($uri, $param);
        return $result;
    }

    public function create_user($param) {
        $uri = "User/Add";
        $result = $this->_CI->rest_client->post($uri, $param);
        return $result;
    }

}
