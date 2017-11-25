<?php
/**
 * Created by PhpStorm.
 * User: Ali
 * Date: 11/23/2017
 * Time: 8:06 PM
 */

class Game
{
    public $farmerCount;
    public $farmerCost;

    public $lumberjackCount;

    function __construct()
    {
        $this->farmerCount = 0;
        $this->lumberjackCount = 0;
        $this->farmerCost = 1;


    }
    function newFarmer()
    {
        $this->farmerCost += 10;
        $newFarmer = $this->farmerCount++;
        return $newFarmer;
    }
}