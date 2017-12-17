<?php
/**
 * Created by PhpStorm.
 * User: Ali
 * Date: 12/16/2017
 * Time: 1:05 AM
 */

$rover = new Rover();

if ($_POST['pageNumber'] == 1){
    $rover->contact(1);
}

class Rover
{
    // API key being loaded from external file
    private $baseURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?';
    private $PANCAM = 'camera=PANCAM';
    function __construct() {


    }

    public function requestRover(){
        return "Pink Elephant";
    }

    function contact($pageNumber){

        // we're gonna need to change the page number that's being queried based on the scroll amount
        $req = new HttpRequest("$this->baseURL" ."so=1000&". $this->PANCAM . "&api_key=" . nasaAPI, HTTPRequest::METH_GET);
        try{
            $req->send();
            if ($req->getResponseCode() == 200){
                return $req->getResponseBody();
            }


        }
        catch (HttpException $exception){
            die ($exception);
        }
    }
}