let eventRefresh = document.querySelector('#eventRefresh');
let cards_wrap = document.querySelector(".cards_wrap");
const url = "https://japscan-scraping-v2-server.herokuapp.com/";

function disabledButton(selectElement, durationSecond) {
    selectElement.disabled = true;
    setTimeout(()=>selectElement.disabled = false, durationSecond * 1000);
}

function startTimer(duration, display) {
    var timer = duration, seconds;
    objInterval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = seconds;
        if (--timer < 0) {
            display.textContent = "";
            clearInterval(objInterval)
        }
    }, 1000);
}

eventRefresh.addEventListener('click', () => {
    cards_wrap.innerHTML="";

    startTimer(4, document.querySelector('#time'));
    disabledButton(document.querySelector('#eventRefresh'), 6);

    $.ajax({
        type: "GET",
        url: url,
        success: function (manga) {
            manga = JSON.parse(manga);
            manga.forEach((elt)=> {
                cards_wrap.append(buildMangaCard(elt));
            });  
        }
    });
});

function buildMangaCard(manga) {
    let card_item = document.createElement("div");
    card_item.classList.add("card_item");

    let card_inner = document.createElement("div");
    card_inner.classList.add("card_inner", "bgBlanchedalmond");
    
    let titre = document.createElement("h2");
    titre.classList.add("pb-2", "pt-2");
    titre.appendChild(document.createTextNode(manga.titre));

    let imgContainer = document.createElement("a");
    imgContainer.setAttribute("href", manga.urlJapscan);
    let img = document.createElement("img");
    img.classList.add("radius-2", "mb-1", "cursorPointer");
    img.setAttribute("src", manga.urlImage);
    img.setAttribute("alt", "Pas d'image");
    imgContainer.appendChild(img);

    let synopsis = document.createElement("h2");
    synopsis.classList.add("pb-1");
    synopsis.appendChild(document.createTextNode("synopsis"));

    let synopsisContainer = document.createElement("div");
    synopsisContainer.classList.add("justifyText", "pb-2", "pr-2", "pl-2");

    let synopsisContent = document.createElement("span");
    synopsisContent.appendChild(document.createTextNode(manga.synopsis));
    synopsisContainer.appendChild(synopsisContent);

    card_inner.appendChild(titre);
    card_inner.appendChild(imgContainer);
    card_inner.appendChild(synopsis);
    card_inner.appendChild(synopsisContainer);

    card_item.appendChild(card_inner);

    return card_item;
}
