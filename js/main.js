// const photo = document.querySelector('#blah').src;
// console.log(photo)

const nameUser = document.querySelector('#name');
const phone = document.querySelector('#phone');
const dogName = document.querySelector('#dog');
const info = document.querySelector('#info');
const sendButton = document.querySelector('#send');
const photoButton = document.querySelector('#photo');

const chatId = '-1001797140171';
const token = '5256737385:AAHlQd83rrsgc5vwjL0k-6mDYfsz7J_ZD7I';

sendButton.addEventListener('click', function(){
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

    send(
    `Конкурент: ${nameUser.value}\n
    Кличка собаки: ${dogName.value}\n
    Номер телефона: ${phone.value}\n
    Дополнительная информация: ${info.value}
    `, 
    document.querySelector('#blah').src);

})

function send(caption, photo){
    const formData = new FormData();
    formData.append('photo', photo);


    const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    body: formData,
    };
    
    fetch(`https://api.telegram.org/bot${token}/sendPhoto?chat_id=${chatId}&caption=${caption}`, requestOptions)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });


    // fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
    // method: 'POST',
    // headers: {
    //     'Content-Type': 'application/json'
    // },
    // body: JSON.stringify({
    //     chat_id: chatId,
    //     photo: photo,
    //     caption: caption
    // })
    // })
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(error => {
    //     console.error(error);
    // });
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


// let date = new Date();
// date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000)); // устанавливаем время жизни куки на 1 день
// let expires = "expires=" + date.toUTCString();
// document.cookie = "myCookie=myValue;" + expires + ";path=/";

// let myCookieValue = getCookie("myCookie");
// console.log(myCookieValue); // выведет "myValue", если куки существует

// function getCookie(name) {
//     let value = "; " + document.cookie;
//     let parts = value.split("; " + name + "=");
//     if (parts.length === 2) {
//       return parts.pop().split(";").shift();
//     }
//   }
