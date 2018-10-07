<?php

namespace app\commands\feed_scraping;

use yii\console\Controller;
use Sunra\PhpSimple\HtmlDomParser;
use app\models\Feed;

class ScrapingController extends Controller {

    private $url = null;

    public function getContentUrl() {
        $url = $this->url;
        if (!empty($url)) {
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $data = curl_exec($ch);
            curl_close($ch);
            return $data;
        } else {
            return "";
        }
    }

    public function setUrl($url) {
        $this->url = $url;
    }

    public function saveFeed($title, $body, $image, $source, $publisher) {
        $result = false;
        
        if (
                !empty($title) && !empty($body) &&
                !empty($image) && !empty($source) &&
                !empty($publisher)
        ) {

            try {
                
                $feed = new Feed();

                $feed->fecha = date('Y-m-d H:i:s');
                $feed->title = $title;
                $feed->body = $body;
                $feed->image = $image;
                $feed->source = $source;
                $feed->publisher = $publisher;

                $result = $feed->save(false);
                var_dump($result);
            } catch (Exception $e) {
                echo $e;
                $result = false;
            }
        }
        return $result;
    }

}
