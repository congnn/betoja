<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description
 *
 * @author Pham Trong
 */
class Home extends CI_Controller {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
         define("PAGE", "HOME");
    }

    public function index() {
       
     $this->load->view('header');
     $this->load->view('home');
     $this->load->view('footer');
    }

}
