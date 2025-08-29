// main.js

// Import the express library, which is a popular framework for building web applications in Node.js
const express = require('express');
// Import the body-parser library, which helps in parsing incoming request bodies
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();
// Define the port number the server will listen on. It will use the environment's port or 3000 if not available.
const port = process.env.PORT || 3000;

// Use bodyParser middleware to parse JSON formatted request bodies
app.use(bodyParser.json());

// Define a POST route at the '/bfhl' endpoint
app.post('/bfhl', (req, res) => {
    try {
        // Get the 'data' array from the request body
        const data = req.body.data;

        // --- User Information (Replace with your actual details) ---
        const fullName = "Pranav Duggal"; // <-- IMPORTANT: Replace with your full name
        const dob = "08112004"; // <-- IMPORTANT: Replace with your date of birth
        const email = "pranavduggal2004@gmail.com"; // <-- IMPORTANT: Replace with your email
        const rollNumber = "22BCE2072"; // <-- IMPORTANT: Replace with your roll number

        // --- Logic to process the data array ---

        // Initialize arrays to hold different types of data
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;

        // Loop through each item in the input 'data' array
        data.forEach(item => {
            // Check if the item is a number (by trying to convert it)
            if (!isNaN(item)) {
                const number = parseInt(item, 10);
                sum += number; // Add to the total sum
                if (number % 2 === 0) {
                    even_numbers.push(item.toString()); // Add to even numbers array as a string
                } else {
                    odd_numbers.push(item.toString()); // Add to odd numbers array as a string
                }
            }
            // Check if the item is an alphabet (and only a single character or a word)
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase()); // Convert to uppercase and add to alphabets array
            }
            // If it's not a number or an alphabet, it's a special character
            else {
                special_characters.push(item);
            }
        });

        // --- Logic for the concatenated and reversed alternating caps string ---
        let allAlphabets = alphabets.join(''); // Join all alphabet strings into one
        let reversedAlphabets = allAlphabets.split('').reverse().join(''); // Reverse the combined string
        let concat_string = '';
        for (let i = 0; i < reversedAlphabets.length; i++) {
            // Alternate between uppercase and lowercase
            if (i % 2 === 0) {
                concat_string += reversedAlphabets[i].toUpperCase();
            } else {
                concat_string += reversedAlphabets[i].toLowerCase();
            }
        }

        // --- Construct the final response object ---
        const response = {
            "is_success": true,
            "user_id": `${fullName.toLowerCase().replace(/ /g, '_')}_${dob}`,
            "email": email,
            "roll_number": rollNumber,
            "odd_numbers": odd_numbers,
            "even_numbers": even_numbers,
            "alphabets": alphabets,
            "special_characters": special_characters,
            "sum": sum.toString(),
            "concat_string": concat_string
        };

        // Send the successful response with a 200 status code
        res.status(200).json(response);

    } catch (error) {
        // If any error occurs, send a response with a 500 status code
        res.status(500).json({
            "is_success": false,
            "error": error.message
        });
    }
});

// Start the server and make it listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
