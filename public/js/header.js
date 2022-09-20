let text = `
  <img id="profile-pic" class="circle responsive-img" src="${userData._picture}" alt="profile-pic" />
  `;

if (document.getElementById('user-pic')) {
  document.getElementById('user-pic').insertAdjacentHTML('beforebegin', text);
}
