let data = null;

let question = 0;

let truths = 0;

let untruths = 0;

let party = ``;

let city = ``;

let usaname = "";

let fix="";

var audio = new Audio("cheer.mp3");

audio.preload = "auto";



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

    question++;

    document.getElementById("questionTotal").textContent = "soru " + question + "/10"



    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];



    var image = document.getElementById('rep')

    party = `${randomUser.party}`

    usaname = `${randomUser.name}`

    fix=usaname;

    city = `${randomUser.province}`



    fix = fix.normalize('NFC').replace(/\p{M}/gu, '');

    fix = fix.toLowerCase().replace(/ /g, '-');

    const map = { 'ç':'c','ğ':'g','ı':'i','ö':'o','ş':'s','ü':'u' };

    fix = fix.replace(/[çğıöşü]/g, m => map[m]);

    fix = fix.replace(/[^\w\-\.]/g, '');



    const tempImg = new Image();

    tempImg.onload = () => {

      // görsel yüklenince hem görsel hem yazı değişiyor

      image.src = tempImg.src;

      replaceable.textContent = "hangi partili?";

      replaceable.style.color = "white";

    };

    tempImg.src = "https://cdn.vekilguessr.site/" + fix + ".jpg";

  }





function getId(button) {

  if (button.id == party)  {



   truths++;

   document.getElementById('trueTotal').textContent =  "skor "+truths;

   replaceable.textContent = party.toLowerCase() + " " + city.toLowerCase() + " milletvekili " + usaname.toLowerCase();

   replaceable.style.color = "green";

  }

  else {

    replaceable.textContent = party.toLowerCase() + " " + city.toLowerCase() + " milletvekili " + usaname.toLowerCase();

    replaceable.style.color = "red";

  }

    if (question != 10) {

    setTimeout(() => {

        buttons.forEach(b => {
    replaceable.textContent = "hangi partili?";
    replaceable.style.color = "white";

        })
 rastgeleKullanici();
      }, 1000);
        
}

if (question == 10) {

    document.getElementById("score").textContent="skor " + truths;
    document.getElementById("gameOverScreen").style.display = "flex";

    if (truths >= 5) {

      document.getElementById("gameOverText").textContent="sertifikalı fark edici"

      document.getElementById("gameOverText").style.color="green"

      playAudio();

      frame();

    }

    if (truths<5) {

      document.getElementById("gameOverText").textContent="sertifikalı mal"

      document.getElementById("gameOverText").style.color="red"

    }

  }


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

      }, 2000)})})





      console.log(usaname)

      console.log("hi")



function frame() {

  confetti({

    particleCount: 50,

    angle: 315,

    spread: 90,

    origin: { x: 0, y:0 }

  });

  confetti({

    particleCount: 50,

    angle: 225,

    spread: 90,

    origin: { x: 1, y:0 }

  });

} ;



function playAudio(){

  audio.play();

}



function restart(){


  rastgeleKullanici();

  question=0;

  truths=0;

  document.getElementById("trueTotal").textContent = "skor 0"

  document.getElementById("questionTotal").textContent = "soru 1/10"

  document.getElementById("gameOverScreen").style.display = "none";

}

console.log(question)