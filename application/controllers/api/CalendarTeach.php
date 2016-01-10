<?php

class CalendarTeach extends REST_Controller {

    public function __construct() {
        date_default_timezone_set('Asia/Ho_Chi_Minh'); //setup lai timezone
        parent::__construct();
    }

    public function createCalendarTeach_post() {
        $data = $this->post();
        if ($data && is_array($data)) {
            $this->load->model("m_calendar_teach");
            $this->load->model('m_hour_teach');
            $list_hour = $this->m_hour_teach->get_list();
            $array_hour = array();
            foreach ($list_hour as $hour) {
                $array_hour[$hour->id] = $hour;
            }
            $data_hour = array(
                'time_start' => (isset($array_hour[$data['hour_id']])) ? $array_hour[$data['hour_id']]->hourBegin : '',
                'time_end' => (isset($array_hour[$data['hour_id']])) ? $array_hour[$data['hour_id']]->hourEnd : '',
            );
            
            $data['id_insert'] = $this->m_calendar_teach->add(array(
                'week' => $data['week'],
                'week_day' => $data['week_day'],
                'hour_id' => $data['hour_id'],
                'year' => $data['year'],
                'date_time' => $data['date_time'],
                'teacher_id' => isset($data['teacher_id']) ? $data['teacher_id'] : 0,
                'assistant_id' => $data['assistant_id'],
                'subject_code' => $data['subject_code'],
                'teacher_type' => $data['teacher_type'],
                'level_class' => $data['level_class'] = $this->_convert_level_class_material($data['level_class']),
                'type_class' => $data['type_class'] = $this->_convert_type_class_material($data['type_class']),
                'status' => $data['status'] = '2',
            ));
            $data['calendar_code'] = $this->_create_calendar_code($data, $data_hour);
            $this->m_calendar_teach->update($data['id_insert'],array('calendar_code' => $data['calendar_code']));
            
            $this->load->model('m_rest_client_lms');
            $rest_add_calendarteach = Rest_Client_Factory::create('add_calendarteachs');
            $data['hourBegin'] = $array_hour[$data['hour_id']]->hourBegin;
            $data['min_begin'] = $data['min_begin'];
            $params = json_encode(array($data));
            $rest_add_calendarteach->add_param('data_calendar', $params);
            $result = $rest_add_calendarteach->send();
            if (!$result || ($result && isset($result->exception))) {
                if ($result) {
                    $response = array(
                        'status' => FALSE,
                        'msg' => $result->message . " - " . $result->debuginfo
                    );
                } else {
                    $response = array(
                        'status' => FALSE,
                        'msg' => 'Không kết nối được API'
                    );
                }
            }
            if (isset($result->data) && count($result->data)) {
                foreach ($result->data as $item) {
                    $data_update['flag'] = 2;
                    $this->m_calendar_teach->update(array('calendar_code' => $item), $data_update);
                }
                $response = array(
                    'status' => true,
                    'msg' => 'đã thêm bản ghi thành công'
                );
            } else {
                $response = array(
                    'status' => FALSE,
                    'msg' => 'Không thể tạo lớp trên LMS'
                );
            }
        } else {
            $response = array(
                'status' => FALSE,
                'msg' => 'Không có dữ liệu gửi lên'
            );
        }


        $this->response($response);
    }

    public function updateCalendarTeach_post() {
        $data = $this->post();
        if ($data && is_array($data)) {
            $this->load->model("m_calendar_teach");

            if (($info_calendar = $this->m_calendar_teach->get_one(array('calendar_code' => $data['calendar_code'])))) {
                $data_update_calendar = array(
                    'calendar_code' => isset($data['calendar_code']) ? $data['calendar_code'] : '',
                    'teacher_id' => isset($data['teacher_id']) ? $data['teacher_id'] : '',
                    'assistant_id' => isset($data['assistant_id']) ? $data['assistant_id'] : '',
                    'flag' => 1,
                );
                if (isset($data['status'])) {
                    //xoa lop
                    $this->m_calendar_teach->update($info_calendar->id, array(
                        'status' => 0,
                    ));
                } else {
                    //cap nhat thong tin lop
                    $this->m_calendar_teach->update($info_calendar->id, $data_update_calendar);
                }

                $this->load->model('m_rest_client_lms');
                $rest_add_calendarteach = Rest_Client_Factory::create('add_calendarteachs');
                $params = json_encode(array($data));
                $rest_add_calendarteach->add_param('data_calendar', $params);
                $result = $rest_add_calendarteach->send();
                if (!$result || ($result && isset($result->exception))) {
                    if ($result) {
                        $response = array(
                            'status' => FALSE,
                            'msg' => $result->message . " - " . isset($result->debuginfo) ? $result->debuginfo : ''
                        );
                    } else {
                        $response = array(
                            'status' => FALSE,
                            'msg' => 'Không kết nối được API'
                        );
                    }
                }
                if (isset($result->data) && count($result->data)) {
                    foreach ($result->data as $item) {
                        $data_update['flag'] = 2;
                        $this->m_calendar_teach->update(array('calendar_code' => $item), $data_update);
                    }
                    $response = array(
                        'status' => true,
                        'msg' => 'đã thêm bản ghi thành công'
                    );
                } else {
                    $response = array(
                        'status' => FALSE,
                        'msg' => 'Không có dữ liệu trả về'
                    );
                }
            } else {
                $response = array(
                    'status' => FALSE,
                    'msg' => 'Không có dữ liệu gửi lên'
                );
            }


            $this->response($response);
        }
    }

    private function _create_calendar_code($data, $array_hour) {
        $calendar_code = '';
        if (count($data) && count($array_hour)) {
            if ($data['type_class'] && $data['level_class'] && $data['date_time']) {
                $hour = $array_hour['time_start'];
                $type_class = $data['type_class'][0];
                $teacher_type = strtoupper($data['teacher_type'][0]);
                $level_class = strtoupper($data['level_class'][0]);
                $date = date('Ymd', $data['date_time']);

                $calendar_code .= $date;
                $calendar_code .= $hour;
                $calendar_code .= $teacher_type . '-';
                $calendar_code .= $type_class;
                $calendar_code .= $level_class;
                $calendar_code .= substr(str_pad($data['id_insert'], 4, '0', STR_PAD_LEFT), -4);
            }
        }
        return $calendar_code;
    }

    private function _convert_level_class_material($level_class) {
        if ($level_class == 'BO') {
            $level_class = 'basic';
        }
        if ($level_class == 'IO') {
            $level_class = 'inter';
        }
        if ($level_class == 'AO') {
            $level_class = 'advan';
        }
        return $level_class;
    }

    private function _convert_type_class_material($type_class) {
        return $type_class;
    }

}
