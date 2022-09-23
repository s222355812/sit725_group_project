// Load doctor's appointments
// -----------------------------------------------------
const displayAppointment = (obj) => {
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
    let buttonHTML = '';
    if (info.status == 'booked') {
      buttonHTML = `
      <a class="col s12 l2 waves-effect waves-light green btn">
        ${info.status}
      </a>
      `;
    } else {
      buttonHTML = `
      <a class="col s12 l2 waves-effect waves-light blue btn">
        ${info.status}
      </a>
      `;
    }

    info.status = 'booked';

    return `
          <div class="row card-panel grey lighten-2">
            <div>
              <h6 class="col s12 l3 white center-align">${info.from} - ${info.to}</h6>
            </div>
            <span class="col s12 l2 center-align">
              <img
                class="circle responsive-img profile-pic"
                src="images/profile.jpg"
                alt="profile-pic"
              />
            </span>
            <h6 class="col s12 l3">${info.name}</h6>
            <h6 class="col s12 l2">
              <a href="${info.profileLink}">View Profile</a>
            </h6>
            ${buttonHTML}
          </div>    
    `;
  };

  Object.keys(obj).forEach((date) => {
    // obj = whole data object
    // date = DD/MM/YYYY 1, DD/MM/YYYY 2, ...
    // obj[date] = patient appointment information on each date

    if (document.getElementById('doc-appointment')) {
      document
        .getElementById('doc-appointment')
        .insertAdjacentHTML('beforebegin', addDate(date));

      obj[date].forEach((info) => {
        document
          .getElementById(date)
          .insertAdjacentHTML('beforebegin', addDetails(info));
      });
    }
  });
};

if (userData._user == 'doctor') displayAppointment(userData._appointments);
