$(document).ready(() => {
  if (true) {
    $("#header").load("header-doctor.html"); // Doctor's login?
  } else if (!true) {
    $("#header").load("header-patient.html"); // Patient login?
  } else {
    $("#header").load("header-nologin.html"); // No login
  }

  $("#footer").load("footer.html");

  $.getScript("/js/dropdown.js");

  $(".carousel").carousel({
    fullWidth: true,
    autoplay: true,
  });
  setInterval(function () {
    $(".carousel").carousel("next");
  }, 5000);

  const id1 = "specialisation";
  const id2 = "specialisation-all";
  const id3 = "common-conditions";
  const id4 = "common-conditions-all";
  const id5 = "common-services";
  const id6 = "common-services-all";

  $.getJSON("js/json/specialisation.json", (data) => addEntry(data, id1));
  $.getJSON("js/json/specialisation.json", (data) => addEntryAll(data, id2));
  $.getJSON("js/json/common-conditions.json", (data) => addEntry(data, id3));
  $.getJSON("js/json/common-conditions.json", (data) => addEntryAll(data, id4));
  $.getJSON("js/json/common-services.json", (data) => addEntry(data, id5));
  $.getJSON("js/json/common-services.json", (data) => addEntryAll(data, id6));

  const addText = (data) => {
    return `
          <div class="row col s6 m4 l3 center-align">
            <div class="card small hoverable">
              <div class="card-image">
                <a href="${data.link}">
                  <img src="${data.image}" />
                </a>
              </div>
              <div class="card-content">
                <p>${data.description}</p>
              </div>
            </div>
          </div>
        `;
  };

  const addEntry = (data, id) => {
    for (let i = 0; i < 8; i++) {
      if (document.getElementById(id)) {
        document
          .getElementById(id)
          .insertAdjacentHTML("beforebegin", addText(data[i]));
      }
    }
  };

  const addEntryAll = (data, id) => {
    data.forEach((data) => {
      if (document.getElementById(id)) {
        document
          .getElementById(id)
          .insertAdjacentHTML("beforebegin", addText(data));
      }
    });
  };
  // ...END
});
