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
class Lang extends CI_Controller {

    public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function set($lang = 'vn') {
        $listLang = Array(
            'vn' => 'vietnamese',
            'en' => 'english',
            'jp' => 'japanese'
        );
        if (isset($listLang[$lang])) {
            $this->session->set_userdata('language', $listLang[$lang]);
        }
        redirect();
    }

}
