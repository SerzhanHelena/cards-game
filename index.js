const colorsArray = [
    '#CD5C5C', '#CD5C5C', '#DC143C', '#DC143C',
    '#FF0000', '#FF0000', '#8B0000', '#8B0000',
    '#FFC0CB', '#FFC0CB', '#FF69B4', '#FF69B4',
    '#C71585', '#C71585', '#DB7093', '#DB7093',
    '#FFA07A', '#FFA07A', '#FF8C00', '#FF8C00',
    '#FFFF00', '#FFFF00', '#FFFACD', '#FFFACD',
    '#F0E68C', '#F0E68C', '#D8BFD8', '#D8BFD8',
    '#3CB371', '#3CB371', '#40E0D0', '#40E0D0',
    '#9370DB', '#9370DB', '#9932CC', '#9932CC',
    '#6A5ACD', '#6A5ACD', '#D2691E', '#D2691E',
    '#000000', '#000000', '#C0C0C0', '#C0C0C0',
    '#191970', '#191970', '#ADFF2F', '#ADFF2F',
    '#FFFF00', '#FFFF00', '#0000FF', '#0000FF' ,
    '#FF00FF', '#FF00FF', '#BC8F8F', '#BC8F8F',
    '#B8860B', '#B8860B', '#A52A2A', '#A52A2A',
    '#D2B48C', '#D2B48C', '#00FF7F', '#00FF7F'
];

let score = 0;
const keyUsers = "Users";
const keyUser = 'User';
const scoreContainer =  document.getElementById('score');

const createTableRecords = () => {
    const table = document.createElement('table');
    table.setAttribute('id', 'records-table');
    const tableWrapper = document.querySelector('.table-wrapper');

    const tr = document.createElement('tr');
    table.appendChild(tr);
    tr.appendChild(document.createElement('th'));
    tr.appendChild(document.createElement('th'));
    table.rows[0].cells[0].innerHTML = 'Username';
    table.rows[0].cells[1].innerHTML = 'Score';
    tableWrapper.appendChild(table);

    const users = JSON.parse(localStorage.getItem(keyUsers));
    if (users.length > 1) {
        users.sort((a, b) => {
            return b.score - a.score;
        })
    }
    let i = 1;
    users.forEach(elem => {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        table.rows[i].cells[0].textContent = elem.userName;
        table.rows[i].cells[1].innerHTML = elem.score;
        i++;
    });

};

const seeRecordsTable = () => {
    const table = document.getElementById('records-table');
    document.querySelector('.table-wrapper').classList.add('show-modal');
    createTableRecords();
};

const windowOnClick = (e) => {
    if (e.target === document.querySelector('.table-wrapper')) {
        document.getElementById('records-table').remove();
        document.querySelector('.table-wrapper').classList.remove('show-modal');
    }
};
window.addEventListener('click', windowOnClick);

const addRecordToTable = () => {
    const user = JSON.parse(localStorage.getItem(keyUser));

    if (JSON.parse(localStorage.getItem(keyUsers) === null)) {
        const users = [user];
        localStorage.setItem(keyUsers, JSON.stringify(users));
    } else {
        let users = JSON.parse(localStorage.getItem(keyUsers));
        if (users.length < 3) {
            users.push(user);
        } else {
            let min = Math.min.apply(null, users.map(item => item.score));
            if (user.score > min) {
                users = users.filter(e => e.score !== min);
                users.push(user);
            }
        }
        localStorage.setItem(keyUsers, JSON.stringify(users));
    }
    createTableRecords();
};

const logOut = () => {
    window.location = './form/form.html';
};

const logOutBtn = document.getElementById('log-out');
logOutBtn.addEventListener('click', logOut);

const recordsBtn = document.getElementById('record-table');
recordsBtn.addEventListener('click', seeRecordsTable);

const radioButtons = document.querySelectorAll('.radio-btn');
radioButtons.forEach(radioButton => radioButton.addEventListener('change', () => {
        const boardContainer = document.getElementById('memory_board').innerHTML = '';
        createBoard();
}
    ));

createBoard();




