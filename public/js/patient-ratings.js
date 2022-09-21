// Load patient ratings
// -----------------------------------------------------
const displayRatings = (obj) => {
  let addRating = (doctor, info) => {
    let docReply = '';
    let ratings = '';
    if (info.replyDate) {
      docReply = `
              <div class="card-panel grey lighten-3 col s12">
                <div class="col s12 grey-text right-align">${info.replyDate}</div>
                <div class="col s12 right-align">${doctor}</div>
                <div class="col s12">
                  ${info.doctorReply}
                </div>
              </div>
            </div>        
        `;
    }

    for (let i = 1; i <= info.rating; i++) {
      ratings = ratings + `<i class="material-icons orange-text">star</i>`;
    }

    if (info.rating % 1 != 0) {
      ratings = ratings + `<i class="material-icons orange-text">star_half</i>`;
    }

    for (let i = 5; i > Math.ceil(info.rating); i--) {
      ratings =
        ratings + `<i class="material-icons orange-text">star_border</i>`;
    }

    return `
            <div class="row card-panel grey lighten-2">
              <span class="col s12 m1 center-align">
                <img
                  class="profile-pic circle"
                  src="${info.docPicture}"
                  alt="profile-pic"
                />
              </span>

              <h6 class="col s7 m3 left-align">${doctor}</h6>

              <h6 class="col s5 m2 left-align">
                <a href="${info.docProfileLink}">View Profile</a>
              </h6>

              <!-- Ratings 1 -->
              <div class="card-panel grey lighten-3 col s12">
                <span class="grey-text right-align">${info.commentDate}</span>
                <div class="col s12">
                  Patient Name
                  ${ratings}
                  <a class="btn N/A transparent z-depth-0 grey-text"
                    ><i class="material-icons grey-text left">edit</i>Edit</a
                  >
                </div>

                <!-- Patient's comment -->
                <div class="col s12">
                  ${info.patientComment}
                </div>
              </div>

              <!-- Doctor's Reply -->
              ${docReply}

      `;
  };

  Object.keys(obj).forEach((doctor) => {
    // obj = whole data object
    // doctor = Doctor Name 1, Doctor Name 2, ...
    // obj[doctor] = rating comments and other information

    if (document.getElementById('patient-ratings')) {
      document
        .getElementById('patient-ratings')
        .insertAdjacentHTML('beforebegin', addRating(doctor, obj[doctor][0]));
    }
  });
};

if (userData._user == 'patient') displayRatings(userData._patientRatings);
