<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\feed */

$this->title = $model->title;
$this->params['breadcrumbs'][] = ['label' => 'Feeds', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="feed-view">

    <p>
        <?= Html::a('Modificar', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Eliminar', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => '¿Seguro de querer eliminar el feed?',
                'method' => 'post',
            ],
        ]) ?>
    </p>


    
    <div class="content-secondary">
        <h1><?=$model->title?></h1>
        <h2><small>Fuente <a href="<?=$model->source?>" target="_blank">[<?=$model->publisher?>]</a></small></h2>
        <div class="content">
            <?=$model->body?>
            
        </div>
    </div>

</div>
