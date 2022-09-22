//  Search Function
// ------------------------------------------------------------------------
const search = () => {
  $.post('/sessions', (res) => {
    if ('searchResults' in res.data[0].session) {
      displayDocList(res.data[0].session.searchResults[0]);
    }
  });
};

search();

$(document).ready(function () {
  $('input.autocomplete').autocomplete({
    data: {
      'General Medicine': null,
      'Eye & Vision': null,
      'Skin & Dermatology': null,
      'Ear, Nose & Throat': null,
      'Heart & Cardiology': null,
      'Lungs & Chest': null,
      'Brain & Nerves': null,
      'Kidney & Urine': null,
      'Stomach & Digestion': null,
      'Blood & Hematology': null,
      Hepaptology: null,
      'Imaging & Radiology': null,
      'Dental Care': null,
      Pediatrics: null,
      'Maternal & Newborn Care': null,
      'Joint, Muscles & Bones': null,
      'Diet & Nutrition': null,
      'Heart Disease': null,
      Hypertension: null,
      'High Cholesterol': null,
      'Mental Health': null,
      'Back Pain': null,
      Allergy: null,
      'Colds & Flu': null,
      Migrane: null,
      'Acne and Eczema': null,
      Pregnancy: null,
      Diabetes: null,
      'Arthritis & Gout': null,
      Cancer: null,
      'Medical Certificates': null,
      'Children Vaccinations': null,
      'Vaccination Forms': null,
      'Birth Control': null,
      'Physical Therapy': null,
      'Ear Cleaning': null,
      'Cortisone Injections': null,
      'Covid-19 Consulations': null,
      'Cataract Surgery': null,
      Orthodontics: null,
    },
    limit: Infinity,
    minLength: 1,
  });
});

// ------------------------------------------------------------------------

const displayDocList = (obj) => {
  let addDocList = (doc) => {
    // Calculate years of experience
    let years = 0;
    doc._experience.forEach((item) => {
      years = years + Number(item._Duration);
    });

    // Add tags
    let tags = ``;
    doc._specialisation.forEach((item) => {
      tags =
        tags +
        `
                      <div class="chip">${item}</div>
                  `;
    });

    return `
    <div class="card-panel grey lighten-3">
      <div class="row">
          <div class="col l2 center-align">
              <img class="circle" src="${doc._picture}" alt="doc-pic"
                  style="width: 75px; height: 75px;">
          </div>
          <div class="col s12 l7">
              <h6 class="col s12">${doc._name}</h6>
              <h6 class="col s12">Experience: ${years} years</h6>
          </div>

          <form action="/viewProfile" method="POST">
            <input type="hidden" name="email" value="${doc._email}" />
            <button class="btn waves-effect waves-light transparent blue-text z-depth-0" type="submit" name="action">View Profile</button>
          </form>

          <div class="col s12">
              <h6 class="col s12 l2 offset-l2">Specialisation:</h6>
              <div class="col l8">
                ${tags}
              </div>
          </div>
      </div>
    </div>  
  `;
  };

  //   Doctor List Display Information Contoller
  // ------------------------------------------------------------------------------
  Object.keys(obj).some((item) => {
    // obj = whole data object
    // item = object index [0, 1, 2, ...]
    // obj[date] = doctor data object

    if (document.getElementById('doc-list')) {
      document
        .getElementById('doc-list')
        .insertAdjacentHTML('beforebegin', addDocList(obj[item]));
    }
  });

  //  See Doctor profiles using View Profile
  // ------------------------------------------------------------------------------
};
