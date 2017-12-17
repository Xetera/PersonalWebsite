<?php
/**
 * Created by PhpStorm.
 * User: Ali
 * Date: 12/16/2017
 * Time: 3:00 AM
 */
switch(PHP_INT_SIZE) {
    case 4:
        echo '32-bit version of PHP';
        break;
    case 8:
        echo '64-bit version of PHP';
        break;
    default:
        echo 'PHP_INT_SIZE is ' . PHP_INT_SIZE;
}
phpinfo();