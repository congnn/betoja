<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
  Thư viện upload nhiều ảnh cùng lúc
  Xây dụng dựa trên Library Upload trong System
 */
class Multi_upload {

    protected $_file_name_override = '';

    public function do_multi_upload($config, $field = 'userfile', $maxDirSize = "10485760") {

        $CI = &get_instance();
        $CI->load->helper('file');
        $return_value = Array();
        if (!is_dir($config['upload_path'])) {
            @mkdir($config['upload_path'], 0755, true);
            @chmod($config['upload_path'], 0755);
        }
        $CI->load->library('upload', $config);
        $CI->upload->initialize($config);
        // Is $_FILES[$field] set? If not, no reason to continue.
//         echo($_FILES[$field]);
        if (!isset($_FILES[$field])) {
            $CI->upload->set_error('upload_no_file_selected');
            return false;
        }

        // Is the upload path valid?
        if (!$CI->upload->validate_upload_path()) {
            // errors will already be set by validate_upload_path() so just return FALSE
            return false;
        }
        $freeMemory = $maxDirSize;
        $dirInfo = get_dir_file_info($config['upload_path'], TRUE);
        foreach ($dirInfo as $file) {
            $freeMemory = $freeMemory - $file["size"];
        }
        //Multiple file upload
        if (is_array($_FILES[$field]) && is_array($_FILES[$field]['name'])) {

            $count = count($_FILES[$field]['name']); //Number of files to process

            for ($i = 0; $i < $count; $i++) {
                // Was the file able to be uploaded? If not, determine the reason why.
                if (!is_uploaded_file($_FILES[$field]['tmp_name'][$i])) {
                    $error = (!isset($_FILES[$field]['error'][$i])) ? 4 : $_FILES[$field]['error'][$i];
                    $errorCode = "";;
                    switch ($error) {
                        case 1: // UPLOAD_ERR_INI_SIZE
                            $CI->upload->set_error('upload_file_exceeds_limit');
                            $errorCode = 'upload_file_exceeds_limit';
                            break;
                        case 2: // UPLOAD_ERR_FORM_SIZE
                            $CI->upload->set_error('upload_file_exceeds_form_limit');
                            $errorCode = 'upload_file_exceeds_form_limit';
                            break;
                        case 3: // UPLOAD_ERR_PARTIAL
                            $CI->upload->set_error('upload_file_partial');
                            $errorCode = 'upload_file_partial';
                            break;
                        case 4: // UPLOAD_ERR_NO_FILE
                            $CI->upload->set_error('upload_no_file_selected');
                            $errorCode = 'upload_no_file_selected';
                            break;
                        case 6: // UPLOAD_ERR_NO_TMP_DIR
                            $CI->upload->set_error('upload_no_temp_directory');
                            $errorCode = 'upload_no_temp_directory';
                            break;
                        case 7: // UPLOAD_ERR_CANT_WRITE
                            $CI->upload->set_error('upload_unable_to_write_file');
                            $errorCode = 'upload_unable_to_write_file';
                            break;
                        case 8: // UPLOAD_ERR_EXTENSION
                            $CI->upload->set_error('upload_stopped_by_extension');
                            $errorCode = 'upload_stopped_by_extension';
                            break;
                        default : $CI->upload->set_error('upload_no_file_selected');
                            $errorCode = 'upload_no_file_selected';
                            break;
                    }
                    $return_value[$i] = $this->uploadFileReturn(false, $errorCode);
                    continue;
                }

                // Set the uploaded data as class variables
                $CI->upload->file_temp = $_FILES[$field]['tmp_name'][$i];
                $CI->upload->file_size = $_FILES[$field]['size'][$i];
                $CI->upload->file_type = preg_replace("/^(.+?);.*$/", "\\1", $_FILES[$field]['type'][$i]);
                $CI->upload->file_type = strtolower(trim(stripslashes($CI->upload->file_type), '"'));
                $CI->upload->file_name = $this->_prep_filename($_FILES[$field]['name'][$i]);
                $CI->upload->file_ext = $CI->upload->get_extension($CI->upload->file_name);
                $CI->upload->client_name = $CI->upload->file_name;

                //Kiểm tra dung lượng
                $itemSize = $_FILES[$field]['size'][$i];
                if ($itemSize > $freeMemory) {
                    $errorCode = 'full_disk';
                    $return_value[$i] = $CI->upload->data();
                    $return_value[$i]['status'] = false;
                    $return_value[$i]['error_msg'] = "Thư mục của bạn không đủ dung lượng.";
                    $return_value[$i]['errorCode'] = $errorCode;
                    continue;
                }

                // Is the file type allowed to be uploaded?
                $checkType = false;
                $checkType = @$CI->upload->is_allowed_filetype();
                if (!$checkType) {
                    $CI->upload->set_error('upload_invalid_filetype');
                    $return_value[$i] = $this->uploadFileReturn(false, 'upload_invalid_filetype');
                    continue;
                }

                // if we're overriding, let's now make sure the new name and type is allowed
                if ($this->_file_name_override != '') {
                    $CI->upload->file_name = $CI->upload->_prep_filename($this->_file_name_override);

                    // If no extension was provided in the file_name config item, use the uploaded one
                    if (strpos($this->_file_name_override, '.') === FALSE) {
                        $CI->upload->file_name .= $CI->upload->file_ext;
                    }

                    // An extension was provided, lets have it!
                    else {
                        $CI->upload->file_ext = $CI->upload->get_extension($this->_file_name_override);
                    }

                    if (!$checkType) {
                        $CI->upload->set_error('upload_invalid_filetype');
                        $return_value[$i] = $this->uploadFileReturn(false, 'upload_invalid_filetype');
                        continue;
                    }
                }

                // Convert the file size to kilobytes
                if ($CI->upload->file_size > 0) {
                    $CI->upload->file_size = round($CI->upload->file_size / 1024, 2);
                }

                // Is the file size within the allowed maximum?
                if (!$CI->upload->is_allowed_filesize()) {
                    $CI->upload->set_error('upload_invalid_filesize');
                    $return_value[$i] = $this->uploadFileReturn(false, 'upload_invalid_filesize');
                    continue;
                }

                // Are the image dimensions within the allowed size?
                // Note: This can fail if the server has an open_basdir restriction.
                if (!$CI->upload->is_allowed_dimensions()) {
                    $CI->upload->set_error('upload_invalid_dimensions');
                    $return_value[$i] = $this->uploadFileReturn(false, 'upload_invalid_dimensions');
                    continue;
                }

                // Sanitize the file name for security
                $CI->upload->file_name = $CI->upload->clean_file_name($CI->upload->file_name);

                // Truncate the file name if it's too long
                if ($CI->upload->max_filename > 0) {
                    $CI->upload->file_name = $CI->upload->limit_filename_length($CI->upload->file_name, $CI->upload->max_filename);
                }

                // Remove white spaces in the name
                if ($CI->upload->remove_spaces == TRUE) {
                    $CI->upload->file_name = preg_replace("/\s+/", "_", $CI->upload->file_name);
                }

                /*
                 * Validate the file name
                 * This function appends an number onto the end of
                 * the file if one with the same name already exists.
                 * If it returns false there was a problem.
                 */
                $CI->upload->orig_name = $CI->upload->file_name;

                if ($CI->upload->overwrite == FALSE) {
                    $CI->upload->file_name = $CI->upload->set_filename($CI->upload->upload_path, $CI->upload->file_name);

                    if ($CI->upload->file_name === FALSE) {
                        $return_value[$i] = $this->uploadFileReturn(false, 'upload_unable_to_write_file');
                        continue;
                    }
                }

                /*
                 * Run the file through the XSS hacking filter
                 * This helps prevent malicious code from being
                 * embedded within a file. Scripts can easily
                 * be disguised as images or other file types.
                 */
                if (true) {
                    if ($CI->upload->do_xss_clean() === FALSE) {
                        $CI->upload->set_error('upload_unable_to_write_file');
                        $return_value[$i] = $this->uploadFileReturn(false, 'upload_unable_to_write_file');
                        continue;
                    }
                }

                /*
                 * Move the file to the final destination
                 * To deal with different server configurations
                 * we'll attempt to use copy() first. If that fails
                 * we'll use move_uploaded_file(). One of the two should
                 * reliably work in most environments
                 */
                if (!@copy($CI->upload->file_temp, $CI->upload->upload_path . $CI->upload->file_name)) {
                    if (!@move_uploaded_file($CI->upload->file_temp, $CI->upload->upload_path . $CI->upload->file_name)) {
                        $CI->upload->set_error('upload_destination_error');
                        $return_value[$i] = $this->uploadFileReturn(false, 'upload_destination_error');
                        continue;
                    }
                }

                /*
                 * Set the finalized image dimensions
                 * This sets the image width/height (assuming the
                 * file was an image). We use this information
                 * in the "data" function.
                 */
                $CI->upload->set_image_properties($CI->upload->upload_path . $CI->upload->file_name);

                $return_value[$i] = $CI->upload->data();
                $return_value[$i] = $this->uploadFileReturn(true, '');
            }
            return $return_value;
        }
        else { //Single file upload, rely on native CI upload class{
            $upload = self::do_upload();
        }
        return $upload;
    }

    private function uploadFileReturn($status = false, $errorCode = "") {
        $CI = &get_instance();
        $return_value = $CI->upload->data();
        $return_value['status'] = $status;
        if ($status) {
            $return_value['error_msg'] = "";
        } else {
            $return_value['error_msg'] = $CI->upload->error_msg[sizeof($CI->upload->error_msg) - 1];
        }
        $return_value['errorCode'] = $errorCode;
        return $return_value;
    }

    protected function _prep_filename($filename) {
        $CI = &get_instance();
        if (strpos($filename, '.') === FALSE OR $CI->upload->allowed_types == '*') {
            return $filename;
        }
        $parts = explode('.', $filename);
        $ext = array_pop($parts);
        $filename = array_shift($parts);
        foreach ($parts as $part) {
            if (!in_array(strtolower($part), $CI->upload->allowed_types) OR $CI->upload->mimes_types(strtolower($part)) === FALSE) {
                $filename .= '.' . $part . '_';
            } else {
                $filename .= '.' . $part;
            }
        }
        $filename .= '.' . $ext;
        return $filename;
    }

}

