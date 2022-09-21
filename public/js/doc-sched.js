// Load doctor's schedule
// -----------------------------------------------------
const deleteButtonIds = [];

const displayDocSched = (obj) => {
  let addText = (idFrom, idTo, idDel) => {
    return `
      <div>
        <input id="${idFrom}" type="text" class="col s4 center-align timepicker white"/>
        <p class="col s1">to</p>
        <input id="${idTo}" type="text" class=" col s4 center-align timepicker white"/>
        <span class="col s3 center-align">
            <a id="${idDel}" class="col s3waves-effect waves-light btn-small red center-align"><i class="material-icons">delete</i></a>
        </span>
      </div>
  `;
  };

  Object.keys(obj).forEach((day) => {
    // obj = whole data object
    // day = monday, tuesday, wednesday...
    // obj[day] = content of each day

    // traverse data inside of each day
    for (let i = 0; i < obj[day].length; i++) {
      if (document.getElementById(day)) {
        let idFrom = `${day}-${i}-from`;
        let idTo = `${day}-${i}-to`;
        let idDel = `${day}-${i}`;
        deleteButtonIds.push(idDel);
        let time = obj[day][i];

        document
          .getElementById(day)
          .insertAdjacentHTML('beforebegin', addText(idFrom, idTo, idDel));

        let timeInstanceFrom = M.Timepicker.init(
          document.getElementById(idFrom),
          {
            defaultTime: time.from,
          }
        );
        let timeInstanceTo = M.Timepicker.init(document.getElementById(idTo), {
          defaultTime: time.to,
        });

        timeInstanceFrom._updateTimeFromInput();
        timeInstanceFrom.done();

        timeInstanceTo._updateTimeFromInput();
        timeInstanceTo.done();
      }
    }
  });

  // Delete button
  deleteButtonIds.forEach((deleteId) => {
    $('#' + deleteId).click(() => {
      $('#' + deleteId)
        .closest('div')
        .remove();
    });
  });
};

// Add schedule button
// -----------------------------------------------------
const buttonIds = [
  '#add-mon',
  '#add-tue',
  '#add-wed',
  '#add-thu',
  '#add-fri',
  '#add-sat',
  '#add-sun',
];

const dayIds = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const timePickerHTML = `
      <div>
        <input type="text" class="col s4 center-align timepicker white"/>
        <p class="col s1">to</p>
        <input type="text" class=" col s4 center-align timepicker white"/>
        <span class="col s3 center-align">
            <a class="col s3waves-effect waves-light btn-small red center-align"><i class="material-icons">delete</i></a>
        </span>
      </div>
`;

buttonIds.forEach((buttonId) => {
  $(buttonId).click(() => {
    let dayId = '';
    switch (buttonId) {
      case buttonIds[0]:
        dayId = dayIds[0];
        break;
      case buttonIds[1]:
        dayId = dayIds[1];
        break;
      case buttonIds[2]:
        dayId = dayIds[2];
        break;
      case buttonIds[3]:
        dayId = dayIds[3];
        break;
      case buttonIds[4]:
        dayId = dayIds[4];
        break;
      case buttonIds[5]:
        dayId = dayIds[5];
        break;
      case buttonIds[6]:
        dayId = dayIds[6];
        break;
    }

    document
      .getElementById(dayId)
      .insertAdjacentHTML('beforebegin', timePickerHTML);
  });
});

if (userData._user == 'doctor') displayDocSched(userData._docSched);
