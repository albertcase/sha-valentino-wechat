<?php
namespace WechatBundle;

use Core\Controller;

class ValentinoController extends Controller {

	public function callbackAction() {
		$request = $this->request;
		$fields = array(
			'openid' => array('notnull', '120'),
		);
		$request->validation($fields);
		$userAPI = new \Lib\UserAPI();
		$user = $userAPI->userLogin($request->query->get('openid'));
		if(!$user) {
			$userAPI->userRegister($request->query->get('openid'));
		}
		$url = '';
		$this->redirect($url);
	}

}
