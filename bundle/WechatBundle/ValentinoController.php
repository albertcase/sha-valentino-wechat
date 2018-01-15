<?php
namespace WechatBundle;

use Core\Controller;

class ValentinoController extends Controller {

	public function callbackAction() {
		$request = $this->request;
		$redirect_uri = $request->query->get('redirect_uri');
		$url = urldecode($redirect_uri);
		if('snsapi_userinfo' == SCOPE) {
			$wechatUserAPI = new \Lib\WechatAPI();
			$info = $wechatUserAPI->getSnsUserInfo($request->query->get('openid'), $request->query->get('access_token'));
			$userAPI = new \Lib\UserAPI();
			$user = $userAPI->userLogin($request->query->get('openid'));
			if(!$user) {
				$userAPI->userRegisterOauth($info);
			}
		} else {
			$userAPI = new \Lib\UserAPI();
			$user = $userAPI->userLogin($request->query->get('openid'));
			if(!$user) {
				$userAPI->userRegister($request->query->get('openid'));
			}
		}
		$this->redirect($url);
	}

}
