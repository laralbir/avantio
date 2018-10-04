<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * Main application asset bundle.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/plugins/bootstrap_4.1.3/bootstrap.min.css',
        'css/plugins/fontawesome_5.3.1/all.min.css',
        'css/site.css',
    ];
    public $js = [        
//        'js/plugins/jquery/jquery-3.3.1.min.js',
        'js/plugins/popper/popper.min.js',
        'js/plugins/bootstrap_4.1.3/bootstrap.min.js',
        'js/lib/general.js',
    ];

    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
}
