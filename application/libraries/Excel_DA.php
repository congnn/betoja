<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Excel
 *
 * @author Tùng Arsenal
 */
class Excel_DA {

    public function __construct() {
        require_once APPPATH . "/third_party/PHPExcel.php";
    }
}
