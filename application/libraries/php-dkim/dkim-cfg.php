<?php
/***************************************************************************\
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
*THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 ***************************************************************************/
 
// Uncomment the $open_SSL_pub and $open_SSL_priv variables and
// copy and paste the content of the public- and private-key files INCLUDING
// the first and last lines (those starting with ----)

$open_SSL_pub="-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDcXAoYymhSxryyMsTsthLjzapM
  uZRca1Aka8vRbgQYkgz/J6PzMkBzv+SifFEp43gn3ziLc+0vOBSC3IAnFGJ4GmuR
  taefCMeapBQlMgzQ3G/LAsXyqlaxyG+ImRJVuy3f3k7sdoSpfZv0/Dkc7nhD7Opf
  Z4quEBBhVACy58YdlQIDAQAB
-----END PUBLIC KEY-----" ;

$open_SSL_priv="-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----" ;

// DKIM Configuration

// Domain of the signing entity (i.e. the email domain)
// This field is mandatory
$DKIM_d='topmito.edu.vn' ;  

// Default identity 
// Optional (can be left commented out), defaults to no user @$DKIM_d
//$DKIM_i='@example.com' ; 

// Selector, defines where the public key is stored in the DNS
//    $DKIM_s._domainkey.$DKIM_d
// Mandatory
$DKIM_s='dkim._domainkey' ;

?>