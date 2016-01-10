<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * M_user
 *
 * Description...
 *
 * @package M_adminuser
 * @author Cong Nguyen <ngoccongtt1@gmail.com>
 * @version 0.0.0
 */
class m_station extends data_base {

    public function __construct() {
        parent::__construct();
    }

    public function setting_table() {
        $this->_table_name = "station";
        $this->_key_name = "id";
        $this->_schema = Array(
            "id", "station_name","station_address"
        );
        $this->_rule = Array(
            "id" => array(
                "type" => "hidden"
            ),
            "station_name" => array(
                'type' => 'text',
                'maxlength' => '255',
                'required' => 'required',
            ),
            "station_address" => array(
                'type' => 'text',
                'maxlength' => '255',
                'required' => 'required',
            )
        );
        $this->_field_form = Array(
            "id" => "ID",
            "station_name" => "Tên ga",
            "station_address" => "Địa chỉ ga"
        );
        $this->_field_table = Array(
            "id" => "ID",
            "station_name" => "Tên ga",
            "station_address" => "Địa chỉ ga"
        );
    }
    public function setting_select() {
        $this->db->select("m.*");
        $this->db->from($this->_table_name . " as m");
    }
    function get_list($where = NULL, $where_not_in = NULL, $limit = 0, $post = 0, $order = NULL) {
        $this->setting_select();
        if (is_array($where)) {
            foreach ($where as $key => $value) {
                if (is_array($value)) {
                    $this->db->where_in($key, $value);
                } else {
                    $this->db->where($key, $value);
                }
            }
        } else if (intval($where) > 0) {
            $this->db->where("m." . $this->_key_name, $where);
        }
        if (is_array($where_not_in)) {
            foreach ($where_not_in as $key => $value) {
                $this->db->where_not_in($key, $value);
            }
        }
        if ($limit) {
            $this->db->limit($limit, $post);
        }
        if ($order) {
            $this->db->order_by($order);
        }
        $query = $this->db->get();
        return $query->result();
    }

}
