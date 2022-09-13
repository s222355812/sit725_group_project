$.getJSON('js/json/doc-profile.json', (obj) => displayDocList(obj));

const displayDocList = (obj) => {
  let addDocList = (doc) => {
    // Calculate years of experience
    let years = 0;
    doc.experience.forEach((item) => {
      years = years + Number(item.duration);
    });

    // Add tags
    let tags = ``;
    doc.specialisation.forEach((item) => {
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
              <img class="circle" src="${doc.picture}" alt="doc-pic"
                  style="width: 75px; height: 75px;">
          </div>
          <div class="col s12 l7">
              <h6 class="col s12">${doc.name}</h6>
              <h6 class="col s12">Experience:${years} years</h6>
          </div>
          <a class="waves-effect waves-teal btn-flat blue-text" href="./doctor-profile.html">View
              Profile</a>
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
};
