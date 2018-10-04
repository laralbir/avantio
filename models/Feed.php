<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "feed".
 *
 * @property int $id
 * @property string $title
 * @property string $body
 * @property string $image
 * @property string $source
 * @property string $publisher
 * @property string $fecha
 */
class Feed extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'feed';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['body', 'image', 'source'], 'string'],
            [['fecha'], 'safe'],
            [['title'], 'string', 'max' => 100],
            [['publisher'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'body' => 'Body',
            'image' => 'Image',
            'source' => 'Source',
            'publisher' => 'Publisher',
            'fecha' => 'Fecha',
        ];
    }
}
