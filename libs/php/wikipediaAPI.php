<?php
// These two set of lines initiate comprehensive error reporting, so that I can run the routine directly in the browser and see all output, including errors, echoed to the browser screen.
ini_set('display_errors', 'On');
error_reporting(E_ALL);

// Retrieve the search term from the request
$searchTerm = isset($_GET['q']) ? $_GET['q'] : '';

// API source url with predefined parameters 
$url = "http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=" . urlencode($searchTerm) . "&maxRows=10&username=kelbal&style=full";

// Initialize Curl 
$ch = curl_init();

// FALSE to stop cURL from verifying the peer's certificate.
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// TRUE to return the transfer as a string of the return value of curl_exec() instead of outputting it directly.
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// The URL to fetch. This can also be set when initializing a session with curl_init().
curl_setopt($ch, CURLOPT_URL, $url);

//Execute the cURL object and stores the result to $result.
$result = curl_exec($ch);
//print_r($result);

// Finish the session.
curl_close($ch);

// Convert JSON string into an object. 
$decode = json_decode($result, true);
echo json_encode($decode);
?>
