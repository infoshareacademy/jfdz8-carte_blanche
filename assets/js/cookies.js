var cookieContainer;
var cookieBtnContainer;
var cookieBtn;

function cookieAlert() {
    cookieContainer = document.createElement('div');
    cookieBtnContainer = document.createElement('div');
    cookieBtn = document.createElement('button');

    cookieContainer.setAttribute('id', 'cookie__container');
    cookieContainer.innerHTML = '<p>Zgodnie z obowiązującym Rozporządzeniem Parlamentu Europejskiego i Rady (UE) ' +
        '2016/679 z dnia 27 kwietnia 2016 r (RODO). Potrzebujemy Twojej zgody na przetwarzanie Twoich danych osobowych' +
        ' przechowywanych w plikach cookies. Poniżej znajdziesz szczegóły na ten temat.</p>' +
        '\n' +
        '<p>Administratorem danych osobowych jest CarteBlanche Undefined.\n</p>' +
        '<p>Twoje dane będą eksploatowane na następujących polach: pomiary statystyczne - chcemy wiedzieć ile osób ' +
        'odwiedza naszą stronę; profilowanie oferty - chcemy lepiej dopasowywać ofertę do zainteresowań czytelników;' +
        ' do świadczenie usług drogą elektroniczną.\n</p>' +
        '<p>Zgodnie z obowiązującym prawem Twoje dane mogą być przekazywane podmiotom przetwarzające dane na nasze ' +
        'zlecenie np: firmy zajmujące się marketingiem, reklamą, podwykonawcy usług. Twoje dane mogą być też ' +
        'udostępnione organom prawa, o ile otrzymamy stosowną podstawę prawną.\n</p>' +
        '<p>Możesz w każdej chwili wycofać zgodę na przetwarzanie danych, masz prawo dostępu do nich, sprostowania, ' +
        'usunięcia itp. Szczegóły znajdziesz w naszej polityce prywatności.\n' +
        '<p>Twoja zgoda: zgadzam się na przechowywanie na urządzeniu, z którego korzystam tzw. plików cookies oraz ' +
        'na przetwarzanie moich danych osobowych pozostawianych w czasie korzystania przeze mnie ze strony internetowej ' +
        'lub serwisów oraz innych parametrów zapisywanych w plikach cookies w celach marketingowych i w celach ' +
        'analitycznych przez CarteBlanche Undefined.\n</p>'

    cookieBtnContainer.setAttribute('class', 'cookie__button');
    cookieBtn.setAttribute('class', 'form-_button--text');
    cookieBtn.setAttribute('type', 'submit');
    cookieBtn.innerHTML = 'tak';

    function clickHandler(e) {
        e.preventDefault();
        document.body.removeChild(cookieContainer);
        localStorage.setItem('carte_blanche-cookies', '1');
    }
    cookieBtn.addEventListener('click', clickHandler);

    document.body.appendChild(cookieContainer);
    cookieContainer.appendChild(cookieBtnContainer);
    cookieBtnContainer.appendChild(cookieBtn);

};

if (!localStorage.getItem('carte_blanche-cookies')) {
    cookieAlert();
}

function displayHeroBtn() {
    var hero = document.getElementById('home');
    var heroBtn = document.createElement('div');
    var heroBtnText = document.createElement('a');
    heroBtn.setAttribute('class', 'hero__btn');
    heroBtnText.setAttribute('class', 'hero__btn--text');
    heroBtnText.setAttribute('href', '#form');
    heroBtnText.innerText = 'Zgarnij zaproszenie na premierę';

    hero.appendChild(heroBtn);
    heroBtn.appendChild(heroBtnText);
}

if (localStorage.getItem('carte_blanche-cookies')) {
    displayHeroBtn()
}

cookieBtn.addEventListener('click', displayHeroBtn);

