<?php
namespace CampaignBundle;

use Core\Controller;

class PageController extends Controller {

	public function indexAction() {	
		var_dump(json_decode($_COOKIE['_user']));exit;
		$this->render('index');
	}

	public function clearCookieAction() {
		setcookie('_user', json_encode($user), time(), '/');
		$this->statusPrint('success');
	}

	public function collectionsAction() {
		$request = $this->request;
		$fields = array(
			'id' => array('notnull', '120'),
		);
		$request->validation($fields);
		$id = $request->query->get('id');
	}
}