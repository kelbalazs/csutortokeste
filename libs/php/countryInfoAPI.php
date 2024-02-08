<?php
// Comprehensive error reporting
ini_set('display_errors', 'On');
error_reporting(E_ALL);

// Default country code (if not provided in the URL)
$countryCode = isset($_GET['country']) ? $_GET['country'] : 'DE';

// API source URL with predefined parameters and the dynamic country code
$url = "http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=$countryCode&username=kelbal";

// Initialize Curl 
$ch = curl_init();

// Set options for Curl
curl_setopt_array($ch, array(
    CURLOPT_SSL_VERIFYPEER => false, // FALSE to stop cURL from verifying the peer's certificate
    CURLOPT_RETURNTRANSFER => true, // TRUE to return the transfer as a string instead of outputting it directly
    CURLOPT_URL => $url // The URL to fetch
));

// Execute the cURL request and store the result
$result = curl_exec($ch);

// Check for errors
if(curl_errno($ch)){
    echo 'Curl error: ' . curl_error($ch);
}

// Close Curl session
curl_close($ch);

// Output the result
echo $result;
?>
