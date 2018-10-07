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
        $imagen = $dom->find('div.foto--oculta figure.foto a.posicionador meta');

        $title = (empty($titulo[0]->innertext)) ? null : $titulo[0]->innertext;
        $source = (empty($url . $titulo[0]->href)) ? null : $url . $titulo[0]->href;
        $image = (empty($imagen[2]->content.PHP_EOL)) ? null : $imagen[2]->content.PHP_EOL;
        
        $publisher = "elpais";

        $this->setUrl($source);
        $articulo = $this->getContentUrl();
        $domArticulo = HtmlDomParser::str_get_html($articulo);
        $body = (empty($domArticulo->find('div.articulo-cuerpo')[0]->innertext)) ? null : 
                $domArticulo->find('div.articulo-cuerpo')[0]->innertext;

        if ($this->saveFeed($title, $body, $image, $source, $publisher)) {
            return ExitCode::OK;
        } else {
            echo 'Algo falló'.PHP_EOL;
            return ExitCode::DATAERR;
        }
    }

}
