const test = [ { timeLimit: 30,
  type: 'RANKED',
  currentUser:
   { id: 2,
     username: 'thomas',
     email: 'thomas@gmail.com',
     password: 'password',
     profile_img: null,
     ranked30: 900,
     ranked10: 1200,
     casual: 1800,
     created_at: '2021-03-19T01:27:54.389Z' },
  socketId: '63VvSpZgQaqfptKfAAAb' },
{ timeLimit: 30,
  type: 'RANKED',
  currentUser:
   { id: 4,
     username: 'user4',
     email: 'user4@gmail.com',
     password: 'password',
     profile_img: null,
     ranked30: 1500,
     ranked10: 1600,
     casual: 1700,
     created_at: '2021-03-19T01:27:54.392Z' },
  socketId: 'KJY0D3CGbVVOCPSxAAAf' },
{ timeLimit: 30,
  type: 'RANKED',
  currentUser:
   { id: 1,
     username: 'alvin',
     email: 'alvin@gmail.com',
     password: 'password',
     profile_img: null,
     ranked30: 1800,
     ranked10: 1200,
     casual: 1700,
     created_at: '2021-03-19T01:27:54.385Z' },
  socketId: 'ZoqksQHTCOtm7tgKAAAZ' } ]


const sortUsers = function(arr, type, time){
  const matchups = [];
  let sortedArr;
  if (time === 30 && type === "RANKED") {
    sortedArr = arr.sort(function(a, b) {
      return a.currentUser.ranked30 - b.currentUser.ranked30
    })
    // console.log(sortedArr, "SORTED");
    for (let i = sortedArr.length - 1; i > 0; i--) {
      if (sortedArr[i].currentUser.ranked30 - sortedArr[i - 1].currentUser.ranked30 <= 300){
        matchups.push(sortedArr.slice( i - 1, i + 1))
      }
    }
    return matchups;
  } else if (time === 10 && type === "RANKED") {
    sortedArr = arr.sort(function(a, b) {
      return a.currentUser.ranked10 - b.currentUser.ranked10
    })
    for (let i = sortedArr.length - 1; i > 0; i--) {
      if (sortedArr[i].currentUser.ranked10 - sortedArr[i - 1].currentUser.ranked10 <= 300){
        matchups.push(sortedArr.slice( i - 1, i + 1))
      }
    }
    return matchups;
  } else if (time === 30 && type === "CASUAL"){
    sortedArr = arr.sort(function(a, b) {
      return a.currentUser.casual - b.currentUser.casual
    })
    for (let i = sortedArr.length - 1; i > 0; i--) {
      if (sortedArr[i].currentUser.casual - sortedArr[i - 1].currentUser.casual <= 100){
        matchups.push(sortedArr.slice( i - 1, i + 1))
      }
    }
    return matchups;
  } else if (time === 10 && type === "CASUAL") {
    sortedArr = arr.sort(function(a, b) {
      return a.currentUser.casual - b.currentUser.casual
    })
    for (let i = sortedArr.length - 1; i > 0; i--) {
      if (sortedArr[i].currentUser.casual - sortedArr[i - 1].currentUser.casual <= 100){
        matchups.push(sortedArr.slice( i - 1, i + 1))
      }
    }
    return matchups;
  } else {
    sortedArr = arr.sort(function(a, b) {
      return a.currentUser.casual - b.currentUser.casual
    })
    for (let i = sortedArr.length - 1; i > 0; i--) {
      if (sortedArr[i].currentUser.casual - sortedArr[i - 1].currentUser.casual <= 100){
        matchups.push(sortedArr.slice( i - 1, i + 1))
      }
    }
    return matchups;
  }
}

// console.log(sortUsers(test, "RANKED", 30));






exports.sortUsers = sortUsers;
