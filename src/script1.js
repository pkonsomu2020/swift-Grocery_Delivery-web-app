// =================================
//    Hero Slider Animation Start
// =================================

// selecting hero slider elements
let heroImg = document.querySelector('.hero-image');
let heroDescription = document.querySelector('.hero-description');

// update hero image
function updateHeroImage(imgIndex) {
    let imgSrc = ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png'];
    let oldImg = document.querySelector('.hero-image img');
    heroImg.removeChild(oldImg);

    let newImg = document.createElement('img');
    newImg.setAttribute('class', 'animate__animated animate__bounceInDown');
    newImg.src = `img/hero/${imgSrc[imgIndex]}`;

    heroImg.appendChild(newImg);
}

// update hero title
function updateHeroTitle(titleIndex) {
    let txt1 = `The best dried fruits for your family health`;
    let txt2 = `Get your daily needs easy and instant`;
    let txt3 = `Try fresh fruits for better healthy lifestyle`;
    let txt4 = `Jinyakulie every product`;
    let txt5 = `Get amazing products by shopping with us`;
    let txt6 = `Fresh vegetables available`;

    let textAra = [txt1, txt2, txt3, txt4, txt5, txt6];

    let oldText = document.querySelector('.hero-title');
    heroDescription.removeChild(oldText);

    let newTitle = document.createElement('h1');
    newTitle.setAttribute('class', 'animate__animated animate__bounceInRight hero-title');
    newTitle.textContent = `${textAra[titleIndex]}`;

    heroDescription.appendChild(newTitle);
}

// update hero button
function updateHeroButton() {
    let oldButton = document.querySelector('.hero-button');
    heroDescription.removeChild(oldButton);

    let newButton = document.createElement('button');
    newButton.textContent = `Explore`;
    newButton.setAttribute('class', 'animate__animated animate__bounceInUp hero-button');

    heroDescription.appendChild(newButton);
}

// initiate slide position
let heroIndex = 0;

// slide right
function heroSlideRight() {
    heroIndex++;

    if (heroIndex === 6) {
        heroIndex = heroIndex % 6;
    }

    updateHeroImage(heroIndex);
    updateHeroTitle(heroIndex);
    updateHeroButton();
}

// slide left
function heroSlideLeft() {
    heroIndex--;

    if (heroIndex < 0) {
        heroIndex = 5;
    }

    updateHeroImage(heroIndex);
    updateHeroTitle(heroIndex);
    updateHeroButton();
}

// auto slide
let heroSlide = setInterval(() => {

    heroSlideRight();

}, 4000);

// slider button
let heroSlideLeftBtn = document.querySelector('.hero-slide-left');
let heroSlideRightBtn = document.querySelector('.hero-slide-right');

// actions while click left arrow button
heroSlideLeftBtn.onclick = () => {
    heroSlideLeft();
}

// actions while click right arrow button
heroSlideRightBtn.onclick = () => {
    heroSlideRight();
}

// ===============================
//    Hero Slider Animation End
// ===============================