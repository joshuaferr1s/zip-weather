const weatherForm = document.getElementById("weatherForm");
const zipcode = document.getElementById("zipcode");
const weatherResult = document.getElementById("weatherResult");

weatherForm.addEventListener("submit", async e => {
  e.preventDefault();
  weatherResult.innerHTML = "";
  console.log(`Form Submission: ${zipcode.value}`);

  try {
    const res = await fetch(`/api/weather?zipcode=${zipcode.value}`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.msg);
    }
    console.log(data.data);

    const locationString = `${data.data.location.name}, ${data.data.location.region} (${data.data.location.lat}, ${data.data.location.lon})`;
    const weatherString = `${data.data.current.temp_f}°F (${data.data.current.condition.text}), Wind ${data.data.current.wind_mph}MPH ${data.data.current.wind_dir}`;
    const updatedAt = data.data.current.last_updated;

    weatherResult.innerHTML = `
      <h2>${locationString}</h2>
      <p>${weatherString}</p>
      <p><small>Last updated @ ${updatedAt}</small></p>
    `;
  } catch (err) {
    console.log("error", err);
    weatherResult.innerText = "Unexpected error. Try again shortly.";
  }
});
