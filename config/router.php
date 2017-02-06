<?php

$routers = array();
$routers['/wechat/oauth2'] = array('WechatBundle\Wechat', 'oauth');
$routers['/wechat/callback'] = array('WechatBundle\Wechat', 'callback');
$routers['/wechat/curio/callback'] = array('WechatBundle\Curio', 'callback');
$routers['/wechat/curio/receive'] = array('WechatBundle\Curio', 'receiveUserInfo');
$routers['/wechat/ws/jssdk/config/webservice'] = array('WechatBundle\WebService', 'jssdkConfigWebService');
$routers['/wechat/ws/jssdk/config/js'] = array('WechatBundle\WebService', 'jssdkConfigJs');
$routers['/ajax/post'] = array('CampaignBundle\Api', 'form');
$routers['/'] = array('CampaignBundle\Page', 'index');
$routers['/clear'] = array('CampaignBundle\Page', 'clearCookie');
$routers['/match'] = array('CampaignBundle\Page', 'match');
$routers['/reservation'] = array('CampaignBundle\Page', 'reservation');
$routers['/login'] = array('CampaignBundle\Page', 'login');
$routers['/api/make'] = array('CampaignBundle\Api', 'make');
$routers['/api/list'] = array('CampaignBundle\Api', 'list');
$routers['/api/submit'] = array('CampaignBundle\Api', 'submit');
$routers['/api/band'] = array('CampaignBundle\Page', 'band');
$routers['/api/islogin'] = array('CampaignBundle\Api', 'islogin');
$routers['/api/clearmake'] = array('CampaignBundle\Page', 'clearmake');