const nameUser = document.querySelector('#name');
const phone = document.querySelector('#phone');
const dogName = document.querySelector('#dog');
const info = document.querySelector('#info');
let sendButton = [];
sendButton = document.querySelectorAll('.send');
const photoButton = document.querySelector('#photo');
const waitSend = document.querySelector('.waitSend');
let waitResponse = false;

const chatId = '-1001797140171';
const token = '5256737385:AAHlQd83rrsgc5vwjL0k-6mDYfsz7J_ZD7I';


for(let i = 0; i < sendButton.length; i++){
    
    if (document.cookie.indexOf('formSubmitted=1') !== -1) {
        sendButton[i].innerHTML = "<b>Вы учавствуете!</b>";
    }

    sendButton[i].addEventListener('click', function(){
        if (document.cookie.indexOf('formSubmitted=1') !== -1) {
            return;
        }
        if(waitResponse){
            return;
        }
    
        if(nameUser.value < 10){
            invalidInput(nameUser);
            return;
        }
        if(!isValidPhoneNumber(phone.value)){
    
            invalidInput(phone);
            return false;
        }
        if(dogName.value < 3){
            invalidInput(dogName);
            return;
        }
        if(info.value > 300){
            invalidInput(info);
            return;
        }
        let file = document.getElementById("file").files[0];
        console.log(document.getElementById("file").files[0]);
    
        if (!file) {
            invalidInput(photoButton);
            return;
        }
    
        send(`Конкурент: ${nameUser.value}\nКличка собаки: ${dogName.value}\nНомер телефона: ${phone.value}\nДополнительная информация: ${info.value}`, 
        file, this);
    
        waitResponse = true;
        this.style.display = 'none';
        waitSend.style.display = 'flex';
    
    })
}

function send(caption, photo, button){
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', caption);
    formData.append('photo', photo, 'photo.jpg');

    fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
    method: 'POST',
    body: formData
    })
    .then(response => {
        console.log(response);
        button.style.display = 'flex';
        waitSend.style.display = 'none';
        button.innerHTML = "<b>Вы учавствуете!</b>";

        const now = new Date();
        const expirationDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
        document.cookie = `formSubmitted=1; expires=${expirationDate.toUTCString()}; path=/`;
    })
    .catch(error => {
        console.error(error);
        waitResponse = false;
        button.style.display = 'flex';
        waitSend.style.display = 'none';
    });
}

function invalidInput(e){
    e.style.boxShadow = "0 0 5px red";
    setTimeout(function(){
      e.style.boxShadow = "0 0 0px red";
    }, 1000)
}

function isValidPhoneNumber(phoneNumber) {
    let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phoneNumber);
}

const cookies = document.cookie.split("; "); // Разделяем все куки на отдельные строки
for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].split("="); // Разделяем имя и значение куки
  if (cookie[0] === "formSubmitted") {
    const myCookieValue = cookie[1];
    // Используем значение куки для чего-либо
    console.log(myCookieValue)
    break;
  }
}