# chessU

## Multiplayer chess game platform

Try to sign up and play in: https://www.playchessu.com/

- chess.js and chessboardjsx npm packages are being used
- The connection between react client side and express server side is using socket.io.
- Netlify is used for webside deployment.

## Play mode

- rank mode: 10mins, 30mins
- casual mode: 10mins, 30mins, unlimited
- AI mode: 10mins, 30mins, unlimited

* You can only match up with player whose elo difference is within 300.

## Elo rating

elo rating method: https://metinmediamath.wordpress.com/2013/11/27/how-to-calculate-the-elo-rating-including-example/

- Bronze: Between 0 and 1149 (Team: 0-1249) (Top 100%)
- Silver: Between 1150 and 1499 (Team: 1250-1449) (Top 68%-13%)
- Majority of Active Player Base
- Gold: Between 1500 and 1849 (Team: 1450-1649) (Top 13%-1.5%)
- Platinum: Between 1850 and 2199 (Team: 1650-1849) (Top 1.5%-0.1%)
- Diamond: 2200 and above (Team: 1850+) (Top 0.1%)

## Icon

icon
!["icon"](https://github.com/tmslee/chessU/blob/feature/readme/server/screenshots/chessU.png)


## Sreenshots

