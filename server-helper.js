/* findRoom function look for the sepcific room and return an array 
@roomId Interger

return [{room, id}]
*/
const findRoom = (roomId) => {
  const room = mockDatabase.find((room) => {
    return room.id === parseInt(roomId);
  });
  if (room === undefined) {
    return { error: `Room id ${roomId} does not exist` };
  }
  return room;
};

/* logUserInSingleRoom function would add user to the current room if it doesn't exist 
@room Array
@username String

return undefined
*/
const logUserInSingleRoom = (room, username) => {
  const userNotLogged = !room.users.find((user) => {
    return user === username;
  });

  if (userNotLogged) {
    room.users.push(username);
  }
};

// mockDatabase
const mockDatabase = [
    {
      name: "Art History Chat",
      id: 0,
      users: ["Kevin", "Nicole", "Thomas"],
      messages: [
        { name: "Kevin", message: "What is the homework due?", id: "gg35545" },
        { name: "Nicole", message: "I am not sure either", id: "yy35578" },
        {
          name: "Thomas",
          message: "I think it is due next Monday",
          id: "hh9843",
        },
      ],
    },
    {
      name: "Weekend Party Chat",
      id: 1,
      users: ["Randall"],
      messages: [
        {
          name: "Randall",
          message: "What do we plan to do for the weekend? Party over my house?",
          id: "ff35278",
        },
      ],
    },
  ];

module.exports = {
  findRoom,
  logUserInSingleRoom,
  mockDatabase
};
