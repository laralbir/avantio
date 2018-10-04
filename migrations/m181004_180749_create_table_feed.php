<?php

use yii\db\Migration;

/**
 * Class m181004_180749_create_table_feed
 */
class m181004_180749_create_table_feed extends Migration {

    /**
     * {@inheritdoc}
     */
    public function safeUp() {
        if ($this->db->schema->getTableSchema('feed', true) === null) {
            $this->createTable('feed', [
                'id' => $this->primaryKey(),
                'title' => $this->string(100),
                'body' => $this->text(),
                //image y source al ser URL, pueden tener mas caracteres
                //del máximo de varchar
                'image' => $this->text(),
                'source' => $this->text(),
                'publisher' => $this->string(50),
                'fecha' => $this->dateTime()
            ]);
            $this->createIndex('feed_fecha_idx', 'feed', 'fecha');
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown() {
        echo "m181004_180749_create_table_feed cannot be reverted.\n";

        return false;
    }

    /*
      // Use up()/down() to run migration code without a transaction.
      public function up()
      {

      }

      public function down()
      {
      echo "m181004_180749_create_table_feed cannot be reverted.\n";

      return false;
      }
     */
}
