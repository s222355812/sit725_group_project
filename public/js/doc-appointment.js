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
            <h6 class="col s12 l3 white center-align">${info.from} - ${info.to}</h6>
            <span class="col s12 l2 center-align">
              <img
                class="circle responsive-img profile-pic"
                src="${info.picture}"
                alt="profile-pic"
                style="width: 100px; height: 100px;"
              />
            </span>
            <h6 class="col s12 l2">${info.name}</h6>
            <h6 class="col s12 l3 left-align">
              <form action="/viewProfile/patient" method="POST">
                <input type="hidden" name="email" value="${info.email}" />
                <button class="btn waves-effect waves-light transparent blue-text z-depth-0 left-align" type="submit" name="action">View Profile</button>
              </form>
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

if (userData._user == 'doctor' && '_appointments' in userData) {
  displayAppointment(userData._appointments);
}
