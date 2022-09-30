// -----------------------------------------------------
const displayPatientSched = (obj) => {
  let addDate = (date) => {
    return `
      <div class="outer-schedule-box">
        <h6>${date}</h6>
            <div id="${date}"></div>
      </div>
    `;
  };

  let addDetails = (info) => {
    return `
    <div class="inner-schedule-box">
    <div class="row">
        <div class="col l4">
            <div class="schedule-time-box" style="margin-top:10px">
            ${info.from} - ${info.to}
            </div>
            <div class="schedule-status-box booked">
                Booked
            </div>
        </div>
        <div class="col l8" style="height:10px">

              <img class="circle no-margin" src="${info.picture}" alt="doc-pic" style="width: 100px; height: 100px;"> 
        
            <div class="name floating-name">
              <h2>${info.name}</h2>
              <form action="/viewProfile" method="POST">
                <input type="hidden" name="email" value="${info.email}" />
                <button class="btn waves-effect waves-light transparent blue-text z-depth-0" type="submit" name="action">View Profile</button>
              </form>
            </div>
        </div>
    </div>
</div>
    `;
  };

  Object.keys(obj._schedule).forEach((date) => {
    if (document.getElementById('patient-schedule')) {
      document
        .getElementById('patient-schedule')
        .insertAdjacentHTML('beforebegin', addDate(date));
      obj._schedule[date].forEach((info) => {
        document
          .getElementById(date)
          .insertAdjacentHTML('beforebegin', addDetails(info));
      });
    }
  });
};

if (
  userData._user == 'patient' &&
  '_schedule' in userData &&
  userData._schedule != undefined
) {
  displayPatientSched(userData);
}
