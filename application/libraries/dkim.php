<?php

/* * *************************************************************************\
 *  PHP-DKIM ($Id: dkim.php,v 1.2 2008/09/30 10:21:52 evyncke Exp $)
 *  
 *  Copyright (c) 2008 
 *  Eric Vyncke
 *          
 * This program is a free software distributed under GNU/GPL licence.
 * See also the file GPL.html
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR 
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * ************************************************************************* */

/* * *************************************************************************\
 *  DKIM-CFG ($Id: dkim-cfg-dist.php,v 1.2 2008/09/30 10:21:52 evyncke Exp $)
 *  
 *  Copyright (c) 2008 
 *  Eric Vyncke
 *          
 * This program is a free software distributed under GNU/GPL licence.
 * See also the file GPL.html
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR 
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * ************************************************************************* */

// Uncomment the $this->open_SSL_pub and $this->open_SSL_priv variables and
// copy and paste the content of the public- and private-key files INCLUDING
// the first and last lines (those starting with ----)



class dkim {

    var $open_SSL_pub = "-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDcXAoYymhSxryyMsTsthLjzapM
        uZRca1Aka8vRbgQYkgz/J6PzMkBzv+SifFEp43gn3ziLc+0vOBSC3IAnFGJ4GmuR
        taefCMeapBQlMgzQ3G/LAsXyqlaxyG+ImRJVuy3f3k7sdoSpfZv0/Dkc7nhD7Opf
        Z4quEBBhVACy58YdlQIDAQAB
      -----END PUBLIC KEY-----";
    var $open_SSL_priv = "-----BEGIN RSA PRIVATE KEY-----
        MIICXQIBAAKBgQDcXAoYymhSxryyMsTsthLjzapMuZRca1Aka8vRbgQYkgz/J6Pz
        MkBzv+SifFEp43gn3ziLc+0vOBSC3IAnFGJ4GmuRtaefCMeapBQlMgzQ3G/LAsXy
        qlaxyG+ImRJVuy3f3k7sdoSpfZv0/Dkc7nhD7OpfZ4quEBBhVACy58YdlQIDAQAB
        AoGAE/PJfkElfQk9oKz0I7LAtxuyJcxP4KZe1U1lYQsjF85xmtDOCYEtUM25N/Ul
        rDNKd+HATvAqM7JSOR8aA2/XEnne7jSVz4v0D5wseCd0ylVl8xNeVfGANFU5FDng
        CHhzeG0OyiU9l4OhudX18uwT/H8p3LtqjWGhKTHMXko5vMECQQDud5xSKNbVhnMz
        NfH07xvSAQPCyIaTS026KWBdFguLG/F72C00FKjUzeudprIfzJsazSvCxDbVfTvp
        v357znsZAkEA7I+b2S8NJmpUYkhmUjbpJa+OVT2lY3v/IUgUQwyrJfpAgLJQ/UAV
        UHwBRbtdAD5mrcYPm9UvhS+KaRDL6HjB3QJBALlv8/SD44QJ2H2DPpMceULWHSmU
        K+pQjbHtSQ05/mH/qcqHcadlRWCufMGMhklqH1c5IwWC9a0QhM2hZuc5yskCQHhg
        N3kT9UgYEWqV1uN9J7TSmcYMgY2XOmNwL0dTOgAwUQRsOMQ2COKUx3z5c8C9ADjr
        MWQl3nGSmIcQUgKw+E0CQQDQDZaU+GOYYLNyp68EMxWQrK2GImNXZoGB5UKEFb3B
        nCxfxqqKz+KKCi8FmBpM1dScFUxbxap/u9Gv+HIc9Uz9
        -----END RSA PRIVATE KEY-----";
    // DKIM Configuration
    // Domain of the signing entity (i.e. the email domain)
    // This field is mandatory
    var $DKIM_d = 'topmito.edu.vn';
    // Default identity 
    // Optional (can be left commented out), defaults to no user @$this->DKIM_d
    //$DKIM_i='@example.com' ; 
    // Selector, defines where the public key is stored in the DNS
    //    $this->DKIM_s._domainkey.$this->DKIM_d
    // Mandatory 
    var $DKIM_s = 'dkim._domainkey';

    function __construct() {
        if ($this->open_SSL_pub == '' or $this->open_SSL_priv == '') {
            die("DKIM not configured, please run:<ol>
	<li>openssl genrsa -out key.priv 384</li>
	<li>openssl rsa -in key.priv -out key.pub -pubout -outform PEM</li>
	</ol> 
	Then copy & paste the public and private keys into dkim-cfg.php");
        }
    }

    function BuildDNSTXTRR() {

        $pub_lines = explode("\n", $this->open_SSL_pub);
        $txt_record = "$this->DKIM_s._domainkey\tIN\tTXT\t\"v=DKIM1\\; k=rsa\\; g=*\\; s=email\; h=sha1\\; t=s\\; p=";
        foreach ($pub_lines as $pub_line)
            if (strpos($pub_line, '-----') !== 0)
                $txt_record.=$pub_line;
        $txt_record.="\;\"";
        print("Excellent, you have DKIM keys
	You should add the following DNS RR:
	$txt_record");
    }

    function DKIMQuotedPrintable($txt) {
        $tmp = "";
        $line = "";
        for ($i = 0; $i < strlen($txt); $i++) {
            $ord = ord($txt[$i]);
            if (((0x21 <= $ord) && ($ord <= 0x3A)) || $ord == 0x3C || ((0x3E <= $ord) && ($ord <= 0x7E)))
                $line.=$txt[$i];
            else
                $line.="=" . sprintf("%02X", $ord);
        }
        return $line;
    }

    function DKIMBlackMagic($s) {
        if (openssl_sign($s, $signature, $this->open_SSL_priv))
            return base64_encode($signature);
        else
            die("Cannot sign");
    }

    function NiceDump($what, $body) {
        print("After canonicalization ($what):\n");
        for ($i = 0; $i < strlen($body); $i++)
            if ($body[$i] == "\r")
                print("'OD'");
            elseif ($body[$i] == "\n")
                print("'OA'\n");
            elseif ($body[$i] == "\t")
                print("'09'");
            elseif ($body[$i] == " ")
                print("'20'");
            else
                print($body[$i]);
        print("\n------\n");
    }

    function SimpleHeaderCanonicalization($s) {
        return $s;
    }

    function RelaxedHeaderCanonicalization($s) {
        // First unfold lines
        $s = preg_replace("/\r\n\s+/", " ", $s);
        // Explode headers & lowercase the heading
        $lines = explode("\r\n", $s);
        foreach ($lines as $key => $line) {
            list($heading, $value) = explode(":", $line, 2);
            $heading = strtolower($heading);
            $value = preg_replace("/\s+/", " ", $value); // Compress useless spaces
            $lines[$key] = $heading . ":" . trim($value); // Don't forget to remove WSP around the value
        }
        // Implode it again
        $s = implode("\r\n", $lines);
        // Done :-)
        return $s;
    }

    function SimpleBodyCanonicalization($body) {
        if ($body == '')
            return "\r\n";

        // Just in case the body comes from Windows, replace all \r\n by the Unix \n
        $body = str_replace("\r\n", "\n", $body);
        // Replace all \n by \r\n
        $body = str_replace("\n", "\r\n", $body);
        // Should remove trailing empty lines... I.e. even a trailing \r\n\r\n
        // TODO
        while (substr($body, strlen($body) - 4, 4) == "\r\n\r\n")
            $body = substr($body, 0, strlen($body) - 2);
//	NiceDump('SimpleBody',$body) ;
        return $body;
    }

    function AddDKIM($headers_line, $subject, $body) {

//??? a tester	$body=str_replace("\n","\r\n",$body) ;
        $DKIM_a = 'rsa-sha1'; // Signature & hash algorithms
        $DKIM_c = 'relaxed/simple'; // Canonicalization of header/body
        $DKIM_q = 'dns/txt'; // Query method
        $DKIM_t = time(); // Signature Timestamp = number of seconds since 00:00:00 on January 1, 1970 in the UTC time zone
        $subject_header = "Subject: $subject";
        $headers = explode("\r\n", $headers_line);
        foreach ($headers as $header)
            if (strpos($header, 'From:') === 0)
                $from_header = $header;
            elseif (strpos($header, 'To:') === 0)
                $to_header = $header;
        $from = str_replace('|', '=7C', $this->DKIMQuotedPrintable($from_header));
        $to = str_replace('|', '=7C', $this->DKIMQuotedPrintable($to_header));
        $subject = str_replace('|', '=7C', $this->DKIMQuotedPrintable($subject_header)); // Copied header fields (dkim-quoted-printable
        $body = $this->SimpleBodyCanonicalization($body);
        $DKIM_l = strlen($body); // Length of body (in case MTA adds something afterwards)
        $DKIM_bh = base64_encode(pack("H*", sha1($body))); // Base64 of packed binary SHA-1 hash of body
        $i_part = ($this->DKIM_s == '') ? '' : " i=$this->DKIM_s;";
        $b = ''; // Base64 encoded signature
        $dkim = "DKIM-Signature: v=1; a=$DKIM_a; q=$DKIM_q; l=$DKIM_l; s=$this->DKIM_s;\r\n" .
                "\tt=$DKIM_t; c=$DKIM_c;\r\n" .
                "\th=From:To:Subject;\r\n" .
                "\td=$this->DKIM_d;$i_part\r\n" .
                "\tz=$from\r\n" .
                "\t|$to\r\n" .
                "\t|$subject;\r\n" .
                "\tbh=$DKIM_bh;\r\n" .
                "\tb=";
        $to_be_signed = $this->RelaxedHeaderCanonicalization("$from_header\r\n$to_header\r\n$subject_header\r\n$dkim");
        
        $b = $this->DKIMBlackMagic($to_be_signed);
        return "X-DKIM: php-dkim.sourceforge.net\r\n" . $dkim . $b . "\r\n";
    }

}
