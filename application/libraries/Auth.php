<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of auth
 *
 * @author Pham Trong
 */
class Auth {

    //put your code here
    function auth_api($username, $password) {
        $CI =   &get_instance();
        $CI->db->select();
        $CI->db->from('rest_users as u');
        $CI->db->where(array('UserName'=> $username, 'PassWord'=> md5($password)));
        $query = $CI->db->get();
        
        if($query->num_rows()){
            return true;
        }else {
            return false;
        }
    }

}
