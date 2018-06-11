    function cookieAlert() {
        var container = document.createElement('div'),
            button = document.createElement('button');

        container.setAttribute('id', 'cookie__container');
        container.innerHTML = '<p>Od 25 maja 2018 roku obowiązuje Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r (RODO). Potrzebujemy Twojej zgody na przetwarzanie Twoich danych osobowych przechowywanych w plikach cookies. Poniżej znajdziesz szczegóły na ten temat.</p>' +
        '\n' +
        '<h6>W jakim celu będziemy przetwarzać twoje dane?\n</h6>' +
        '<p>- pomiary statystyczne - chcemy wiedzieć ile osób odwiedza naszą stronę\n</P>' +
        '<p>- marketing - chcemy lepiej dopasowywać reklamy do zainteresowań czytelników\n</P>' +
        '<p>- do świadczenia usług drogą elektroniczną\n</p>' +
        '<h6>Kto jest administratorem danych osobowych?\n</h6>' +
        '<p>Administratorem danych osobowych jest CarteBlanche Undefined.\n</p>' +
        '<h6>Komu możemy przekazywać dane?\n</h6>' +
        '<p>Zgodnie z obowiązującym prawem mogą to być podmioty przetwarzające dane na nasze zlecenie np: firmy zajmujące się marketingiem, reklamą, podwykonawcy usług. Twoje dane mogą być też udostępnione organom prawa o ile otrzymamy stosowną podstawę prawną.\n</p>' +
        '<h6>Jakie są twoje prawa w stosunku do twoich danych?\n</h6>' +
        '<p>Możesz w każdej chwili wycofać zgodę na przetwarzanie danych, masz prawo dostępu do nich, sprostowania, usunięcia itp. Szczegóły znajdziesz w naszej polityce prywatności.\n' +
        '<h6>Twoja zgoda\n</h6>' +
        '<p>Zgadzam się na przechowywanie na urządzeniu, z którego korzystam tzw. plików cookies oraz na przetwarzanie moich danych osobowych pozostawianych w czasie korzystania przeze mnie ze stron internetowej lub serwisów oraz innych parametrów zapisywanych w plikach cookies w celach marketingowych i w celach analitycznych przez CarteBlanche Undefined.\n</p>'

        button.setAttribute('class', 'form-_button--text');
        button.setAttribute('type', 'submit');
        button.innerHTML = '<p>Zgadzam się</p>';

        function clickHandler(e) {
            e.preventDefault();
            document.body.removeChild(container);
            localStorage.setItem('carte_blanche-cookies', '1');
        }
        button.addEventListener('click', clickHandler);

        document.body.appendChild(container);
        container.appendChild(button);

    };

    if (!localStorage.getItem('carte_blanche-cookies')) {
        cookieAlert();
    }
