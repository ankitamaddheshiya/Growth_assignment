const BaseServerUrl = "https://growthcx-word-count-app.onrender.com";
let showname = document.getElementById("showname")

const data = JSON.parse(localStorage.getItem("user")) || null;
// console.log(data);
if (data) {
    showname.textContent = `Welcome! ${data.name}`
}
const token = localStorage.getItem("token");

let loginbtn = document.getElementById('login')

if (token) {
    loginbtn.innerText = `Logout`
    loginbtn.addEventListener("click", async () => {
        try {
            fetch(`${BaseServerUrl}/user/logout`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `${token}`
                    }
                }
            ).then(res => res.json())
                .then(data => {
                    localStorage.clear();
                    Swal.fire(
                        `${data.msg}`,
                        '',
                        'success'
                    )
                })
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    })
} else {
    loginbtn.innerText = `Login/Signup`
    loginbtn.addEventListener("click", () => {
        window.location.href = "./login.html"
    })
}

const dashBoardBtn = document.getElementById("dash");

dashBoardBtn.addEventListener("click",()=>{
    if(token){
        window.location.href="./dashboard.html"
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Please Login First`
        });
    }
})

const favBtn = document.getElementById("fav");

favBtn.addEventListener("click",()=>{
    if(token){
        window.location.href="./favorite.html"
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Please Login First`
        });
    }
})


const getDetailsBtn = document.getElementById("getDetails");
const websiteUrl = document.getElementById("url");


getDetailsBtn.addEventListener("click",()=>{
    if(token){
        console.log(websiteUrl.value)
      fetch(`${BaseServerUrl}/insight`,{
        method:"POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `${token}`
        },
        body:JSON.stringify({
            url:websiteUrl.value
        })
      })
      .then(res=>res.json())
        .then(data=>{
            console.log(data);
            Swal.fire(
                `Data Fetched Sucessfully`,
                'Rediecting to Dashboard',
                'success'
            )
            setTimeout(()=>{
              window.location.href="./dashboard.html"
            },1000)
        })
        .catch(err=>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Ristricted Website URL`
              });
        })
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Please Login First`
          });
          setTimeout(()=>{
            window.location.href="./login.html"
          },2000)
    }
})