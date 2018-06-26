function cookieAlert() {
    var container = document.createElement('div');
    var container_button = document.createElement('div');
    button = document.createElement('button');

    container.setAttribute('id', 'cookie__container');
    container.innerHTML = '<p>Od 25 maja 2018 roku obowiązuje Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r (RODO). Potrzebujemy Twojej zgody na przetwarzanie Twoich danych osobowych przechowywanych w plikach cookies. Poniżej znajdziesz szczegóły na ten temat.</p>' +
        '\n' +
        '<p>W jakim celu będziemy przetwarzać twoje dane? | Pomiary statystyczne - chcemy wiedzieć ile osób odwiedza naszą stronę, marketing - chcemy lepiej dopasowywać reklamy do zainteresowań czytelników, do świadczenia usług drogą elektroniczną\n</p>' +
        '<p>Kto jest administratorem danych osobowych? | Administratorem danych osobowych jest CarteBlanche Undefined.\n</p>' +
        '<p>Komu możemy przekazywać dane? | Zgodnie z obowiązującym prawem mogą to być podmioty przetwarzające dane na nasze zlecenie np: firmy zajmujące się marketingiem, reklamą, podwykonawcy usług. Twoje dane mogą być też udostępnione organom prawa o ile otrzymamy stosowną podstawę prawną.\n</p>' +
        '<p>Jakie są twoje prawa w stosunku do twoich danych? | Możesz w każdej chwili wycofać zgodę na przetwarzanie danych, masz prawo dostępu do nich, sprostowania, usunięcia itp. Szczegóły znajdziesz w naszej polityce prywatności.\n' +
        '<p>Twoja zgoda: zgadzam się na przechowywanie na urządzeniu, z którego korzystam tzw. plików cookies oraz na przetwarzanie moich danych osobowych pozostawianych w czasie korzystania przeze mnie ze stron internetowej lub serwisów oraz innych parametrów zapisywanych w plikach cookies w celach marketingowych i w celach analitycznych przez CarteBlanche Undefined.\n</p>'

    container_button.setAttribute('class', 'cookie-button');
    button.setAttribute('class', 'form-_button--text');
    button.setAttribute('type', 'submit');
    button.innerHTML = 'tak';

    function clickHandler(e) {
        e.preventDefault();
        document.body.removeChild(container);
        localStorage.setItem('carte_blanche-cookies', '1');
    }
    button.addEventListener('click', clickHandler);

    document.body.appendChild(container);
    container.appendChild(container_button);
    container_button.appendChild(button);

};

if (!localStorage.getItem('carte_blanche-cookies')) {
    cookieAlert();
}
