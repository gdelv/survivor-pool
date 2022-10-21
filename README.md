SURVIVE

- [x] Render picks in table
- [x] Conditional cell color
- [x] Webscrape NFL Schedule by Week #
- [x] Read NFL Schedule from Firebase
- [x] Look up week # by date
- [x] Show eliminated teams
- [x] Show team records (Get NFL standings - after running node)
- [x] Show firebase entries
- [x] Refactor code
- [x] Add to NFL standings webscraper (Get isCorrect dynamically - after running node)
    - Get Previous week results and post to Week-#-Result
    - Query Previous week results && Previous week entries
        - Loop entries 
            - IF !isEliminated 
                - Check picks arr last element
                    - IF isCorrect = null
                        - Check TeamChosen
                        - Update isCorrect true/false
- [x] Inside Datatable if no element renders (Post new entries)
    - [x] Display action that renders Pick Your Team Modal
- [x] Render Modal
    - [x] Post pick to Firebase
- [ ] Convert Week Mapping into a Firebase collection - (Optional)
    - Query it inside App.js
- [ ] Fix weekly game shown bug