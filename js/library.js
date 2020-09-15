class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        return `${this.title} by ${this.author} (${this.pages} pages, ${(this.read) ? '' : 'un'}read)`;
    }
}

const library = [];

function addBookToLibrary(title, author, pages, read = false) {
    let book = new Book(title, author, pages, read);
    library.push(book);
}

function addSomeInitialBooks() {
    addBookToLibrary('The Hobbit', 'JRR Tolkein', 299);
    addBookToLibrary('The Bible', 'God', 999);
    addBookToLibrary('The Room On The Broom', 'Julia Donaldson', 17, true);
}

function displayBooks() {
    let parent = document.querySelector('div .books');
    let table = createBookTable();
    if (table) {
        parent.append(table);
    }
}

function createBookTable() {
    const bookTableClass = 'bookTable';
    let bookTable = document.querySelector(`table.${bookTableClass}`);
    if (!bookTable) {
        bookTable = document.createElement('table');
    } else {
        // don't recreate the table if it already exists
        return;
    }

    bookTable.classList.add(bookTableClass);
    // create one row per book
    for (i = 0; i < library.length; i++) {
        let bookRow = document.createElement('tr');
        bookRow.classList.add('bookRow');
        bookRow.setAttribute('data-book-index', i);
        setBookIndex(bookRow, i);
        bookRow.append(createBookData(library[i]));
        bookRow.append(createDeleteButton(i));
        bookTable.append(bookRow);
    }

    return bookTable;
}

function createBookData(book) {
    let bookData = document.createElement('td');
    bookData.classList.add('bookData');
    bookData.textContent = book.info();
    return bookData;
}

function createDeleteButton(index) {
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    setBookIndex(button, index);
    button.classList.add('delete-button');
    button.textContent = 'Click Me';
    button.onclick = deleteBook;
    return button;
}

const bookIndexDataAttribute = 'data-book-index';
function setBookIndex(element, index) {
    element.setAttribute(bookIndexDataAttribute, index);
}

function getBookIndex(element) {
    return +element.getAttribute(bookIndexDataAttribute);
}

function getBookRow(index) {
    return document.querySelector(`tr[data-book-index="${index}"]`);
}

function getButton(index) {
    return document.querySelector(`button[data-book-index="${index}"]`);
}

function deleteBook() {
    let bookTable = document.querySelector('table.bookTable');
    let deleteIndex = getBookIndex(this);
    let bookRow = getBookRow(deleteIndex);

    // delete the row
    bookTable.removeChild(bookRow)

    // shift the data- index of all subsequent rows / buttons
    for (i = +deleteIndex + 1; i < library.length; i++) {
        let row = getBookRow(i);
        let button = getButton(i);
        setBookIndex(row, i - 1);
        setBookIndex(button, i - 1);
    }

    // delete the book from the library
    library.splice(deleteIndex, 1);
}

addSomeInitialBooks();
displayBooks();