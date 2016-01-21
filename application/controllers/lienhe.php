<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Lienhe extends CI_Controller {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
         define("PAGE", "ows_lab");
    }

    public function index() {
     $this->load->view('header');
     $this->load->view('lienhe');
     $this->load->view('footer');
    }

}
