let data = null;
let question = 0;
let truths = 0;
let untruths = 0;
let party = ``;
let usaname = ``;
let city = ``;
let info = document.getElementById('trueTotal');
let replaceable = document.getElementById("skibidi");
const buttons = document.querySelectorAll('.btn')

window.addEventListener('DOMContentLoaded', () => {
  fetch('sorted-mps.json')
    .then(response => response.json())
    .then(json => {
      data = json;
      console.log('JSON yüklendi:', data);

      rastgeleKullanici();
    })
    .catch(err => console.error('JSON yüklenemedi:', err));
});

function rastgeleKullanici() {
  const allUsers = [];
  for (const party in data) {
    data[party].forEach(user => {
      allUsers.push({ ...user, party });
    });
  }

  const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

var image = document.getElementById('rep')
image.src = "/reps/" + `${randomUser.name}` + ".jpg"
let random = `${randomUser.name}\n` + `Şehir: ${randomUser.province}\n` + `Parti: ${randomUser.party}` 
party = `${randomUser.party}`
usaname = `${randomUser.name}`
city = `${randomUser.province}`
}

function getId(button) {
  console.log(truths)
  console.log(party)
console.log(button.id)
  if (button.id == party)  {
   
   truths++;
   document.getElementById('trueTotal').textContent =  truths + " doğru " + untruths + " yanlış";
   replaceable.textContent = party.toLowerCase() + " " + city.toLowerCase() + " milletvekili " + usaname.toLowerCase();
   replaceable.style.color = "green";
  }
  else {
    untruths++;
    document.getElementById('trueTotal').textContent =  truths + " doğru " + untruths + " yanlış";
    replaceable.textContent = party.toLowerCase() + " " + city.toLowerCase() + " milletvekili " + usaname.toLowerCase();
    replaceable.style.color = "red";
  }

    setTimeout(() => {
    replaceable.textContent = "hangi partili?";
    replaceable.style.color = "white";
    rastgeleKullanici();
    
  }, 1000);

}


  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()

      buttons.forEach(b => {
        b.disabled = true
        b.style.opacity = '0.9'
      })

      setTimeout(() => {
        buttons.forEach(b => {
          b.disabled = false
          b.style.opacity = '1'
        })
      }, 1000)})})