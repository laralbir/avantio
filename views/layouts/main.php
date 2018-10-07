<?php
/* @var $this \yii\web\View */
/* @var $content string */

use app\widgets\Alert;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
    <head>
        <meta charset="<?= Yii::$app->charset ?>">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?= Html::csrfMetaTags() ?>
        <title><?= Html::encode($this->title) ?></title>
        <?php $this->head() ?>
    </head>
    <body>
        <?php $this->beginBody() ?>

        <div class="wrap">



            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item ">
                            <a class="nav-link" href="/">Inicio <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item ">
                            <?= Html::a('Crear Feed', ['create'], ['class' => 'nav-link']) ?>
                        </li>
                    </ul>
                </div>
            </nav>

            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Inicio</a></li>
                        <?php
                        for ($i = 0; $i < count($this->params['breadcrumbs']); $i++) {
                            if(!is_array($this->params['breadcrumbs'][$i])){
                                echo '<li class="breadcrumb-item active" aria-current="page">' . $this->params['breadcrumbs'][$i] . '</li>';
                            }else{                                
                                echo '<li class="breadcrumb-item active" aria-current="page">' . $this->params['breadcrumbs'][$i]['label'] . '</li>';
                            }
                        }
                        ?>

                    </ol>
                </nav>
                <?= Alert::widget() ?>
                <?= $content ?>
            </div>
        </div>

        <footer class="footer">
            <div class="container">
                <p class="pull-left">&copy; My Company <?= date('Y') ?></p>

                <p class="pull-right"><?= Yii::powered() ?></p>
            </div>
        </footer>

        <?php $this->endBody() ?>
    </body>
</html>
<?php $this->endPage() ?>
