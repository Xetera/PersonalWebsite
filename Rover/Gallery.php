<?php
/**
 * Created by PhpStorm.
 * User: Ali
 * Date: 12/16/2017
 * Time: 1:05 AM
 */
include_once('../config.php');

// this is going to be dynamically created later with a user search
$rover = new Gallery("FHAZ", 1000);


if (isset($_POST['pageNumber'])){
    $rover->contactAPI(1);
}

class Gallery
{
    // API key being loaded from external file

    private $baseURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?';
    private $PANCAM = 'camera=PANCAM';
    private $apiKey = "&api_key=" . nasaAPI;
    // we might need some sort of const defition to make setting camera names easier
    private $activeCam;
    private $sol;
    private $activePics = [];
    function __construct($cam, $sol) {
        $this->activeCam = $cam;
        $this->sol = $sol;
    }

    function contactAPI($pageNumber) {
        /* requests without page numbers take an eternity, and even with them it feels long
        * so we probably need to query the server and cache the results before the user reaches
        * the end of the page so it looks instant */

        // cURL is unnecessarily complicated but for some reason pecl HTTP requests extension
        // doesn't seem to be working
        $c = curl_init();
        // not sure what sol is so I'm leaving it as the example in the description
        $url = "$this->baseURL" . 'sol=1000&' . "page={$pageNumber}" . $this->activeCam . $this->apiKey;
        curl_setopt($c, CURLOPT_URL, $url);
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        // need a way to confirm the http response before we echo the result
        $output = curl_exec($c);
        curl_close($c);
        

        $json = json_decode($output);
        // loop array
        foreach ($json as $item){
            // loop dict
            foreach ($item as $key => $value){
                array_push($this->activePics, $item[$key]['img_src']);
            }
        }
        // prints weird stuff without unescaped slashes
        echo json_encode($this->activePics, JSON_UNESCAPED_SLASHES);
    }
}