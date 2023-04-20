// const now = new Date();
// const expirationDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
// document.cookie = `formSubmitted=0; expires=${expirationDate.toUTCString()}; path=/`;
// const cookieClear = true;

const nameUser = document.querySelector('#name');
const phone = document.querySelector('#phone');
const dogName = document.querySelector('#dog');
const info = document.querySelector('#info');
let sendButton = [];
sendButton = document.querySelectorAll('.send');
const photoButton = document.querySelector('#photo');
const waitSend = document.querySelector('.waitSend');
const infoTest = document.querySelector('.info-test');
const imgCookie = document.querySelector('#blah');
let waitResponse = false;

const chatId = '-1001639815098';
const token = '6123483585:AAE7uX6lmtokG2tcmqyKDRN_GLZd5JjwNVo';

if (document.cookie.indexOf('formSubmitted=1') !== -1) {
    nameUser.value = getCookie('formUserName');
    dogName.value = getCookie('formDogName');
    phone.value = getCookie('formPhone');
    info.value = getCookie('formInfo');

    infoTest.innerHTML = "Ваши данные на конкурс";
    photoButton.style.display = 'none';

    const savedImage = localStorage.getItem('savedImage');
    if (savedImage) {
        imgCookie.src = savedImage;
    }
}

for(let i = 0; i < sendButton.length; i++){
    
    if (document.cookie.indexOf('formSubmitted=1') !== -1) {
        sendButton[i].innerHTML = "<b>Вы участвуете!</b>";
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

        // if(cookieClear){
        //     document.querySelector('.info-cookie').style.display = 'flex';
        //     setTimeout(function(){
        //         document.querySelector('.info-cookie').style.display = 'none';
        //     }, 3000)
        //     return;
        // }
    
        send(`Конкурсант: ${nameUser.value}\nКличка собаки: ${dogName.value}\nНомер телефона: ${phone.value}\nДополнительная информация: ${info.value}`, 
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

        document.cookie = `formDogName=${dogName.value}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = `formUserName=${nameUser.value}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = `formPhone=${phone.value}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = `formInfo=${info.value}; expires=${expirationDate.toUTCString()}; path=/`;

        const image = new Image();
        image.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            const base64Image = canvas.toDataURL();
            localStorage.setItem('savedImage', base64Image);
            
        };
        image.src = URL.createObjectURL(photo);

        infoTest.innerHTML = "Ваши данные на конкурс";
        photoButton.style.display = 'none';

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

function getCookie(name){
    const cookies = document.cookie.split("; "); 
    for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("="); 
        if (cookie[0] === name) {
            return cookie[1];
        }
    }

    return 'null';
}