const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        const fullName = "Pranav Duggal"; 
        const dob = "08112004"; 
        const email = "pranavduggal2004@gmail.com"; 
        const rollNumber = "22BCE2072"; 

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;

        data.forEach(item => {
            if (!isNaN(item)) {
                const number = parseInt(item, 10);
                sum += number; 
                if (number % 2 === 0) {
                    even_numbers.push(item.toString()); 
                } else {
                    odd_numbers.push(item.toString()); 
                }
            }
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase()); 
            }
            else {
                special_characters.push(item);
            }
        });

        let allAlphabets = alphabets.join(''); 
        let reversedAlphabets = allAlphabets.split('').reverse().join(''); 
        let concat_string = '';
        for (let i = 0; i < reversedAlphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversedAlphabets[i].toUpperCase();
            } else {
                concat_string += reversedAlphabets[i].toLowerCase();
            }
        }

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

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            "is_success": false,
            "error": error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
