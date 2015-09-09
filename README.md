#WAR!

The card game war, slightly modified.  Using the Deck of Cards API: http://deckofcardsapi.com/

Utilizes Firebase (https://www.firebase.com) for user statistic tracking.

###Requirements:
- Node.js https://nodejs.org/en/
- Installation of http-server via _npm install -g http-server_
- A Github account

###Post Cloning Your Fork Locally:
- Inside the _lib_ directory:
  - Run _npm install_
  - Run _bower install_
- Inside the main repo directory:
 - Run _http-server_
 - Make note of the port number returned after running _http-server_
- Navigate to http://localhost:[your-port-number]

###Usage:
- Authenticate with Github
- Click *New Game* to start a new game of war
- Click *Resume Game* to resume an unfinished game
- Click *Player Stats* to view your all time win/loss record
- In-game, click *DRAW!* to draw a new card for each hand