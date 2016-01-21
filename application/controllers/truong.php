<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Truong extends CI_Controller {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        define("PAGE", "Truong");
    }
 
    public function index() {
         $this->load->model('m_truong');
         $data['truong']=$this->m_truong->get_college();
         $this->load->view('header');
         $this->load->view('truong',$data);
         $this->load->view('footer');
    }
     public function truong_id($id) {
         $this->load->model('m_truong');
         $data['truong']=$this->m_truong->get_college_id($id);
         $this->load->view('header');
         $this->load->view('truong_detail',$data);
         $this->load->view('footer');
    }

}
