<?php

define("BASE_URL", 'http://guitarstrapvalentino.samesamechina.com/');
define("TEMPLATE_ROOT", dirname(__FILE__) . '/../template');
define("VENDOR_ROOT", dirname(__FILE__) . '/../vendor');

//User
define("USER_STORAGE", 'COOKIE');

//Wechat Vendor
define("WECHAT_VENDOR", 'default'); // default | curio

//Wechat config info
define("TOKEN", '?????');
define("APPID", 'wxeb57276615f0d9f1');
define("APPSECRET", '42ac444f36a854b3dc3c66bdc59c98cc');
define("APPMCHID", '1339055101');
define("APPKEY", '0e861438632e4359929e9dcc143acd47');
define("NOWTIME", date('Y-m-d H:i:s'));
define("AHEADTIME", '100');

define("NONCESTR", '?????');
define("CURIO_AUTH_URL", '?????'); 

//Redis config info
define("REDIS_HOST", '127.0.0.1');
define("REDIS_PORT", '6379');

//Database config info
define("DBHOST", '10.10.153.132');
define("DBUSER", 'root');
define("DBPASS", '4IF5SvHFFBFhRXi0');
define("DBNAME", 'valentino_valentine');

//Wechat Authorize
define("CALLBACK", 'wechat/callback');
define("SCOPE", 'snsapi_userinfo');

//Wechat Authorize Page
define("AUTHORIZE_URL", '[
	"/"
]');

//Account Access
define("OAUTH_ACCESS", '{
	"xxxx": "samesamechina.com" 
}');
define("JSSDK_ACCESS", '{
	"xxxx": "samesamechina.com"
}');

define("ENCRYPT_KEY", '29FB77CB8E94B358');
define("ENCRYPT_IV", '6E4CAB2EAAF32E90');

define("WECHAT_TOKEN_PREFIX", 'wechat:token:');







