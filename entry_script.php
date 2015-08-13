<?php   
// change the following paths if necessary
error_reporting(E_ERROR ^ E_WARNING);
define('SMS_ROOT', dirname(__FILE__).DIRECTORY_SEPARATOR);
$yii=dirname(__FILE__).'/../yii_framework/yiilite.php';
$config=dirname(__FILE__).'/protected/config/console.php';

defined('YII_DEBUG') or define('YII_DEBUG',false);
// include Yii bootstrap file
        
/*
echo "系统维护。。。。";
exit;
*/
//区别于 web应用
define('CLI_APP',1);

require_once($yii); 
Yii::createConsoleApplication($config)->run(); 
?>