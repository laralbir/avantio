<?php

class FeedTest extends \Codeception\Test\Unit {

    /**
     * @var \UnitTester
     */
    protected $tester;

    protected function _before() {
        
    }

    protected function _after() {
        
    }

    // tests
    public function testValidacion() {

        $feed = new \app\models\Feed();


        $feed->setAttribute('title', null);
        $this->assertTrue($feed->validate(['title']));        
        $feed->setAttribute('title', 'Muuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuy largo.');
        $this->assertTrue($feed->validate(['title']));        
        $feed->setAttribute('title', 'texto');
        $this->assertTrue($feed->validate(['title']));

        $feed->setAttribute('body', null);
        $this->assertTrue($feed->validate(['body']));        
        $feed->setAttribute('body', 'Muuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuy largo.');
        $this->assertTrue($feed->validate(['body']));        
        $feed->setAttribute('body', 'texto');
        $this->assertTrue($feed->validate(['body']));

        $feed->setAttribute('image', null);
        $this->assertTrue($feed->validate(['image']));        
        $feed->setAttribute('image', 'Muuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuy largo.');
        $this->assertTrue($feed->validate(['image']));        
        $feed->setAttribute('image', 'texto');
        $this->assertTrue($feed->validate(['image']));

        $feed->setAttribute('source', null);
        $this->assertTrue($feed->validate(['source']));        
        $feed->setAttribute('source', 'Muuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuy largo.');
        $this->assertTrue($feed->validate(['source']));        
        $feed->setAttribute('source', 'texto');
        $this->assertTrue($feed->validate(['source']));

        $feed->setAttribute('publisher', null);
        $this->assertTrue($feed->validate(['publisher']));        
        $feed->setAttribute('title', 'Muuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuy largo.');
        $this->assertTrue($feed->validate(['publisher']));        
        $feed->setAttribute('title', 'publisher');
        $this->assertTrue($feed->validate(['publisher']));
        
    }

}
