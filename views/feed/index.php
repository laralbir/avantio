<?php

use yii\helpers\Html;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $searchModel app\models\feedSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Feeds';
$this->params['breadcrumbs'][] = $this->title;

$this->registerCssFile(Yii::getAlias('@web') . '/css/yii2/feed/listado.css');
?>
<div class="feed-index">

    <h1><?= Html::encode($this->title) ?></h1>


    <div class="card-columns">

        <?php
        for ($i = 0; $i < count($feedsHoy); $i++) {
            echo '  
                <div class="card">
                    <img class="card-img-top" src="' . $feedsHoy[$i]['image'] . '">
                    <div class="card-body">
                      <h5 class="card-title">' . $feedsHoy[$i]['title'] . '</h5>
                      <p class="card-text">' . $feedsHoy[$i]['body'] . '</p>
                    </div>
                    <div class="card-footer">
                    <a href="' . Url::to([$feedsHoy[$i]['id']]) . '"><i class="fas fa-edit"></i></a>
                      <small class="text-muted">Fuente: <a href="' . $feedsHoy[$i]['source'] . '" title="' . $feedsHoy[$i]['source'] . '" target="_blank">[' . $feedsHoy[$i]['publisher'] . ']</a></small>
                    </div>
                </div>
  ';
        }
        ?>

    </div>
</div>
