$(document).ready(function () {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function () {
      $(this).remove();
    });
  }

  // Wikipedia Search
  $('#wikiBtn').click(function () {
    var searchTerm = $('#wikipediaSearchInput').val().trim();
    if (searchTerm !== '') {
      // Clear previous results
      $('#results').html('');
      $.ajax({
        url: 'libs/php/wikipediaAPI.php',
        type: 'GET',
        dataType: 'json',
        data: { q: searchTerm },
        success: function (result) {
          if (result && result.length > 0) {
            result.forEach(function (entry) {
              appendWikipediaResults(entry);
            });
          } else {
            $('#results').html('<p>No results found.</p>');
          }
          // Clear the input field
          $('#wikipediaSearchInput').val('');
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error:", textStatus, errorThrown);
          // Display an error message to the user
          $('#results').html('<p>An error occurred while fetching Wikipedia data.</p>');
        }
      });
    } else {
      alert('Please enter a search term.');
    }
  });

  // Neighbours Search
  $('#neighbourBtn').click(function () {
    var selectedCountry = $('#selCountry').val();
    if (selectedCountry) {
      // Clear previous results
      $('#results').html('');
      $.ajax({
        url: "libs/php/neighboursAPI.php",
        type: 'POST',
        dataType: 'json',
        data: { country: selectedCountry },
        success: function (result) {
          if (result && result.status && result.status.name === "ok" && result.data && result.data.length > 0) {
            var neighborList = result.data.map(function (country) {
              return "<li>" + country.countryName + "</li>";
            }).join('');
            $('#results').html('<ul>' + neighborList + '</ul>'); // Update #results with neighborList
          } else {
            $('#results').html('<p>No neighbors found.</p>');
          }
        },
        complete: function () {
          // Clear the input field
          $('#selCountry').val('');
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error:", textStatus, errorThrown);
          // Display an error message to the user
          $('#results').html('<p>An error occurred while fetching neighbor data.</p>');
        }
      });
    } else {
      alert('Please select a country.');
    }
  });

  // Country Info Search
  $('#countryBtn').click(function () {
    var countryCode = $('#countryCodeInput').val().trim();
    if (countryCode !== '') {
      // Clear previous results
      $('#results').html('');
      $.ajax({
        url: 'libs/php/countryInfoAPI.php',
        type: 'GET',
        dataType: 'json',
        data: { country: countryCode },
        success: function (result) {
          if (result && Object.keys(result).length > 0) {
            appendCountryInfoResults(result);
          } else {
            $('#results').html('<p>No country info found.</p>');
          }
          // Clear the input field
          $('#countryCodeInput').val('');
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error:", textStatus, errorThrown);
          // Display an error message to the user
          $('#results').html('<p>An error occurred while fetching country info.</p>');
        }
      });
    } else {
      alert('Please enter a country code.');
    }
  });

  // Function to append Wikipedia results
  function appendWikipediaResults(entry) {
    var resultHtml = '<div class="wikiResult">';
    resultHtml += '<h3>' + entry.title + '</h3>';
    resultHtml += '<p>' + entry.summary + '</p>'; // Display the summary (full text)
    resultHtml += '<p><a href="' + entry.wikipediaUrl + '" target="_blank">Read more</a></p>';
    resultHtml += '</div>';
    $('#results').append(resultHtml);
  }

  // Function to append Country Info results
  function appendCountryInfoResults(result) {
    var resultHtml = '<div class="countryInfo">';
    resultHtml += '<p><strong>Continent:</strong> ' + result.continent + '</p>';
    resultHtml += '<p><strong>Capital:</strong> ' + result.capital + '</p>';
    resultHtml += '<p><strong>Languages:</strong> ' + result.languages + '</p>';
    resultHtml += '<p><strong>Population:</strong> ' + result.population + '</p>';
    // Add more properties as needed
    resultHtml += '</div>';
    $('#results').append(resultHtml);
  }

});
