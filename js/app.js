const loadData = () => {
    const search = document.getElementById("search-input");
    const searchText = search.value;

    // clear search field
    search.value = "";
    // loading  data from server by fetching
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const p = document.getElementById('result-number');
            p.innerText = `Total Result Found ${data.numFound}`;
            displayData(data.docs);
        })



}
// display data 
const displayData = (books) => {
    const searchResultContainer = document.getElementById("book-container");
    searchResultContainer.innerHTML = "";

    books.forEach(book => {
        console.log(book);
        console.log(book.author_name);
        console.log("year type ", typeof book.first_publish_year);
        // if author name not found in server
        if (book.author_name === undefined) {
            book.author_name = "";
        }
        // if publish year not found
        if (book.first_publish_year === undefined) {
            book.first_publish_year = "";
        }





        // setting up cover image
        const imageId = book.cover_i;

        const coverUrl = `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`;





        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = ` <div class="card">
         <img src="${coverUrl}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">${book.title.slice(0, 50)}</h5>
            <p class="card-text">${book.author_name.slice(0, 150)}</p>
            <p class="card-text">${book.first_publish_year}</p>
        </div>
        </div>`;
        searchResultContainer.appendChild(div);



    })
}

