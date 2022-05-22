const resultsDiv = document.querySelector("#resultsDiv");

async function mostVideo() {
  try {
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&regionCode=in&key=<key>`;

    let res = await fetch(url);

    let data = await res.json();

    let vid = data.items;

    console.log(vid);

    mostPopularVideos(vid);
  } catch (err) {
    console.log("err:", err);
  }
}

mostVideo();

async function searchVideo() {
  try {
    let search_string = document.querySelector("#search").value;

    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${search_string}&type=video&key=<key>&maxResults=20`;

    let res = await fetch(url);

    let data = await res.json();

    let videos = data.items;

    appendVideos(videos);
  } catch (err) {
    console.log("err:", err);
  }
}

let most = document.querySelector(".most");

let appendVideos = (re) => {
  most.style.display = "none";

  console.log(re);

  resultsDiv.innerHTML = "";

  re.forEach((ele) => {
    let vdiv = document.createElement("div");
    vdiv.setAttribute("class", "vdiv");

    // let iframe = document.createElement("iframe");
    // iframe.src = `https://www.youtube.com/embed/${ele.id}`;
    // iframe.setAttribute("allowfullscreen", "true");
    // // iframe.height = "315";
    // // iframe.width = "460";
    // vdiv.append(iframe);

    let d = ele.snippet.thumbnails.high.url;

    let thumb = document.createElement("img");
    thumb.src = d;
    thumb.setAttribute("class", "thumb");

    let tdiv = document.createElement("div");
    tdiv.setAttribute("class", "tdiv");

    let t = ele.snippet.title;

    let s = ele.snippet;

    let vtitle = document.createElement("p");
    vtitle.setAttribute("class", "vtitle");
    vtitle.innerHTML = t;

    // let i = ele.id;

    let video = [];

    vtitle.addEventListener("click", function () {
      let o = {
        id: ele.id.videoId,
        snippet: ele.snippet,
      };
      video.push(o);
      console.log(video);
      localStorage.setItem("vID", JSON.stringify(video));

      window.location.href = "playvideo.html";
    });

    let c = ele.snippet.channelTitle;

    let ctitle = document.createElement("p");
    ctitle.setAttribute("class", "ctitle");
    ctitle.innerHTML = c;

    tdiv.append(vtitle, ctitle);

    vdiv.append(thumb, tdiv);

    resultsDiv.append(vdiv);
  });
};

let mostPopularVideos = (results) => {
  resultsDiv.innerHTML = "";

  results.forEach((ele) => {
    console.log("videoId:", ele.id);

    let vdiv = document.createElement("div");
    vdiv.setAttribute("class", "vdiv");

    // let iframe = document.createElement("iframe");
    // iframe.src = `https://www.youtube.com/embed/${ele.id}`;
    // iframe.setAttribute("allowfullscreen", "true");
    // // iframe.height = "315";
    // // iframe.width = "460";
    // vdiv.append(iframe);

    let vid = [];

    let d = ele.snippet.thumbnails.high.url;

    let thumb = document.createElement("img");
    thumb.src = d;
    thumb.setAttribute("class", "thumb");
    thumb.style.cursor = "pointer";

    thumb.addEventListener("click", function () {
      window.location.href = "playvideo.html";
      vid.push(ele);
      localStorage.setItem("vID", JSON.stringify(vid));
    });

    let tdiv = document.createElement("div");
    tdiv.setAttribute("class", "tdiv");

    let t = ele.snippet.title;

    let vtitle = document.createElement("p");
    vtitle.setAttribute("class", "vtitle");
    vtitle.innerHTML = t;

    // let i = ele.id;

    vtitle.addEventListener("click", function () {
      window.location.href = "playvideo.html";
      vid.push(ele);
      localStorage.setItem("vID", JSON.stringify(vid));
    });

    let c = ele.snippet.channelTitle;

    let ctitle = document.createElement("p");
    ctitle.setAttribute("class", "ctitle");
    ctitle.innerHTML = c;

    tdiv.append(vtitle, ctitle);

    vdiv.append(thumb, tdiv);

    resultsDiv.append(vdiv);
  });
};
