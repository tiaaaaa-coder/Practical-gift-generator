# Practical Gift Generator - Architecture

## 1. The Practical Gift Generator is a web-based application that helps users find suitable gift ideas based on their preferences such as budget and category. It is designed for students and general users who need quick and practical gift suggestions.
## 2. The system follows a simple client-side architecture. It is built using HTML, CSS, and JavaScript.

- HTML is used for structure
- CSS is used for styling
- JavaScript is used for logic and gift generation

There is no backend; all processing happens in the browser.
## 3.Goals:
- Easy to use interface
- Fast response time
- Simple and clean design

Constraints:
- No backend server
- Limited development time
- Runs entirely in the browser
## 4. The system consists of three main components:

1. User Interface (HTML)
2. Styling (CSS)
3. Logic Layer (JavaScript)

The JavaScript handles user input, processes gift data, and displays results.
## 5. 1. User selects preferences (budget/category)
2. User clicks "Generate Gift"
3. JavaScript processes input
4. A suitable gift is selected
5. Result is displayed on screen
## 6. Project structure:

/project
  ├── index.html
  ├── css/
  │     └── style.css
  ├── js/
  │     └── giftDatabase.js
  ├── script.js
## 7. The system is hosted on GitHub Pages and accessed through a web browser such as Chrome or Safari.

Users interact with the system through the internet.
## 8. Scenario 1:
User selects a low budget and clicks generate → system shows an affordable gift.

Scenario 2:
User selects a category → system filters gifts and displays a relevant suggestion.
## 9. The application is lightweight and loads quickly since it does not rely on external servers or databases.
## 10. - Usability: Simple interface for easy interaction
- Reliability: Works consistently in modern browsers
- Maintainability: Code is organized into separate files
