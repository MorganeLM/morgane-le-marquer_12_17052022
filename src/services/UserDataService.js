class UserDataService {

    static async getUserInfos(userId){
        const userInfosEndPoint = "http://localhost:3000/user/" + userId;
        try {
            const response = await fetch(userInfosEndPoint);
            const data = await response.json();
            const userInfos = data.data;
    
            return userInfos;
        } catch (error) {
            console.log(error);
        }
    }

    static async getDailyActivity(userId){
        const userInfosEndPoint = "http://localhost:3000/user/" + userId + "/activity";
        //const dailyActivityMockEndPoint = "http://localhost:3001/user18activityMock.json"
        try {
            const response = await fetch(userInfosEndPoint);
            const data = await response.json();
            const rawData = data.data.sessions;
            let dayCount = 1;
            const transformedData = rawData.map((dailyActivity) => {
                return {
                    day: dayCount++,
                    kilogram: dailyActivity.kilogram,
                    calories: dailyActivity.calories,
                };
            });
    
            return transformedData;
        } catch (error) {
            console.log(error);
        }
    }

    static async getKeyData(userId){
        const userInfosEndPoint = "http://localhost:3000/user/" + userId;
        //const dieteticIndicatorEndPoint = "http://localhost:3000/user/:id/key-data"; -> this route doesn't exist!
        //const dieteticIndicatorMockEndPoint = "http://localhost:3001/user18indicatorsMock.json"
        try {
            const response = await fetch(userInfosEndPoint);
            const data = await response.json();
            const rawData = data.data.keyData;
            const transformedData = transformKeyData(rawData);

            return transformedData;
        } catch (error) {
            console.log(error);
        }
    }

    static async getSessionDuration(userId){
        const sessionDurationEndPoint = "http://localhost:3000/user/" + userId + "/average-sessions"; 
        //const sessionDurationMockEndPoint = "http://localhost:3001/user18sessionsMock.json"
        try {
            const response = await fetch(sessionDurationEndPoint);
            const data = await response.json();
            const rawSessionDurationData = data.data.sessions;
            const sessionDurationData = mapDaysOfSessions(rawSessionDurationData);

            return sessionDurationData;
        } catch (error) {
            console.log(error);
        }
    }

    static async getActivityType(userId){
        const activityTypeEndPoint = "http://localhost:3000/user/" + userId + "/performance"; 
        //mock
        try {
            const response = await fetch(activityTypeEndPoint);
            const data = await response.json();
            const rawActivityTypeKind = data.data.kind;
            const rawActivityTypeData = data.data.data;
            const activityTypeData = transformActivityTypeData(rawActivityTypeData, rawActivityTypeKind);

            return activityTypeData;
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserDataService;


//transform keyData
function transformKeyData(data){
    let transformedData = [];
    let id = 0;
    for (let [key, value] of Object.entries(data)) {
      transformedData.push({
        id: id++,
        type: key.replace('Count', 's'),
        value: value,
        unit: findUnitOfKeyData(key)
      })
    }
    return transformedData;
  }

  function findUnitOfKeyData(type){
      switch(type){
        case 'calorieCount': return 'kCal';
        case 'carbohydrateCount': return 'g';
        case 'lipidCount': return 'g';
        case 'proteinCount': return 'g';
        default: return 'g';
      }
  }

  //todo: function findIconOfKeyData(type)


  //transform session duration data
  function mapDaysOfSessions(data){
    return data.map(session => {
      return {
        day: transformDay(session.day),
        sessionLength: session.sessionLength
      }
    })
  }
  
  function transformDay(day){
    switch(day){
      case 1: return 'L';
      case 2: return 'M';
      case 3: return 'M';
      case 4: return 'J';
      case 5: return 'V';
      case 6: return 'S';
      case 7: return 'D';
      default: return ''
    }
  }


  //transform activity type data
  function transformActivityTypeData(data, kinds){
    let activityType = data.map(type => {
      let kind = kinds[type.kind];
      let capitalizedKind = kind[0].toUpperCase() + kind.substring(1);
      return {
        kind: capitalizedKind,
        value: type.value
      }
    })
    return activityType;
  }
