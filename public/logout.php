<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Start or resume the session
session_start();

// Clear session data and destroy the session
session_unset();
session_destroy();

// Redirect to the login page
header("Location: index.html");
exit();
?>
