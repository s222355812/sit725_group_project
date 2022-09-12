// Load patient's schedule
// -----------------------------------------------------
const getPatientSchedData = () => {
  $.get('/api/patientSched', (response) => {
    if (response.statusCode == 200) {
      displayPatientSched(response.data[0].patientSched);
    }
  });
};

getPatientSchedData();

const displayPatientSched = (obj) => {
  let addDate = (date) => {
    return `
      <div class="row">
        <div class="col s12 teal lighten-4 z-depth-5 left-align">
          <div class="row card-panel white-text cyan accent-4">${date}</div>
          <div id="${date}"></div>
        </div>
      </div>
    `;
  };

  let addDetails = (info) => {
    return `
        <div class="row card-panel grey lighten-2">
            <div class="col s12 l3 offset-l2">
                <h6 class="white center-align z-depth-5">${info.from} - ${info.to}</h6>
                <h6 class="green whtie-text center-align">Booked</h6>
            </div>
            <span class="col s12 l2 center-align">
                <img class=" circle profile-pic" src="${info.picture}" alt="profile-pic"
                    style="width:75px; height:75px;" />
            </span>
            <div class="col s12 l5">
                <h6 class="">${info.name}</h6>
                <h6 class="">
                    <a href="${info.profileLink}">View Profile</a>
                </h6>
            </div>
        </div> 
    `;
  };

  Object.keys(obj).forEach((date) => {
    // obj = whole data object
    // date = DD/MM/YYYY 1, DD/MM/YYYY 2, ...
    // obj[date] = patient schedule information on each date

    if (document.getElementById('patient-schedule')) {
      document
        .getElementById('patient-schedule')
        .insertAdjacentHTML('beforebegin', addDate(date));

      obj[date].forEach((info) => {
        document
          .getElementById(date)
          .insertAdjacentHTML('beforebegin', addDetails(info));
      });
    }
  });
};
