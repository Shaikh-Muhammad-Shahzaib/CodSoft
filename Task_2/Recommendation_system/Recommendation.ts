import inquirer from 'inquirer';

// Sample databases for movies, books, and products
const movies = [
    { title: "Inception", genre: "Sci-Fi" },
    { title: "The Dark Knight", genre: "Action" },
    { title: "Interstellar", genre: "Sci-Fi" },
    { title: "The Prestige", genre: "Drama" },
    { title: "Gladiator", genre: "Action" },
    { title: "Memento", genre: "Thriller" },     
    { title: "The Matrix", genre: "Sci-Fi" },
    { title: "Fight Club", genre: "Drama" },
    { title: "Pulp Fiction", genre: "Crime" },
    { title: "Raiders of the Lost Ark", genre: "Adventure" },
    { title: "Jurassic Park", genre: "Adventure" },      
    { title: "The Lord of the Rings Trilogy", genre: "Adventure" },
    { title: "Pirates of the Caribbean series", genre: "Adventure" },
    { title: "Indiana Jones and the Last Crusade", genre: "Adventure" },
    { title: "The Goonies", genre: "Adventure" },
    { title: "Avatar", genre: "Adventure" },
    { title: "The Mummy", genre: "Adventure" },
    { title: "The Chronicles of Narnia series", genre: "Adventure" },
    { title: "Die Hard", genre: "Action" },
    { title: "Mad Max: Fury Road", genre: "Action" },
    { title: "Terminator 2: Judgment Day", genre: "Action" },
    { title: "John Wick", genre: "Action" },
    { title: "Lethal Weapon", genre: "Action" },
    { title: "Speed", genre: "Action" },
    { title: "Casino Royale", genre: "Action" },
    { title: "Mission: Impossible – Fallout", genre: "Action" },
    { title: "Avengers: Endgame", genre: "Action" },
    { title: "Skyfall", genre: "Action" },
    { title: "Predator", genre: "Action" },
    { title: "The Silence of the Lambs", genre: "Thriller" },
    { title: "Se7en", genre: "Thriller" },
    { title: "Psycho", genre: "Thriller" },
    { title: "Shutter Island", genre: "Thriller" },
    { title: "The Girl with the Dragon Tattoo", genre: "Thriller" },
    { title: "The Sixth Sense", genre: "Thriller" },
    { title: "Gone Girl", genre: "Thriller" },
    { title: "Rear Window", genre: "Thriller" },

];

const books = [
    { title: "Dune", genre: "Sci-Fi" },
    { title: "1984", genre: "Dystopian" },
    { title: "The Catcher in the Rye", genre: "Fiction" },
    { title: "To Kill a Mockingbird", genre: "Fiction" },
    { title: "The Great Gatsby", genre: "Classic" },
    { title: "Brave New World", genre: "Dystopian" },
    { title: "Moby Dick", genre: "Classic" },
    { title: "The Making of the English Working Class", genre: "Historical" },
    { title: "A Study of History", genre: "Historical" },
    { title: "The Guns of August", genre: "Historical" },
    { title: "Plagues and Peoples", genre: "Historical" },
    { title: "The Origins of The Second World War", genre: "Historical" },
    { title: "Religion and the Decline of Magic", genre: "Historical" },
    { title: "Hamlet", genre: "Classic" },
    { title: "Pride and Prejudice", genre: "Classic" },
    { title: "Jane Eyre", genre: "Classic" },
    { title: "Great Expectations", genre: "Classic" },
    { title: "Of Mice and Men", genre: "Classic" },
    { title: "To Kill A Mockingbird ", genre: "Classic" },
];

const products = [
    { name: "Smartphone", category: "Electronics" },
    { name: "Laptop", category: "Electronics" },
    { name: "Coffee Maker", category: "Kitchen" },
    { name: "Blender", category: "Kitchen" },
    { name: "Sneakers", category: "Footwear" },
    { name: "Sandals", category: "Footwear" },
    { name: "Watch", category: "Accessories" },
    { name: "Sunglasses", category: "Accessories" }
];

// Function to recommend items based on category preference
function recommendItems(type: string, category: string): string[] {
    switch (type) {
        case 'Movies':
            return movies.filter(movie => movie.genre === category).map(movie => movie.title);
        case 'Books':
            return books.filter(book => book.genre === category).map(book => book.title);
        case 'Products':
            return products.filter(product => product.category === category).map(product => product.name);
        default:
            return [];
    }
}

// Prompt user for their preferences
async function askUserPreferences() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'What type of recommendations would you like?',
            choices: ['Movies', 'Books', 'Products']
        },
        {
            type: 'list',
            name: 'category',
            message: 'What category do you prefer?',
            choices: (answers: any) => {
                switch (answers.type) {
                    case 'Movies':
                        return ['Sci-Fi','Adventure', 'Action', 'Drama', 'Thriller', 'Crime', 'Other'];
                    case 'Books':
                        return ['Sci-Fi', 'Dystopian', 'Fiction', 'Classic', 'Historical', 'Other'];
                    case 'Products':
                        return ['Electronics', 'Kitchen', 'Footwear', 'Accessories', 'Other'];
                    default:
                        return [];
                }
            }
        }
    ]);

    const recommendedItems = recommendItems(answers.type, answers.category);

    if (recommendedItems.length > 0) {
        console.log(`We recommend the following ${answers.type.toLowerCase()} in the ${answers.category} category:`);
        recommendedItems.forEach(item => console.log(`- ${item}`));
    } else {
        console.log(`Sorry, we have no recommendations for ${answers.type.toLowerCase()} in the ${answers.category} category.`);
    }
}

// Start the recommendation system
askUserPreferences();
