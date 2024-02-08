<?php

// Remove for production
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

// API endpoint URL
$url = 'http://api.geonames.org/neighboursJSON?formatted=true&country=' . $_REQUEST['country'] . '&username=kelbal';

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

// Execute cURL session
$result = curl_exec($ch);

// Close cURL session
curl_close($ch);

// Decode JSON response
$decode = json_decode($result, true);

// Prepare output array
$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode['geonames'];

// Set response header
header('Content-Type: application/json; charset=UTF-8');

// Output JSON response
echo json_encode($output);

?>
