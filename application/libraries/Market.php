<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Market
 *
 * @author Tùng Arsenal
 */
class Market {

    private $_CI;

    public function __construct() {
        $this->_CI = & get_instance();
        $this->_CI->config->load('api_config');
        $config = $this->_CI->config->item('api_server_market');
        $this->_CI->load->library("Rest_Client");
        $this->_CI->rest_client->initialize($config);
    }

    /**
     * Lay danh sach goi hoc tren market
     * @return type
     */
    public function get_list_package() {
        $uri = "packageAPI/packages";
        $param = array(
        );
        $result = $this->_CI->rest_client->get($uri, $param);
        if (is_object($result) && $result->status) {
            return get_object_vars($result->data);
        }
        return array();
    }
 /**
     * Lay số dư tài khoản khách hàng
     * @return type
     */
 public function get_balance_user($customer_id){
      $data_return = array();
      $param=array(
          'customer_id'=>$customer_id
      );
     $uri = "pricingAPI/get_balance_user";
      $result = $this->_CI->rest_client->post($uri, $param);
       if (is_object($result)) {
            if ($result->status) {
                $data_return['status'] = TRUE;
                $data_return['value'] = $result->value;
            } 
        }
        return $data_return;
 }

 /**
     * API mua goi
     * @param type $param
     * @return type
     */
    public function pricing_package($param) {
        $data_return = array();
        $data_return['status'] = FALSE;
        $data_return['msg'] = 'Mua gói không thành công !';
        $uri = "pricingAPI/pricing";
        $result = $this->_CI->rest_client->post($uri, $param);
        if (is_object($result)) {
            $msg = array();
            if ($result->status) {
                $data_return['status'] = TRUE;
                $data_return['msg'] = 'Mua gói thành công !';
            } else {
                if (isset($result->data->error) && count($result->data->error) > 0) {
                    foreach ($result->data->error as $key => $error) {
                        $msg[] = $error->msg;
                    }
                    $data_return['msg'] = implode('<br>', $msg);
                }
            }
            $data_return['data'] = $result->data;
        }
        return $data_return;
    }

    /**
     * API lấy các gói của user
     * @param type $param
     * $param = array(
     *      'customer_id' => $customer_id
     *      'status' => 'DEACTIVE'
     * )
     * @return type
     */
    public function get_package_of_user($param) {
        $data_return = array();
        $data_return['state'] = FALSE;
        $data_return['msg'] = 'Không lấy được dữ liệu !';
        $uri = "useProductAPI/usePackages";
        $result = $this->_CI->rest_client->post($uri, $param);
        if (is_object($result) && isset($result->status)) {
            $data_return['state'] = TRUE;
            $data_return['status_code'] = $result->status_code;
            $data_return['msg'] = $result->msg;
            $data_return['data'] = $result->data;
        }
        return $data_return;
    }

    /**
     * API kích hoạt gói
     * @param type $param
     * @return type
     */
    public function active_package($param) {
        $data_return = array();
        $data_return['state'] = FALSE;
        $data_return['msg'] = 'Có lỗi xảy ra. Vui lòng thử lại sau !';
        $uri = "useProductAPI/activePackage";
        $result = $this->_CI->rest_client->post($uri, $param);
        if (is_object($result)) {
            if ($result->status) {
                $data_return['state'] = TRUE;
            }
            $data_return['status_code'] = $result->status_code;
            $data_return['msg'] = $result->msg;
        }
        return $data_return;
    }

    /**
     * API kiểm tra xem có package nào active không
     * @param type $param
     * @return type
     */
    public function check_package_active($param) {
        $data_return = array();
        $data_return['state'] = FALSE;
        $data_return['msg'] = 'Có lỗi xảy ra. Vui lòng thử lại sau !';
        $uri = "useProductAPI/checkPackage";
        $result = $this->_CI->rest_client->post($uri, $param);
        if (is_object($result)) {
            if ($result->status) {
                $data_return['state'] = TRUE;
                $data_return['data'] = $result->data;
            }
            $data_return['status_code'] = $result->status_code;
            $data_return['msg'] = isset($result->msg) ? $result->msg : 'Unknow';
        }
        return $data_return;
    }

    /**
     * API kiểm tra tiền còn dư của user
     * @param type $param
     * @return type
     */
    public function check_balance_used($param) {
        $data_return = array();
        $data_return['state'] = FALSE;
        $data_return['msg'] = 'Có lỗi xảy ra. Vui lòng thử lại sau !';
        $uri = "useProductAPI/checkBalanceUsed";
        $result = $this->_CI->rest_client->post($uri, $param);
        if (is_object($result)) {
            if ($result->status) {
                $data_return['state'] = TRUE;
                $data_return['data'] = $result->data;
            }
            $data_return['status_code'] = $result->status_code;
            $data_return['msg'] = $result->msg;
        }
        return $data_return;
    }

    /**
     * @param type $param
     * array(
     *    'data' => array(
     *                 'product_id',
     *                 'meetingid',->no required
     *                 'description',->no required
     *              )
     * )
     * @return type
     */
    public function minus_money($param) {
        $data_return = array();
        $data_return['state'] = FALSE;
        $data_return['msg'] = 'Có lỗi xảy ra. Vui lòng thử lại sau !';
        $uri = "useProductAPI/useProductDetail";
        $result = $this->_CI->rest_client->post($uri, $param);
        if (is_object($result)) {
            if ($result->status) {
                $data_return['state'] = TRUE;
                $data_return['data'] = $result->data;
            }
            $data_return['status_code'] = $result->status_code;
            $data_return['msg'] = $result->msg;
        }
        return $data_return;
    }

    /**
     * 
     * @param type $customerId
     * 
     */
    public function get_package_pricing_history($customerId) {
        $data_return = array();
        $data_return['state'] = FALSE;
        $data_return['msg'] = 'Có lỗi xảy ra. Vui lòng thử lại sau !';
        $uri = "pricingHistoryAPI/pricingHistories";
        $result = $this->_CI->rest_client->get($uri, $customerId);
        if (is_object($result)) {
            if ($result->status) {
                $data_return['state'] = TRUE;
                $data_return['msg'] = $result->msg;
                $data_return['data'] = (isset($result->data) && $result->data) ? $result->data : array();
            } else {
                $data_return['status_code'] = 'FAIL';
                $data_return['msg'] = 'Có lỗi khi gọi API';
            }
        }
        return $data_return;
    }

}
