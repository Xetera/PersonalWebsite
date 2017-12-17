<?php
include('config.php');

class Database
{
    protected $database;
    public $conn;

    function __construct() {
        #establishing connection with the database
        $this->conn = mysqli_connect(databaseHost, mySqlUsername, mySqlPassword, databaseName)
        or die ("Couldn't connect.");

        $checktable = "SHOW TABLES LIKE 'login'";
        $result = $this->conn -> query($checktable);
        $assoc = mysqli_fetch_assoc($result);
        if ($assoc){
            return;
        }

        #checking if login exists
        $table = "CREATE TABLE login(id VARCHAR(10) PRIMARY KEY, username VARCHAR(20), hash TEXT(90), email VARCHAR(50), reg_date TIMESTAMP)";
        $create_table = $this->conn -> query($table);
        if (!$create_table){
            die(mysqli_error($create_table));
        }

    }

    function register($username, $password, $email) {
        #replacing input with escaped strings to prevent injection
        $escapedusername = mysqli_escape_string($this->conn, $username);
        $escapedpassword = mysqli_escape_string($this->conn, $password);

        $hashed = $this-> hash($escapedpassword);
        $id = $this -> generateID();

        $sql = "INSERT INTO login(id,username,hash,email) VALUES('$id', '$escapedusername', '$hashed', '$email')";
        $this->conn -> query($sql) or trigger_error(mysqli_error($this->conn));

        if ($this->conn->affected_rows == 1){
            $this->conn ->commit();
        }
        else{
            echo "Failed to create account";
        }

    }

    function hash($password) {

        $hash = password_hash($password, PASSWORD_BCRYPT);
        return substr($hash, 0, 60);
    }


    function generateID() {
        while (true) {
            #generate 10 digit unique id
            $id = mt_rand(10 ** 8, (10 ** 9) - 1);
            $checkid = $this ->conn -> query("SELECT COUNT(*) FROM login WHERE id='$id'")
            or trigger_error(mysqli_error($this->conn));

            # making sure ID wasn't already assigned
            $row = $checkid ->fetch_assoc();
            if ($row["COUNT(*)"] == 0) {
                return $id;
            }
        }
    }


    function checkConn() {
        if ($this->conn) {
            echo "Connected";
        } else {
            die(print_r(sqlsrv_errors(), true));
        };


    }
    function test(){
        $var = '123';
        $sql = "INSERT INTO login(id) VALUES('$var')";
        $this->conn->query($sql);
        $this->conn-> commit();
    }
    function checkusername($username){
        $stmt = "SELECT username FROM login WHERE username='$username'";
        $result = $this->conn->query($stmt);
        $result = mysqli_fetch_assoc($result);
        if (!$result){
            return false;
        }
        return true;

    }
    function login($username, $password){
        #returns the user id on success, login advances if any value is returned
        #replacing input with escaped strings to prevent injection username and passwords are also stored escaped
        $escapedusername = mysqli_escape_string($this->conn, $username);
        $escapedpassword = mysqli_escape_string($this->conn, $password);

        $hashsql= "SELECT hash FROM login WHERE username ='$escapedusername'";
        $hashresult = $this->conn->query($hashsql) or trigger_error(mysqli_error($this->conn));
        $hashresult = mysqli_fetch_assoc($hashresult);
        $hashresult = implode(",",$hashresult);



        $verify_password = password_verify($escapedpassword, $hashresult);
        if (!$verify_password){
            echo "Incorrect credentials";
            return NULL;
        }
        $userid = $this->conn->query("SELECT id FROM login WHERE username = '$escapedusername'");
        $row  = $userid ->fetch_array();
        #$value = print_r($row['id']);
        $value = (string)$row['id'];
        return $value;
    }

    function singlesearchDatabase($searchvalue, $keywordsearch, $keywordreturn){
        $escapedsearch = mysqli_escape_string($this->conn, $searchvalue);
        $escapedkeysearch = mysqli_escape_string($this->conn, $keywordsearch);
        $escapedkeyreturn = mysqli_escape_string($this->conn, $keywordreturn);

        $sql = "SELECT $escapedkeyreturn FROM login WHERE $escapedkeysearch='$escapedsearch'";
        $sqlquery = $this->conn->query($sql) or die(mysqli_error($this ->conn));
        $row = mysqli_fetch_assoc($sqlquery);
        $returnvalue = implode(",", $row); # but THIS shit doesn't return the value wtffff fucking php
        return $returnvalue;
    }
    # this would be where we're checking if the user has started a game in the past or not
    function checkGameSave(){

    }
    # this creates the game sess for the user logging in for the first time
    function createGameSave(){
        //$query = "CREATE TABLE game(username VARCHAR(255), foodTotal INT, foodIncrement INT, woodTotal INT, woodIncrement INT, )"
    }
}


