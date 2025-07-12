<?php
// Vulnérabilité d'injection SQL
$conn = new SQLite3('/tmp/db.sqlite');
$user = $_POST['username'];
$pass = $_POST['password'];
$query = "SELECT * FROM users WHERE username = '$user' AND password = '$pass';";
$results = $conn->query($query);
?>
