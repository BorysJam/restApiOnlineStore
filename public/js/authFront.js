const usernameCookie = document.getElementById('usernameCookie');
const loginA = document.getElementById('loginA');
const registerA = document.getElementById('registerA');

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    if(cookie[cookieName]){
        loginA.style.display = 'none'
        registerA.style.display = 'none'
        usernameCookie.innerHTML = cookie[cookieName];
    }else{
        console.dir('irena')
    }
  }

  getCookie('userName')
