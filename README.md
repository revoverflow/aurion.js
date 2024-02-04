# Aurion.js

Aurion.js is a JavaScript library for interacting with the Aurion API, a product from Auriga an ERP system for higher education institutions.

This library is using the mobile API of Aurion, which is a REST API instead of the Java Faces used by the web interface. Some features are not available in the mobile API, but it is more stable and faster than the web interface.

## Usage

Here is an example of how to use the library to get the timetable of a user.

```javascript
const { AurionClient } = require('aurion.js');

// Configure the client with the mobile API URL and your tokens
const client = new AurionClient({
    baseUrl: 'https://aurion.example.com/mobile',
    /*
    tokens: { // You can specify the tokens here or use the login method
        normal: 'YOUR_NORMAL_TOKEN', 
        comptage: 'YOUR_COMPTAGE_TOKEN'
    }
    */
});

// Login with your credentials
client.login('john.doe@example.com', 'password')
    .then(async () => {
        // Get the timetable between 2024-01-01 and 2024-01-02
        const timetable = await client.getTimetable(new Date('2024-01-01'), new Date('2024-01-02'));
        console.log(timetable);
    })
```

## Features

- [x] Authentication
- [x] Timetable
- [x] Grades
- [ ] Absences