<?php
namespace CampaignBundle;

use Core\Controller;

class PageController extends Controller {

	public function indexAction() {	
		$this->render('index');
	}

	public function matchAction() {	
		global $user;

		$request = $this->request;
		$fields = array(
			'id' => array('notnull', '120'),
		);
		$request->validation($fields);
		$id = $request->query->get('id');
		$databaseAPI = new \Lib\DatabaseAPI();
		$product = $databaseAPI->loadMakeById($id);
		$ismy = 1;
		//绑定
		if ($user->uid != $product->uid) {
			$ismy = 0;
			$databaseAPI->bandShare($user->uid, $product->uid);
			$databaseAPI->bandShare($product->uid, $user->uid);
		}
		
		$this->render('match', array('ismy' => $ismy));
	}

	public function loginAction() {
		$user = new \stdClass();
		$user->uid = 2;
		$user->openid = '123';
		$user->nickname = 'vincen';
		$user->headimgurl = '111';
		setcookie('_user', json_encode($user), time()+3600*24*30, '/');

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

	public function bandAction() {
		ini_set('display_errors', '1');
		$request = $this->request;
		$fields = array(
			'id' => array('notnull', '120'),
		);
		$request->validation($fields);
		$id = $request->query->get('id');
		$databaseAPI = new \Lib\DatabaseAPI();
		$product = $databaseAPI->loadMakeById($id);
		//绑定
		$databaseAPI->bandShare(10, $product->uid);
		$databaseAPI->bandShare($product->uid, 10);
		
		$this->render('index', array('product' => $product));
    }
}