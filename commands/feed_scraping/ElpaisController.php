<?php

namespace app\commands\feed_scraping;

use yii\console\ExitCode;
use Sunra\PhpSimple\HtmlDomParser;

class ElpaisController extends ScrapingController {

    public function actionIndex() {

        $url = 'https://elpais.com';
        $this->setUrl($url);
        $elPais = $this->getContentUrl();
        $dom = HtmlDomParser::str_get_html($elPais);
        $titulo = $dom->find('article.articulo--primero div.articulo__interior h2.articulo-titulo a');
        $imagen = $dom->find('article.articulo--primero div.articulo__interior figure.foto a img');

        $title = $titulo[0]->innertext;
        $source = $url.$titulo[0]->href;
        $image = 'https' . $imagen[0]->src;
        $publisher = "elpais";

        $this->setUrl($source);
        $articulo = $this->getContentUrl();
        $domArticulo = HtmlDomParser::str_get_html($articulo);
        $body = $domArticulo->find('div.articulo-cuerpo')[0]->innertext;

        $this->saveFeed($title, $body, $image, $source, $publisher);
        
        
        return ExitCode::OK;
    }

}
