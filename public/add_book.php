<?php

$servername = "localhost";
$username = "root";
$password = "3562";
$dbname = "book_registry";

// Establish the database connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted for adding a new book
if (isset($_POST['action']) && $_POST['action'] === 'add_book') {
    // Retrieve book details from the form
    $name = $_POST["name"];
    $author = $_POST["author"];
    $publishDate = $_POST["publishDate"];

    // Insert the book details into the database
    $formattedDate = date('Y-m-d', strtotime($publishDate));
    $sql = "INSERT INTO books (name, author, publish_date) VALUES ('$name', '$author', '$formattedDate')";

    if ($conn->query($sql) === TRUE) {
        $response = array("status" => "success", "message" => "Book added successfully.");
    } else {
        $response = array("status" => "error", "message" => "Error: " . $sql . "<br>" . $conn->error);
    }
    
    echo json_encode($response);
} 
// Check if the form is submitted for searching a book
elseif (isset($_POST['action']) && $_POST['action'] === 'search_book') {
    $searchName = $_POST["searchName"];

    // Query the database to search for the book
    $sql = "SELECT * FROM books WHERE name = '$searchName'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $books = array();

        while ($row = $result->fetch_assoc()) {
            $book = array(
                "name" => $row["name"],
                "author" => $row["author"],
                "publish_date" => $row["publish_date"]
            );
            $books[] = $book;
        }

        $response = array("status" => "success", "books" => $books);
    } else {
        $response = array("status" => "error", "message" => "Book not found.");
    }
    
    echo json_encode($response);
} 
// Check if the action is for retrieving total books count
elseif (isset($_POST['action']) && $_POST['action'] === 'total_books') {
    // Query the database to retrieve the total count of books
    $sql = "SELECT COUNT(*) AS total_count FROM books";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $count = $row['total_count'];
    
    // Query the database to retrieve all books
    $sql = "SELECT * FROM books";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        echo "<h3>Total number of books in the registry: " . $count . "</h3>";
        
        while ($row = $result->fetch_assoc()) {
            echo "<p><strong>Name:</strong> " . $row["name"] . "</p>";
            echo "<p><strong>Author:</strong> " . $row["author"] . "</p>";
            echo "<p><strong>Publish Date:</strong> " . $row["publish_date"] . "</p>";
            echo "<hr>";
        }
    } else {
        echo "<p>No books found.</p>";
    }
}

$conn->close();

?>
