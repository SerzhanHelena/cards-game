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

let card = new CardClass();
card.createBoard();

let table = new TableClass();

const windowOnClick = (e) => {
    if (e.target === document.querySelector('.table-wrapper')) {
        document.getElementById('records-table').remove();
        document.querySelector('.table-wrapper').classList.remove('show-modal');
    }
};
window.addEventListener('click', windowOnClick);

const logOut = () => {
    window.location = './form/form.html';
};

const logOutBtn = document.getElementById('log-out');
logOutBtn.addEventListener('click', logOut);

const recordsBtn = document.getElementById('record-table');
recordsBtn.addEventListener('click', table.seeRecordsTable);

const radioButtons = document.querySelectorAll('.radio-btn');
radioButtons.forEach(radioButton => radioButton.addEventListener('change', () => {
        const boardContainer = document.getElementById('memory_board').innerHTML = '';
        timer.innerHTML = '';
        //time = 0;
    card.createBoard();
    }
));





