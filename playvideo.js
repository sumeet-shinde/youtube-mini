let vi = JSON.parse(localStorage.getItem('vID'));

let videoDiv = document.querySelector("#videoDiv");

let play = (vi) => {

  videoDiv.innerHTML = "";
  vi.map(function(ele){
    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${ele.id}`;
    iframe.setAttribute("allowfullscreen", "true");
    // iframe.height = "315";
    // iframe.width = "460";

    let t = ele.snippet.title;

    let vtitle = document.createElement('p');
    vtitle.setAttribute('class','vtitle');
    vtitle.innerHTML = t;


    videoDiv.append(iframe,vtitle);
  });
}

play(vi);