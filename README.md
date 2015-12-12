#WAR!

The card game war, made single-player.  Using the Deck of [Cards API](http://deckofcardsapi.com/)

Utilizes [Firebase](https://www.firebase.com) for user statistic tracking & authentication.

###Requirements:
- [Node.js](https://nodejs.org/en/)
- Installation of http-server via _npm install -g http-server_
- A Github, Facebook, Twitter or Google account

###Post Cloning Your Fork Locally:
- Inside the main repo directory:
 - Run _http-server_
 - Make note of the port number returned after running _http-server_
- In a web browser, navigate to http://localhost:[your-port-number]

###Usage:
- Authenticate with Github
- Click *New Game* to start a new game of war
- Click *Resume Game* to resume an unfinished game
- Click *Player Stats* to view your all time win/loss record
- In-game, click *DRAW!* to draw a new card for each hand

####To use the uncompiled development scripts:
- Uncomment lines 4 & 68 in _index.html_
- Comment out lines 5, 69 & 70 in _index.html_
- Inside the _lib_ directory:
 - Run _npm install_
 - Run _bower install_