const users = [ {
  id: 1,
  name: 'Andrew',
  schoolId: 101
},
{
  id: 2,
  name: 'Jessica',
  schoolId: 99
}];

const grades = [ {
  id: 1,
  schoolId: 101,
  grade: 86
},{
  id: 2,
  schoolId: 99,
  grade: 100
},{
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) =>{
  return new Promise((resolve, reject) => {
    const user = users.find( (user) => user.id === id);

    if(user){
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}.`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });

};
const getStatus = (userId) =>{
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if (grades.length > 0){
      average = grades.map( (grade) => grade.grade).reduce((a, b) =>  a + b) / grades.length;
    }
    return  `${user.name} has a ${average}% in the class`;
  });
};

// async await
const getStatusAlt = async (userId) =>{
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);

  let average = 0;

  if (grades.length > 0){
    average = grades.map( (grade) => grade.grade).reduce((a, b) =>  a + b) / grades.length;
  }
  return  `${user.name} has a ${average}% in the class`;

  // console.log(user, grades);

  // throw new Error('This is an error');
  // return 'Mike';
};

getStatusAlt(1).then( (status)=>{
  console.log(status);
}).catch((err) => {console.log(err)});
//  Andrew has a 83% in the class
//getStatus(22).then((status) => {console.log(status)});

//console.log(getStatusAlt());


//getGrades(9991).then((grades) => {console.log(grades)});

// getUser(2).then( (user)=>{
//   console.log(user);
//
// }).catch((err) => {
//   console.log(err)
// });
