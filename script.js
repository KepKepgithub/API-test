let select = document.querySelector(".select");
let inputField = document.querySelector(".input");


fetch(`https://restcountries.eu/rest/v2/${select.value}?fields=name;flag;capital;population;region;subregion;
topLevelDomain;currencies;languages;borders;alpha3Code;nativeName`,{
}).then((res)=>{return res.json()}).then((data)=>{
    // create an array of names so I can use search to look for them
    data.forEach((data)=>{
        createCard(data);
    })
    // search bar
    inputField.addEventListener('keyup', ()=>{
        let term = inputField.value.toLowerCase();
        let cards = document.querySelectorAll('.cardBody');
        cards.forEach((e)=>{
            const cardName = e.children[1].innerHTML;
            if(cardName.toLowerCase().indexOf(term) != -1){
                e.style.display = "block";
            }
            else{
                e.style.display = "none";
            }
        })
    })
})

select.addEventListener('change', ()=>{
    location.reload();
})





function createCard(data){
    const cardBody = document.createElement('a');
    cardBody.classList.add('cardBody');
    const flagNode = document.createElement('img');
    flagNode.src = data.flag;
    const nameNode = document.createElement('h1');
    nameNode.innerHTML =  data.name;
    const populationNode = document.createElement('p');
    populationNode.innerHTML = `Population: <span>${data.population}</span>`;
    const regionNode = document.createElement('p');
    regionNode.innerHTML = `Region: <span>${data.region}</span>`;
    const capitalNode = document.createElement('p');
    capitalNode.innerHTML = `Capital: <span>${data.capital}</span>`;
    // appends all the text/img to the cards
    cardBody.append(flagNode, nameNode, populationNode, regionNode, capitalNode);
    // Places the card inside body
    document.body.appendChild(cardBody);

    // creates modal overlay when clicking for more info
    cardBody.addEventListener("click",()=>{
        const modalBody = document.createElement('div');
        modalBody.classList.add('moreInfo');
        modalBody.style.top = `${window.scrollY}px`

        const modalBtn = document.createElement('button');
        modalBtn.classList.add('modalBtn');
        modalBtn.innerHTML = 'back';

        const modalFlag = document.createElement('img');
        modalFlag.src = data.flag;

        const modalName = document.createElement('h1');
        modalName.innerHTML = data.name;

        const modalNativeName = document.createElement('p');
        modalNativeName.innerHTML = `Natvive Name: <span>${data.nativeName}</span>`;

        const modalPopulation = document.createElement('p');
        modalPopulation.innerHTML = `Population: <span>${data.population}</span>`

        const modalRegion = document.createElement('p');
        modalRegion.innerHTML = `Region: <span>${data.region}</span>`;

        const modalSubregion = document.createElement('p');
        modalSubregion.innerHTML = `Subregion: <span>${data.subregion}</span>`;

        const modalCapital = document.createElement('p');
        modalCapital.innerHTML = `Capital: <span>${data.capital}</span>`;

        const modalTopDomain = document.createElement('p');
        modalTopDomain.innerHTML = `Top Level Domain: <span>${data.topLevelDomain}</span>`;

        // Create a new array of currency "names" to make it easier to work with them
        const newCurrecyArr = [];
        const currencyArr = data.currencies;
        currencyArr.forEach((e)=>{
            newCurrecyArr.push(e.name);
        })
        const modalCurrencies = document.createElement('p');
        modalCurrencies.innerHTML = `Currencies: <span>${newCurrecyArr.join(",")}</span>`;

        // Create a new array of languages "names" to make it easier to work with them
        const newLangArr = [];
        const languagesArr = data.languages;
        languagesArr.forEach((e)=>{
                newLangArr.push(e.name);
        })
        const modalLanguages = document.createElement('p');
        modalLanguages.innerHTML = `Languages: ${newLangArr.join(',')}`;

        const modalBordersHeader = document.createElement('h2');
        modalBordersHeader.innerHTML = "Border Countries:";
        const modalBordersWrap = document.createElement('div');
        const bordersArray = data.borders;
        bordersArray.forEach((e)=>{
            const modalBorders = document.createElement('button');
            modalBorders.innerHTML = e;
            modalBordersWrap.appendChild(modalBorders);

            modalBorders.addEventListener('click',()=>{
                newCode = modalBorders.innerHTML;
                fetch(`https://restcountries.eu/rest/v2/alpha/${newCode}?fields=name;flag;capital;population;
                region;subregion;topLevelDomain;currencies;languages;borders;alpha3Code;nativeName`).then((res)=>{
                    return res.json();
                }).then((data)=>{
                    modalFlag.src = data.flag;
                    modalName.innerHTML = data.name;
                    modalNativeName.innerHTML = `Natvive Name: <span>${data.nativeName}</span>`;
                    modalPopulation.innerHTML = `Population: <span>${data.population}</span>`;
                    modalRegion.innerHTML = `Region: <span>${data.region}</span>`;
                    modalSubregion.innerHTML = `Subregion: <span>${data.subregion}</span>`;
                    modalCapital.innerHTML = `Capital: <span>${data.capital}</span>`;
                    modalTopDomain.innerHTML = `Top Level Domain: <span>${data.topLevelDomain}</span>`;
                    // Create a new array of currency "names" to make it easier to work with them
                    const newCurrecyArr = [];
                    const currencyArr = data.currencies;
                    currencyArr.forEach((e)=>{
                        newCurrecyArr.push(e.name);
                    })
                    modalCurrencies.innerHTML = `Currencies: <span>${newCurrecyArr.join(",")}</span>`;
                    // Create a new array of languages "names" to make it easier to work with them
                    const newLangArr = [];
                    const languagesArr = data.languages;
                    languagesArr.forEach((e)=>{
                            newLangArr.push(e.name);
                    })
                    modalLanguages.innerHTML = `Languages: ${newLangArr.join(',')}`;
                })
            })
        })
        modalBordersWrap.classList.add('modalBoardersWrap');
        modalBody.append(modalBtn, modalFlag, modalName, modalNativeName, modalPopulation,
                        modalRegion, modalSubregion, modalCapital, modalTopDomain,
                        modalCurrencies, modalLanguages, modalBordersHeader, modalBordersWrap);
        document.body.appendChild(modalBody);



        disableScroll();
        modalBtn.addEventListener('click', ()=>{
            modalBody.remove();
            enableScroll();
        })
    })
}




function disableScroll() { 
    // Get the current page scroll position 
    scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        // if any scroll is attempted, set this to the previous value 
        window.onscroll = function() { 
            window.scrollTo(scrollLeft, scrollTop); 
        }; 
}

function enableScroll() { 
    window.onscroll = function() {}; 
} 



// "https://restcountries.eu/rest/v2/all?fields=name;flag;capital;population;region;subregion;topLevelDomain;currencies;languages;borders"
