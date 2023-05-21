var books = [];

function addBook() {
    var name = document.getElementById("name").value;
    var author = document.getElementById("author").value;
    var publishDate = document.getElementById("publishDate").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "add_book.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("result").innerHTML = xhr.responseText;
        }
    };
    xhr.send("action=add_book&name=" + name + "&author=" + author + "&publishDate=" + publishDate);
}

function searchBook() {
    var searchName = document.getElementById("searchName").value;
    var xhr = new XMLHttpRequest();
    var url = "add_book.php";
    var params = "action=search_book&searchName=" + searchName;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            var resultHTML = "";
            if (response.status === "success") {
                var books = response.books;
                if (books.length > 0) {
                    resultHTML += "<h3>Book(s) found:</h3>";
                    for (var i = 0; i < books.length; i++) {
                        resultHTML += "<p><strong>Name:</strong> " + books[i].name + "</p>";
                        resultHTML += "<p><strong>Author:</strong> " + books[i].author + "</p>";
                        resultHTML += "<p><strong>Publish Date:</strong> " + books[i].publish_date + "</p>";
                    }
                } else {
                    resultHTML = "<p>Book not found.</p>";
                }
            } else {
                resultHTML = "<p>Error: " + response.message + "</p>";
            }

            document.getElementById("result").innerHTML = resultHTML;
        }
    };

    xhr.send(params);
}

function totalBooks() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "add_book.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("result").innerHTML = "Total number of books in the registry: " + xhr.responseText;
        }
    };
    xhr.send("action=total_books");
}

document.getElementById('logoutButton').addEventListener('click', function () {
    // Send an AJAX request to the logout endpoint
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'logout.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Redirect to the register page after successful logout
            window.location.href = 'index.html';
        }
    };
    xhr.send();
});

$(document).ready(function () {
    // Handle the form submission event
    $('#searchForm').on('submit', function (event) {
        event.preventDefault();
        var searchQuery = $('#searchQuery').val();

        // Clear previous search results
        $('#searchResults').empty();

        // Make the API request
        var apiUrl = 'https://openlibrary.org/search.json?q=' + encodeURIComponent(searchQuery);
        $.getJSON(apiUrl, function (data) {
            // Process the API response
            var docs = data.docs;
            if (docs.length > 0) {
                // Display the search results
                var gridHtml = '<div class="grid">';
                for (var i = 0; i < docs.length; i++) {
                    var book = docs[i];
                    var coverId = book.cover_i;
                    var coverUrl = 'https://covers.openlibrary.org/b/id/' + coverId + '-S.jpg';
                    var openLibraryUrl = 'https://openlibrary.org' + book.key;

                    var publicationYear = book.first_publish_year ? book.first_publish_year : 'Unknown';

                    var cellHtml = '<div class="cell">' +
                        '<a href="' + openLibraryUrl + '" target="_blank">' +
                        '<img src="' + coverUrl + '" alt="Book Cover">' +
                        '<div class="book-info">' +
                        '<h4>' + book.title + '</h4>' +
                        '<p>Author: ' + (book.author_name ? book.author_name.join(', ') : 'Unknown') + '</p>' +
                        '<p>Year: ' + publicationYear + '</p>' +
                        '</div>' +
                        '</a>' +
                        '</div>';
                    gridHtml += cellHtml;
                }
                gridHtml += '</div>';
                $('#searchResults').append(gridHtml);
            } else {
                // No books found
                $('#searchResults').append('<p>No books found.</p>');
            }
        }).fail(function () {
            // Error handling
            $('#searchResults').append('<p>Failed to retrieve search results.</p>');
        });
    });
});

