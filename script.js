const bookButton = document.querySelector('.book-button');
const modal = document.querySelector('.modal');
const submitBtn = document.querySelector('#submit');
const main = document.querySelector('.main');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');


let myLibrary = [];

const hungerGames = new Book("Suzanne Collins", "The Hunger Games",
374, true, false);
myLibrary.push(hungerGames);

const countCristo = new Book("F. Scott Fitzgerald", "The Great Gatsby",
208, false, false);
myLibrary.push(countCristo);

const divergent = new Book("Veronica Roth", "Divergent", 487, true, false);
myLibrary.push(divergent);

function Book(author, title, totalPages, readStatus, displayStatus) {
  // constructor
  this.author = author;
  this.title = title;
  this.totalPages = totalPages;
  this.readStatus = readStatus;
  this.displayStatus = displayStatus;
}

function addBookToLibrary() {
  // takes user input to store books into array "myLibrary"
  let book = new Book(
    document.getElementById("author").value,
    document.getElementById("title").value,
    document.getElementById("pages").value,
    document.getElementById("read").checked,
    false
  );
  myLibrary.push(book);
  modal.style.display = "none";
  console.log(myLibrary);
  displayBooks();
  clearInput();
}

function clearInput() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
}

function displayBooks() {
  // loops through array of books "myLibrary" and displays them on screen
  for (let book of myLibrary) {
    if (book.displayStatus == false) {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book');
      const title = document.createElement('div');
      title.classList.add('title');
      title.textContent = `"${book.title}"`;
      const author = document.createElement('div');
      author.classList.add('author');
      author.textContent = book.author;
      const pages = document.createElement('div');
      pages.classList.add('pages');
      pages.textContent = book.totalPages;
      const read = document.createElement('button');
      read.classList.add('read');
      if (book.readStatus == true) {
        read.textContent = "Read";
      } else {
        read.textContent = "Not read";
        read.classList.remove('read');
        read.classList.add('not-read');
      }
      read.addEventListener("click", () => {
        if (book.readStatus == true) {
          read.textContent = "Not read";
          read.classList.remove('read');
          read.classList.add('not-read');
          book.readStatus = false;
        } else {
          read.textContent = "Read";
          read.classList.remove('not-read');
          read.classList.add('read');
          book.readStatus = true;
        }
      })
      const remove = document.createElement('button');
      remove.classList.add('remove');
      remove.textContent = 'Remove';
      main.appendChild(bookCard);
      bookCard.appendChild(title);
      bookCard.appendChild(author);
      bookCard.appendChild(pages);
      bookCard.appendChild(read);
      bookCard.appendChild(remove);
      book.displayStatus = true;
      remove.addEventListener("click", () => {
        bookCard.removeChild(title);
        bookCard.removeChild(author);
        bookCard.removeChild(pages);
        bookCard.removeChild(read);
        bookCard.removeChild(remove);
        main.removeChild(bookCard);
        myLibrary.remove(book);
      })
    }
  }
}

bookButton.addEventListener("click", () => {
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
})

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }}

submitBtn.addEventListener("click", addBookToLibrary);
displayBooks();


