
const fs = require('fs');
const book =
{
    subject : "Data Structures",
    title : "Data Structures and Algorithms in C ",
    author : "	Michael T. Goodrich et al.",
    edition : 2,
    publisher : "John Wiley & Sons",
    year : 2011
}



const bookJSON = JSON.stringify(book)
fs.writeFileSync('textbook.json', bookJSON);