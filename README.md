# chessU

!["main page"](https://github.com/tmslee/chessU/blob/main/server/screenshots/main_page.png)

## Multiplayer chess game platform

Try to sign up and play in: https://www.playchessu.com/

- Play chess with other users or ai on 3 different modes
  - ranked: 10 minutes, 30 minutes 
  - casual: 10 minutes, 30 minutes, unlimited
  - vs AI: 
    - 10 minutes, 30 minutes, unlimited
    - easy, normal, hard

!["ranked options"](https://github.com/tmslee/chessU/blob/main/server/screenshots/ranked_options.png)

!["casual options"](https://github.com/tmslee/chessU/blob/main/server/screenshots/casual_options.png)

!["ai options"](https://github.com/tmslee/chessU/blob/main/server/screenshots/ai_options.png)

- chessU will match you up with players around your skill level (elo difference within 300)
- chessU will update your elo at the end of every match for subsequent match making
- play ranked to climb the ladder and rank up the leaderboard
- invite friends in casual or queue up for a random opponent of your skill level
- practice against AI

## Development Stack

- chess.js and chessboardjsx npm packages are being used
- React.js and Node.js for front end
- Express.js and Node.js for back end
- Socket.io for client-to-server communication
- Heroku for server deployment
- Netlify for webside deployment

# Features

## Match Making
- Queuing System
  - chessU makes use of in-memory data structure to store queues of different modes
  - upon players queuing up for a match, chessU will push the player into the appropraite queue and when another player of the appropriate elo appears in the queue they will be matched up.

!["searching for opponent"](https://github.com/tmslee/chessU/blob/main/server/screenshots/searching.png)

- Match confirm
  - when a match is made between two players, chessU will prompt a confirmation for both of the players involved.
  - only when both players accept the match before the count down running out the players will be loaded into the game
  - other wise players will return to the game option selection form
  - the timer starts with 15 seconds initially

!["match accept"](https://github.com/tmslee/chessU/blob/main/server/screenshots/accept.png)

## Invitation
- invitation feature is only available for casual mode
- players can enter a username and send an invite to a friend
- invitation can only be sent to users that are registered as friends on the platform
- when a proper username is entered, the sender will wait for the opponent to accept, similar to match confirm

!["sending invite"](https://github.com/tmslee/chessU/blob/main/server/screenshots/invite_send.png)

- if the friend is currently in queue or in the middle of accepting a match the invitation will not be sent and the following will display for the sender

!["invite failed"](https://github.com/tmslee/chessU/blob/main/server/screenshots/invite_failed.png)

- the invitation recipient will be prompted to accept or decline the invitation as a pop up toast at the bottom right corner of their page

!["invite toast"](https://github.com/tmslee/chessU/blob/main/server/screenshots/invite_toast.png)

- accepting the invitation will redirect both users to the game

## vs AI
- our AI game can be started immediately once the game form (time limit selection and difficulty selection) is completed
- the user will be redirected to a game, and can proceed to play as they would.

## Game

!["game page"](https://github.com/tmslee/chessU/blob/main/server/screenshots/game_page.png)

- Timer
  - on the top side of the game board there are timers that count down as the match begins.
  - each player starts off with the allocated time set when loading up the game
  - when one of the timers runs out, the player with time left will automatically win
- Player information
  - on the left side of the game page players can see both player's information as follows
- Resignation
  - inside the player information block there is a resignation button that both players can click at any time to resign
  - the game will conclude when a player confirms the resign

!["confirm resign"](https://github.com/tmslee/chessU/blob/main/server/screenshots/confirm_resign.png)

- Action log
  - on the right side of the board is an action log that keeps track of every mode made by both players
- In-game chat
  - on the bottom right side of the window there is a chat toggle that can be used for a in-game live chat.
  - each players can send any message to each other by either clicking send or pressing enter with text content in the input field

!["chat"](https://github.com/tmslee/chessU/blob/main/server/screenshots/chat.png)

- Board
  - the main board is displayed at the center of the window
  - the appropraite set of pieces will be placed at the bottom side of the row depending on the player's color
  - every move made by a player will be reflected on the opponent's side of the board 
- Game Over
  - once a match is concluded, a prompt will appear displaying your elo change post-match and a button that lets you return to the home menu

!["game over"](https://github.com/tmslee/chessU/blob/main/server/screenshots/game_over.png)

## Profile
- User Information
 - the user information displays the username, their rank icon, as well as the profile picture

!["user info"](https://github.com/tmslee/chessU/blob/main/server/screenshots/profile.png)

 - users can edit and save their information by pressing the edit button as follows:

!["edit profile"](https://github.com/tmslee/chessU/blob/main/server/screenshots/profile_edit.png)

 - users can also edit their profile pictures by clicing on the camera icon on the bottom right corner of their photo

!["edit profile pic"](https://github.com/tmslee/chessU/blob/main/server/screenshots/edit_profile_pic.png)

- User statistics
  - stats tab displays user statistics
  - wins and losses, elos for different game modes, as well as total matches

!["stats"](https://github.com/tmslee/chessU/blob/main/server/screenshots/stats.png)

- Match History
  - history tab displays the user's match history, most recent to the oldest
  - each item displays the user, the opponent, their profile picture, their rank icon, and their elo
  - each item can be green or red depending on the outcome of the match (green for victory and red for defeat)

!["history"](https://github.com/tmslee/chessU/blob/main/server/screenshots/history.png)

## Leaderboard
- there are 2 leaderboards for each of the ranked game modes (10 minutes and 30 minutes)
- each of these boards will display the rankings from highest elo to lowest elo
- each user item displays their profile picture, rank icon, username, and elo
- if logged in as a user, each user will have buttons that serve community functions (add/delete friend, accept/decline friend request)
- leaderboards can still be viewed if not logged in

!["leaderboard"](https://github.com/tmslee/chessU/blob/main/server/screenshots/leaderboards.png)

## Community
- Friends
  - friends tab displays a list of your friends on the platform with a button for removing friend

!["friends"](https://github.com/tmslee/chessU/blob/main/server/screenshots/friends.png)

- Requests
  - requests tab displays a list of pending friend requests you have not responded to with buttons for accepting/declining

!["requests"](https://github.com/tmslee/chessU/blob/main/server/screenshots/requests.png)

- Search
  - search tab allows users to search for any user registered on the platform
  - the search result will show any user that includes the serach term (case insensitive)

!["search"](https://github.com/tmslee/chessU/blob/main/server/screenshots/search.png)

# Elo rating

elo rating method: https://metinmediamath.wordpress.com/2013/11/27/how-to-calculate-the-elo-rating-including-example/

- Bronze: Between 0 and 1149
- Silver: Between 1150 and 1499
- Majority of Active Player Base
- Gold: Between 1500 and 1849
- Platinum: Between 1850 and 2199
- Diamond: 2200 and 2500
- Master: 2501

## Icons

Game Icon (designed by Thomas Lee)
!["icon"](https://github.com/tmslee/chessU/blob/main/server/screenshots/chessU.png)
