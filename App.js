// API- https://inshorts.deta.dev/news?category=science

let newsContainer = document.querySelector("#newsContainer");
let saveButton = document.querySelector("#saveButton");
let loadSavedButton = document.querySelector("#loadSavedButton");
let loadNewsButton = document.querySelector("#loadNewsButton");
let categorySelect = document.querySelectorAll(".categorySelect");
let loader = document.querySelector("#loader");

let savedNews = [];

let handleSavedNews = (savedItem) => {
  savedNews.push(savedItem);
  // console.log(savedNews);
  alert("News Saved");
};

let getNews = (category) => {
  newsContainer.innerHTML = "";
  fetch(`https://inshorts.deta.dev/news?category=${category}`)
    .then((response) => response.json())
    .then((data) => {
      //  console.log("Data", data)

      data.data.forEach((newsItem) => {
        let div = document.createElement("div");
        div.classList.add("newsItem");
        div.innerHTML = `
          <p>By <strong>${newsItem.author}</strong></p>
          <h2 id="newsheading">${newsItem.title}</h2>
          <div id="box">
            <img src="${newsItem.imageUrl}" class="img"></img>
            <div id="innerbox">
              <p id="nscontent">${newsItem.content} <a href="${newsItem.readMoreUrl}" style="text-decoration:none">READ MORE</a></p>
              <p>Date:- <strong>${newsItem.date}</strong></p>
              <p>Time:- <strong>${newsItem.time}</strong></p>
            </div>
          </div>
        `;
        let button1 = document.createElement("button");
        button1.style.color = "white";
        button1.style.backgroundColor = "mediumblue";
        button1.style.border = "none";
        button1.style.marginTop = "10px";
        button1.style.cursor = "pointer";
        button1.style.padding = "5px";
        button1.innerHTML = "Save-News";
        button1.onclick = function () {
          handleSavedNews(newsItem);
        };
        div.appendChild(button1);
        newsContainer.appendChild(div);
      });
      loader.style.display = "none";
    });
};

let saveNews = () => {
  let news = Array.from(document.querySelectorAll(".newsItem")).map(
    (newsItem) => {
      return {
        title: newsItem.querySelector("h2").textContent,
        content: newsItem.querySelector("#nscontent").textContent,
      };
    }
  );
  console.log("saved news", news);
  localStorage.setItem("savedNews", JSON.stringify(news));
};

let loadSavedNews = () => {
  // console.log("Saved News", savedNews)
  newsContainer.innerHTML = "";
  // const savedNews = JSON.parse(localStorage.getItem("savedNews"));
  //console.log("saved news from storage", savedNews)
  if (!savedNews) {
    return;
  }
  savedNews.forEach((newsItem) => {
    let div = document.createElement("div");
    div.classList.add("newsItem");
    div.innerHTML = `
    <h2>${newsItem.title}</h2>
    <p>${newsItem.content}</p>
    `;
    newsContainer.appendChild(div);
  });
};

loadSavedButton.addEventListener("click", loadSavedNews);


function showCategory(event) {
  document.querySelector("#hidden").style.display = "block";
  let value = event.target.value;
  // console.log(value);
  getNews(value);
}

