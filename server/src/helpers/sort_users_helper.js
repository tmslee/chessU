const ranked = [
  {userId: 1, elo: 1, type: "ranked"}, 
  {userId: 2, elo: 5, type: "ranked"}, 
  {userId: 3, elo: 2, type: "ranked"}
]

const sortUsers = function(arr){
  return arr.sort(function(a, b) {
    return a.elo - b.elo
  })
}

console.log(sortUsers(ranked));

// const ranked = [{ 
//   userId,  
//   elo,
//   type,
//   socketId  
// }]

exports.sortUsers = sortUsers;
