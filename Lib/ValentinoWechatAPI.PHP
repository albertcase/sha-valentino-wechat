<?php
namespace Lib;

use Core\Response;

class ValentinoWechatAPI {
	
	public function wechatAuthorize($current_url) {
    	$response = new Response();
    	$param = [];
    	$callback_url = BASE_URL.'wechat/callback';
		$redirect_url = urlencode($this->generateRedirectUrl($callback_url, $param));
		$api_url = 'http://valentinowechat.samesamechina.com/v1/wx/web/oauth2/authorize';
		$redirect = $this->generateRedirectUrl($api_url, array(
				'redirect_uri' => $redirect_url,
				'scope' => SCOPE,
			));
		$this->redirect($redirect);
  	}

	public function generateUrl($router, $query = array(), $absolute = false){
		if($query) {
			$url = $router . '?' .http_build_query($query);
		} else {
			$url = $router;
		}
		if($absolute) {
			if(BASE_URL) {
				$base_url = BASE_URL;
			} else {
				$base_url = 'http://' . $_SERVER['HTTP_HOST'];
			}
			return $url = $base_url  . '/' . $url;
		}
		return $url;
	}

	private function generateRedirectUrl($url, $param) {
	    $parse_url = parse_url(urldecode($url));
	    $base = $parse_url['scheme'] . '://' . $parse_url['host'] . $parse_url['path'];
	    if(isset($parse_url['query'])) {
	      parse_str($parse_url['query'], $query);
	      $param = array_merge($query, $param);
	    }
	    return $base . '?' . http_build_query($param);
  	}
}