const ranked = [
  {userId: 1, elo: 1, type: "ranked"}, 
  {userId: 2, elo: 5, type: "ranked"}, 
  {userId: 3, elo: 2, type: "ranked"}
]

const sortUsers = function(arr, type, time){
  if (time === 30 && type === "RANKED") {
    return arr.sort(function(a, b) {
      return a.ranked30 - b.ranked30
    })
  } else if (time === 10 && type === "RANKED") {
    return arr.sort(function(a, b) {
      return a.ranked10 - b.ranked10
    })
  } else if (time === 30 && type === "CASUAL"){
    return arr.sort(function(a, b) {
      return a.casual - b.casual
    })
  } else if (time === 10 && type === "CASUAL") {
    return arr.sort(function(a, b) {
      return a.casual - b.casual
    })
  } else {
    return arr.sort(function(a, b) {
      return a.casual - b.casual
    })
  }
}



exports.sortUsers = sortUsers;
