import inquirer from 'inquirer';
// starting chatbot
console.log("This is an AI based Chatbot. Say 'hello', or 'hey shahzaib' to start.");
// Define the chatbot responses based on user inputs
const getResponse = async (input) => {
    // Convert input to lowercase for case-insensitive matching
    const normalizedInput = input.toLowerCase();
    if (normalizedInput.includes('hello') || normalizedInput.includes('hey shahzaib') || normalizedInput.includes('hi')) {
        return 'Hello! How can I help you today?';
    }
    else if (normalizedInput.includes('how are you')) {
        return 'I am just a bot, but I am doing great! How about you?';
    }
    else if (normalizedInput.includes('help')) {
        return 'Sure, I am here to help. What do you need assistance with?';
    }
    else if (normalizedInput.includes('weather')) {
        return 'Sure, Today in Karachi, the weather is warm and humid with passing clouds. The current temperature is around 88°F (31°C), but it feels like 98°F (37°C) due to the high humidity of 66%. The wind is blowing from the west at about 7 mph.';
    }
    else if (normalizedInput.includes('bye') || normalizedInput.includes('exit')) {
        return 'Goodbye! Have a great day!';
    }
    else if (normalizedInput.includes('my name is')) {
        const name = normalizedInput.split('my name is ')[1];
        return `Nice to meet you, ${name}! How can I assist you today?`;
    }
    else if (normalizedInput.includes('what is your name') || normalizedInput.includes('who you are')) {
        return "I am just a bot, and i don't have name but you can call me Shahzaib. And I Am here to assist you! What is your Name? ";
    }
    else if (normalizedInput.includes('joke')) {
        return "Why don't eggs tell jokes? They'd crack each other up!";
    }
    else if (normalizedInput.includes('blockchain')) {
        return "A blockchain is a decentralized digital ledger that records transactions across many computers in a way that the registered transactions cannot be altered retroactively.";
    }
    else if (normalizedInput.includes('c++ developer')) {
        return "Sure, Developers are Specializes in programming with C++, focusing on system/software development, game development., and performance-critical applications";
    }
    else if (normalizedInput.includes('html developer')) {
        return "Sure, Developers are Focuses on creating and structuring web content using HTML, ensuring proper layout and functionality of web pages.";
    }
    else if (normalizedInput.includes('python developer')) {
        return "Sure, Developers Writes code in Python, often working on data analysis, web applications, automation scripts, and artificial intelligence projects.";
    }
    else if (normalizedInput.includes('front-end')) {
        return 'Front-End Developers Develops the user interface and experience of websites and applications using HTML, CSS, and JavaScript, ensuring they are visually appealing and functional.';
    }
    else if (normalizedInput.includes('back-end')) {
        return 'Back-End Developers Manages server-side logic, databases, and application functionality, typically working with languages like Python, Java, Ruby, and frameworks like Node.js and Django.';
    }
    else if (normalizedInput.includes('motivate')) {
        return 'The only way to do great work is to love what you do. - Steve Jobs\n Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill';
    }
    else if (normalizedInput.includes('calculate')) {
        console.log('Sure, please Select Numbers!');
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'operation',
                message: 'Which operation would you like to perform?',
                choices: ['add', 'subtract', 'multiply', 'divide']
            },
            {
                type: 'input',
                name: 'num1',
                message: 'Enter the first number:'
            },
            {
                type: 'input',
                name: 'num2',
                message: 'Enter the second number:'
            }
        ]);
        const operation = answers['operation'];
        const num1 = parseFloat(answers['num1']);
        const num2 = parseFloat(answers['num2']);
        if (isNaN(num1) || isNaN(num2)) {
            return 'Please enter valid numbers for the calculation.';
        }
        let result;
        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                if (num2 === 0) {
                    return 'Division by zero is not allowed.';
                }
                result = num1 / num2;
                break;
            default:
                return 'Invalid operation.';
        }
        return `The result of ${operation}ing ${num1} and ${num2} is ${result}.`;
    }
    else if (normalizedInput.includes('bmi')) {
        console.log('Sure, please Enter your Weight and Height!');
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'weight',
                message: 'Enter your weight in kilograms:'
            },
            {
                type: 'input',
                name: 'height',
                message: 'Enter your height in meters:'
            }
        ]);
        const weight = parseFloat(answers['weight']);
        const height = parseFloat(answers['height']);
        if (isNaN(weight) || isNaN(height) || height <= 0) {
            return 'Please enter valid numbers for weight and height.';
        }
        const bmi = weight / (height * height);
        let classification = '';
        if (bmi < 18.5) {
            classification = 'Underweight';
        }
        else if (bmi >= 18.5 && bmi < 24.9) {
            classification = 'Normal weight';
        }
        else if (bmi >= 25 && bmi < 29.9) {
            classification = 'Overweight';
        }
        else {
            classification = 'Obese';
        }
        return `Your BMI is ${bmi.toFixed(2)} (Which is ${classification}).`;
    }
    else if (normalizedInput.includes('health tips')) {
        return 'Remember to drink plenty of water, get enough sleep, and exercise regularly!';
    }
    else if (normalizedInput.includes('stress relief')) {
        return 'Try deep breathing exercises, meditation, or a short walk to relieve stress.';
    }
    else if (normalizedInput.includes('recommend a movie')) {
        return 'I recommend watching "Iron Man 1,2,3" if you enjoy mind-bending thrillers.';
    }
    else if (normalizedInput.includes('suggest a book')) {
        return 'You might enjoy reading "Shikwa and Jawab-e-Shikwa" by Mohammad Iqbal.';
    }
    else if (normalizedInput.includes('define ai')) {
        return "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn.";
    }
    else if (normalizedInput.includes('what time is it')) {
        return `The current Time is ${new Date().toLocaleTimeString()}`;
    }
    else if (normalizedInput.includes('date')) {
        return `The current Date is ${new Date().toLocaleDateString()}`;
    }
    else if (normalizedInput.includes('thank you')) {
        return 'My Pleasure!';
    }
    else {
        return 'Sorry, I did not understand that. Can you please rephrase?';
    }
};
// Function to prompt the user for input and provide responses
const chat = async (iterations) => {
    for (let i = 0; i < iterations; i++) {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'userInput',
                message: 'You:'
            }
        ]);
        const userInput = answers['userInput'];
        // Exit if the user says goodbye
        if (userInput.toLowerCase().includes('bye')) {
            console.log('Shahzaib: Goodbye! Have a great day!');
            break;
        }
        const response = await getResponse(userInput);
        console.log(`Shahzaib: ${response}`);
    }
};
// Start the chatbot with a predefined number of iterations
chat(100);
