<?php
session_start();
#echo session_id();

$error = "";
$errorfound = false;
$_SESSION['logged_in'] = false;

require_once('..\\database.php');
$database = new Database();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true){
    header("Location: ..\\success.php");
}
if (isset($_POST['login'])) {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        #return false = username does not exist;
        $check = $database ->checkusername($_POST['username']);
        if (!$check){
            $error = "Incorrect credentials";
            $errorfound = true;
            return;
        }
        #login() returns NULL when passwords don't match

        $userid = $database -> login($_POST['username'], $_POST['password']);

        echo "<br>userid as return value: $userid<br>";


        $_SESSION['userid'] = $userid;

        print_r("userid as session variable:".$_SESSION['userid']);

        if (!$_SESSION['userid']) {
            $error = "Incorrect credentials";
            $errorfound = true;
            return;
        }

        $_SESSION['hello'] = 10101010;
        $_SESSION['loggedin'] = true;
        header("Location:..\\success.php");


    }
}

if (isset($_POST['register'])){

    if (isset($_POST['register-username']) && isset($_POST['register-password']) && isset($_POST['register-email'])){
        $_SESSION['regusername'] = $_POST['register-username'];
        $_SESSION['regpassword'] = $_POST['register-password'];
        $_SESSION['regemail'] = $_POST['register-email'];

        $database-> register($_SESSION['regusername'], $_SESSION['regpassword'], $_SESSION['regemail']);

    }
}

?>
<!DOCTYPE HTML>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="login.css">
</head>
    <body style="overflow:hidden">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:700,600' rel='stylesheet' type='text/css'>
        <!-- initialize jQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

            <div class="login-page">
                <div class="form" id ="form">

                    <form method="post" action="login.php" class="register-form">
                        <h1> Register </h1>
                        <input type="text" name="register-username" placeholder="name" required/>
                        <input type="password" name="register-password" placeholder="password" required/>
                        <input type="text" name="register-email" placeholder="email address" required/>

                        <button class="button" id="register" name="register" onclick="offscreen();">register</button>
                        <p class="message">Already registered? <a href="#" onclick="swapform();">Sign In</a></p>
                    </form>


                    <form method="post" action="login.php" class="login-form">
                        <h1> Sign In </h1>
                        <input type="text" name='username' placeholder="username"  onblur="blur(this, 'username')"/>
                        <input type="password" name='password' placeholder="password"  onblur="blur(this, 'password')"/>

                        <button name="login">login</button>
                        <p class="message">Not registered? <a href="#" id="login-change" onclick="swapform();">Create an account</a></p>
                    </form>
                </div>
                <script type="text/javascript" src="javascript.js"></script>
            </div>

    </body>
</html>

