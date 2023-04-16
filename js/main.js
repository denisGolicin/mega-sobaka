const photo = document.querySelector('#blah').src;
console.log(photo)
const photoUrl = 'https://i.imgur.com/qHL4GJo.jpg';
const caption = 'Hello, world!';
const chatId = '-1001797140171';
const token = '5256737385:AAHlQd83rrsgc5vwjL0k-6mDYfsz7J_ZD7I';

fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    chat_id: chatId,
    photo: photo,
    caption: caption
  })
})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });


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
