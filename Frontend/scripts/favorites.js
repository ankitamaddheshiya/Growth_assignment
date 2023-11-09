const BaseServerUrl = "https://growthcx-word-count-app.onrender.com";
let showname = document.getElementById("showname")

const data = JSON.parse(localStorage.getItem("user")) || null;

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
                window.location.href = "./index.html"
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

dashBoardBtn.addEventListener("click", () => {
    if (token) {
        window.location.href = "./dashboard.html"
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Please Login First`
        });
    }
})

const favBtn = document.getElementById("fav");

favBtn.addEventListener("click", () => {
    if (token) {
        window.location.href = "./favorite.html"
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Please Login First`
        });
    }
})


function fetchData() {
    fetch(`${BaseServerUrl}/insight/getallinsight?favorite=true`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            renderData(data);
        })
}


const mainContainer = document.getElementById("mainContainer");
function renderData(data = []) {
    mainContainer.innerHTML = null;
    data.forEach((el) => {
    
      let tableRow = document.createElement("tr");
      tableRow.setAttribute("class","table-light");



      let tableHead = document.createElement("th");
      tableHead.setAttribute("scope","row");
      tableHead.innerText = el.url;



      let wordCount = document.createElement("td");
      wordCount.innerText = el.wordCount;



      let favorite = document.createElement("td");
      favorite.innerText = el.favorite;



      let weblinks = document.createElement("td");
      weblinks.setAttribute("class","scrollable-cell")

      let weblinksDiv = document.createElement("div");
      weblinksDiv.setAttribute("class","content-container")
      if(el.weblinks.length===0){
        weblinksDiv.innerText = `No Weblinks in Website`
      }else{
        weblinksDiv.innerText = el.weblinks;
      }
      weblinks.append(weblinksDiv);



    
      let imagelinks = document.createElement("td");
      imagelinks.setAttribute("class","scrollable-cell")

      const imagelinksDiv = document.createElement("div");
      imagelinksDiv.setAttribute("class","content-container")
      if(el.images.length === 0){
       imagelinksDiv.innerText = `No Images in Website`
      }else{
        imagelinksDiv.innerText = el.images;
      }
      
      imagelinks.append(imagelinksDiv)




      let videolinks = document.createElement("td");
      videolinks.setAttribute("class","scrollable-cell")
      const videolinksDiv = document.createElement("div");
      videolinksDiv.setAttribute("class","content-container");
      if(el.videos.length===0){
        videolinksDiv.innerText = `No Videos in Website`
      }else{
        videolinksDiv.innerText = el.videos;
      }
      

      videolinks.append(videolinksDiv);



      let deletetd = document.createElement("td");
      let deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class","delete")
      deleteBtn.innerText="Delete";
      deleteBtn.addEventListener("click",()=>{
        fetch(`${BaseServerUrl}/insight/delete/${el._id}`,{
            method:"DELETE",
            headers:{
                "content-type": "application/json",
                "Authorization": `${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.msg==="Insight Deleted Sucessfully"){
                Swal.fire(
                    `${data.msg}`,
                    '',
                    'success'
                )
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Unable to Delete`
                });  
            }
            fetchData();
        })
      })
      deletetd.append(deleteBtn);

      tableRow.append(tableHead,wordCount,favorite,weblinks,imagelinks,videolinks,deletetd);

      mainContainer.append(tableRow);

    })
}

fetchData();