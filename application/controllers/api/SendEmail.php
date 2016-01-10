<?php

class SendEmail extends REST_Controller {

    public function __construct() {
        date_default_timezone_set('Asia/Ho_Chi_Minh'); //setup lai timezone
        parent::__construct();
    }

    public function doSendEmail_post() {
        $data = $this->input->post();
        if($data){
            $emailPass = isset($data['email_pass']) ? $data['email_pass'] : '';
            $emailFrom = isset($data['email_from']) ? $data['email_from'] : '';
            $emailTo = isset($data['email_to']) ? $data['email_to'] : '';
            $content = isset($data['content']) ? $data['content'] : '';
            $subject = isset($data['subject']) ? $data['subject'] : '';
            $title = isset($data['title']) ? $data['title'] : '';
            if($emailPass && $emailFrom && $emailTo){
                $this->settingSendEmail($emailPass, $emailFrom, $emailTo, $content, $subject, $title);
            }
        }
		
        $response = array(
            'status' => true,
            'data' => $data,
            'msg' => 'đã kết nối thành công'
        );
        $this->response($response);
    }
    
    public function settingSendEmail($emailPass,$emailFrom,$emailTo, $content, $subject, $title = "TOPMITO") {
        $config['protocol'] = 'smtp';
//        $config['smtp_host'] = 'ssl://smtp.googlemail.com';
        $config['smtp_host'] = 'ssl://112.78.5.200';
        $config['smtp_port'] = '465';
        $config['smtp_timeout'] = '600';
        $config['smtp_user'] = $emailFrom;
        $config['smtp_pass'] = $emailPass;
        $config['charset'] = 'utf-8';
        $config['newline'] = "\r\n";
        $config['mailtype'] = 'html'; // or html
        $config['validation'] = TRUE; // bool whether to validate email or not

        $this->load->library("email");

        $this->email->initialize($config);
        $this->email->from($emailFrom, $title);
        $this->email->to($emailTo);
        $this->email->cc('');
        $this->email->subject($subject);
        $this->email->message($content);
        $check = $this->email->send();
//         echo $this->email->print_debugger();
        return $check;
    }


}
