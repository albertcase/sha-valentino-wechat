<?php
namespace Lib;

class RedisAPI {

	private $_redis;

	public function __construct() {
		$redis = new \Redis();
   		$redis->connect(REDIS_HOST, REDIS_PORT);
   		$this->_redis = $redis;
	}

	public function retrieveReplyObject($received) {
		$key = $this->generateRedisKey($received);
		$replyObject = $this->replyTriggerQuery($key);
		if($replyObject) {
			$replyObject->fromUserName = $received->ToUserName;
	  		$replyObject->toUserName = $received->FromUserName;
	  		return $replyObject;
		} 
		return NULL;
	}

	public function getAccessToken() {
		return $this->getAccessKey();
	}

	public function getJSApiTicket() {
		return $this->getAccessKey('jsapi_ticket');
	}

	private function getAccessKey($type = 'access_token') {
		$key = WECHAT_TOKEN_PREFIX . $type;
  		if($key_value = $this->_redis->get($key)) {
    		return unserialize($key_value);
  		} else {
    		$key_value = '';
    		$expires_in = '';
    		if($type == 'access_token') {
				$wechatAPI = new WechatAPI(TOKEN, APPID, APPSECRET);
  				$data = $wechatAPI->getAccessToken();
  				if(isset($data->access_token)) {
  					$key_value = $data->access_token;
	        		$expires_in = $data->expires_in - AHEADTIME;
  				}
		    } else {
		      $wechatJSSDKAPI = new JSSDKAPI($this->getAccessKey('access_token'));
		      $data = $wechatJSSDKAPI->getTicket($type);
		      if($data->ticket){
		        $key_value = $data->ticket;
		        $expires_in = $data->expires_in - AHEADTIME;
		      } 
		    }
		    $this->_redis->set($key, serialize($key_value));
			$this->_redis->setTimeout($key, $expires_in);
			return $key_value;
  		}
	}

	public function get($key) {
		$key_value = $this->_redis->get($key);
		return unserialize($key_value);
	}

	public function jssdkConfig($url) {
		$RedisAPI = new \Lib\RedisAPI();
		$jsapi_ticket = $this->getJSApiTicket();
		$wechatJSSDKAPI = new \Lib\JSSDKAPI();
		return json_encode($wechatJSSDKAPI->getJSSDKConfig(APPID, $jsapi_ticket, $url));
	}
}