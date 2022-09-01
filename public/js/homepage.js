// Add images on Hompage and View All Page
const id1 = "specialisation";
const id2 = "specialisation-all";
const id3 = "common-conditions";
const id4 = "common-conditions-all";
const id5 = "common-services";
const id6 = "common-services-all";

$.getJSON("js/json/specialisation.json", (data) =>
  addServiceContent(data, id1)
);
$.getJSON("js/json/specialisation.json", (data) =>
  addServiceContentAll(data, id2)
);
$.getJSON("js/json/common-conditions.json", (data) =>
  addServiceContent(data, id3)
);
$.getJSON("js/json/common-conditions.json", (data) =>
  addServiceContentAll(data, id4)
);
$.getJSON("js/json/common-services.json", (data) =>
  addServiceContent(data, id5)
);
$.getJSON("js/json/common-services.json", (data) =>
  addServiceContentAll(data, id6)
);

const addText = (data) => {
  return `
          <div class="row col s6 m4 l3 center-align">
            <div class="card small hoverable service-card">
              <div class="card-image">
                <a href="${data.link}">
                  <img src="${data.image}" />
                </a>
              </div>
              <div class="card-content service-content">
                <p>${data.description}</p>
              </div>
            </div>
          </div>
        `;
};

const addServiceContent = (data, id) => {
  for (let i = 0; i < 8; i++) {
    if (document.getElementById(id)) {
      document
        .getElementById(id)
        .insertAdjacentHTML("beforebegin", addText(data[i]));
    }
  }
};

const addServiceContentAll = (data, id) => {
  data.forEach((data) => {
    if (document.getElementById(id)) {
      document
        .getElementById(id)
        .insertAdjacentHTML("beforebegin", addText(data));
    }
  });
};
