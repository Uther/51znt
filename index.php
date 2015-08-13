<?php 
//error_reporting(0);   //正式运行
//error_reporting(E_ERROR ^ E_NOTICE ^ E_WARNING);
error_reporting(E_ERROR ^ E_WARNING);//正式运行
//error_reporting(E_ALL);///调试、找错时请去掉///前空格
ini_set('display_errors',true);
ini_set('session.cookie_domain','.51znt.com');


//set_time_limit(0);
$url = preg_match('/(.*?)\.51znt\.com/',$_SERVER["HTTP_HOST"],$row);
if ($url && $row[1]!='www' && $row[1]!='fc' && $row[1]!='it' && $row[1]!='zh' && $row[1]!='dev' && $row[1]!='test')
{
    $URIRedirect=$_SERVER['REQUEST_URI'];
    if(strtolower($URIRedirect)=='/index.php') {
        $URIRedirect='/';
    }
    header('HTTP/1.1 301 Moved Permanently');
    header('Location:http://www.51znt.com'.$URIRedirect);
    exit();
}
if (strtolower($_SERVER['REQUEST_URI'])=='/index.php')
{
    $URIRedirect=$_SERVER['REQUEST_URI'];
    if(strtolower($URIRedirect)=='/index.php') {
        $URIRedirect='/';
    }
    header('HTTP/1.1 301 Moved Permanently');
    header('Location:http://'.$_SERVER["HTTP_HOST"].$URIRedirect);
    exit();
} 
// change the following paths if necessary
$yii=dirname(__FILE__).'/../yii_framework/yii.php';
$config=dirname(__FILE__).'/protected/config/main.php';

// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',true);
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',3);

require_once($yii);

Yii::createWebApplication($config)->run();

/*$ip = CComm::GetClientIP();
if(!in_array($ip, array('115.220.207.190','127.0.0.1','192.168.1.77'))){
	echo '<span style="background:white;height:20px;width:100%;position:fixed;top:0;color:red;text-align:center;z-index:10000;">网站6月8日14点开始升级...</span>';
}else{
	echo '<span style="background:white;height:20px;width:100%;position:fixed;top:0;color:red;text-align:center;z-index:10000;">网站6月8日14点开始升级...</span>';
}*/

?>
