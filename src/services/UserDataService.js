const getDailyActivityMethode = async (userId) => {
    const userInfosEndPoint = "http://localhost:3000/user/" + userId + "/activity";

    fetch(userInfosEndPoint).then(response => {
        return response.json();
        }).then(data => {
        return data.data.sessions;
        }).catch(err => {
            console.log(err);
        });
}

// const UserDataService = {
//     getUserInfos: function(userId) {
//         //inspect the value
//     },

//     getDailyActivity: await getDailyActivityMethode()


   
// };

const UserDataService = {
    getUserInfos: function(userId) {
        //inspect the value
    },

    getDailyActivity: function(userId){
        const userInfosEndPoint = "http://localhost:3000/user/" + userId + "/activity";

        fetch(userInfosEndPoint).then(response => {
            return response.json();
            }).then(data => {
            return data.data.sessions;
            }).catch(err => {
                console.log(err);
            });
    }


   
};

export default UserDataService;