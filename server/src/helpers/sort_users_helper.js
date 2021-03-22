const sortUsers = function(arr, type, time){
  const matchups = [];
  let sortedArr;
  if (time === 30 && type === "RANKED") {
    sortedArr = arr.sort(function(a, b) {
      return a.currentUser.ranked30 - b.currentUser.ranked30
    })
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
      if (sortedArr[i].currentUser.casual - sortedArr[i - 1].currentUser.casual <= 300){
        matchups.push(sortedArr.slice( i - 1, i + 1))
      }
    }
    return matchups;
  } else if (time === 10 && type === "CASUAL") {
    sortedArr = arr.sort(function(a, b) {
      return a.currentUser.casual - b.currentUser.casual
    })
    for (let i = sortedArr.length - 1; i > 0; i--) {
      if (sortedArr[i].currentUser.casual - sortedArr[i - 1].currentUser.casual <= 300){
        matchups.push(sortedArr.slice( i - 1, i + 1))
      }
    }
    return matchups;
  } else {
    sortedArr = arr.sort(function(a, b) {
      return a.currentUser.casual - b.currentUser.casual
    })
    for (let i = sortedArr.length - 1; i > 0; i--) {
      if (sortedArr[i].currentUser.casual - sortedArr[i - 1].currentUser.casual <= 300){
        matchups.push(sortedArr.slice( i - 1, i + 1))
      }
    }
    return matchups;
  }
}

exports.sortUsers = sortUsers;
