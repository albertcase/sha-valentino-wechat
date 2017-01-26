<?php
namespace CampaignBundle;

use Core\Controller;


class ApiController extends Controller {

    public function __construct() {

    	global $user;

        parent::__construct();

        if(!$user->uid) {
	        $this->statusPrint('100', 'access deny!');
        } 
    }

    public function formAction() {

    	global $user;

    	$request = $this->request;
    	$fields = array(
			'name' => array('notnull', '120'),
			'cellphone' => array('cellphone', '121'),
			'address' => array('notnull', '122'),
		);
		$request->validation($fields);
		$DatabaseAPI = new \Lib\DatabaseAPI();
		$data = new \stdClass();
		$data->uid = $user->uid;
		$data->name = $request->request->get('name');
		$data->cellphone = $request->request->get('cellphone');
		$data->address = $request->request->get('address');

		if($DatabaseAPI->insertInfo($data)) {
			$data = array('status' => 1);
			$this->dataPrint($data);
		} else {
			$this->statusPrint('0', 'failed');
		}
    }

    public function makeAction() {

    	global $user;

    	$request = $this->request;
    	$fields = array(
			'background' => array('notnull', '120'),
			'color' => array('notnull', '121'),
			'content' => array('notnull', '122'),
		);
		$request->validation($fields);
		$DatabaseAPI = new \Lib\DatabaseAPI();
		$data = new \stdClass();
		$data->uid = $user->uid;
		$data->background = $request->request->get('background');
		$data->color = $request->request->get('color');
		$data->content = $request->request->get('content');

		if($rs = $DatabaseAPI->insertMake($data)) {
			$data = array('status' => 1, 'msg' => $rs);
			$this->dataPrint($data);
		} else {
			$this->statusPrint('0', 'failed');
		}
    }

    public function loadAction() {

    	global $user;

    	$request = $this->request;
    	$fields = array(
			'id' => array('notnull', '120'),
		);
		$request->validation($fields);
		$DatabaseAPI = new \Lib\DatabaseAPI();
		$id = $request->request->get('id');
		if($rs = $DatabaseAPI->loadMakeById($id)) {
			$data = array('status' => 1, 'msg' => $rs);
			$this->dataPrint($data);
		} else {
			$this->statusPrint('0', 'failed');
		}
    }

    public function listAction() {

    	global $user;

		$DatabaseAPI = new \Lib\DatabaseAPI();
		$rs = $DatabaseAPI->loadMakeByUid($user->id)
		$list = $DatabaseAPI->loadListByUid($user->uid);
		$data = array('status' => 1, 'msg' => $rs, 'list'=>$list);
		$this->dataPrint($data);
		
    }

    public function bandAction() {

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
		var_dump($product);exit;
		$this->render('index', array('product' => $product));
    }

    public function submitAction() {

    	global $user;
    	if(!$user->uid) {
	        $this->statusPrint('100', 'access deny!');
        } 
    	$request = $this->request;
    	$fields = array(
			'sex' => array('notnull', '120'),
			'name' => array('notnull', '121'),
			'mobile' => array('cellphone', '122'),
			'email' => array('notnull', '123'),
			'store' => array('notnull', '124')
		);
		$request->validation($fields);
		$DatabaseAPI = new \Lib\DatabaseAPI();
		$data = new \stdClass();
		$data->uid = $user->uid;
		$data->sex = $request->request->get('sex');
		$data->name = $request->request->get('name');
		$data->mobile = $request->request->get('mobile');
		$data->email = $request->request->get('email');
		$data->store = $request->request->get('store');

		if($DatabaseAPI->insertSubmit($data)) {
			$data = array('status' => 1);
			$this->dataPrint($data);
		} else {
			$this->statusPrint('0', 'failed');
		}
    }

}
