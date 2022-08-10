const $listGroup = document.querySelector('.list-group');

const $listItem = document.querySelector('.list-group-item');

const printResults = resultArr => {

    console.log(resultArr);

    const noteHTML = resultArr.map(({ id, title }) => {

        return `
        
        <li class="list-group-item" data-id=${id}>
            <h4 class="list-item-title">${title}</h4>
            <i class="fas fa-trash-alt"></i>
        </li>
      
      `;

    });

    $listGroup.innerHTML = noteHTML.join('');


};

const getNotes = (formData = {}) => {

    let queryUrl = 'api/notes?';

    Object.entries(formData).forEach(([key, value]) => {

        queryUrl += `${key}=${value}&`;

    });

    fetch('/api/notes')

        .then(response => {

            if (!response.ok) {

                return alert(`Error: ${response.statusText}`);

            }

            return response.json();

        })

        .then(noteArr => {

            console.log(noteArr);

            printResults(noteArr);

        });

};

const handleGetNotesSubmit = event => {

    event.preventDefault();

    const titleHTML = $listItem.querySelector('[name="title"]');

    const title = titleHTML.value;


    const noteObject = {title};

    getNotes(noteObject);

}

getNotes();


$listItem.addEventListener('submit', handleGetNotesSubmit);


