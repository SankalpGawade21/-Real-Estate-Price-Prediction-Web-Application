function getBathValue() {
  const bathrooms = document.getElementsByName("uiBathrooms");
  for (let i = 0; i < bathrooms.length; i++) {
    if (bathrooms[i].checked) {
      return parseInt(bathrooms[i].value);
    }
  }
  return -1; // Invalid value
}

function getBHKValue() {
  const bhkOptions = document.getElementsByName("uiBHK");
  for (let i = 0; i < bhkOptions.length; i++) {
    if (bhkOptions[i].checked) {
      return parseInt(bhkOptions[i].value);
    }
  }
  return -1; // Invalid value
}

function onClickedEstimatePrice() {
  console.log("Estimate Price button clicked");

  const sqft = document.getElementById("uiSqft").value;
  const bhk = getBHKValue();
  const bath = getBathValue();
  const location = document.getElementById("uiLocations").value;
  const estPrice = document.getElementById("uiEstimatedPrice");

  // Make sure input values are valid
  if (!sqft || !bhk || !bath || !location) {
    estPrice.innerHTML = "<h2>Please fill out all fields</h2>";
    return;
  }

  var url = "http://127.0.0.1:5000/predict_home_price"; // for local testing

  $.post(url, {
    total_sqft: parseFloat(sqft),
    bhk: bhk,
    bath: bath,
    location: location
  }, function (data, status) {
    console.log("Prediction response:", data);
    estPrice.innerHTML = `<h2>${data.estimated_price} Lakh</h2>`;
  }).fail(function () {
    estPrice.innerHTML = "<h2>Failed to get prediction</h2>";
  });
}

function onPageLoad() {
  console.log("Page loaded");

  var url = "http://127.0.0.1:5000/get_location_names"; // for local testing

  $.get(url, function (data, status) {
    console.log("Got location data:", data);
    if (data && data.locations) {
      const uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty(); // clear old options

      data.locations.forEach(function (loc) {
        const option = new Option(loc);
        $('#uiLocations').append(option);
      });
    }
  }).fail(function () {
    console.error("Failed to load locations");
  });
}

window.onload = onPageLoad;
