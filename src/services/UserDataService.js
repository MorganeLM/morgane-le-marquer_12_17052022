import calorie from '../assets/dietetics-icons/calories-icon.png';
import carbohydrate from '../assets/dietetics-icons/carbs-icon.png';
import lipid from '../assets/dietetics-icons/fat-icon.png';
import protein from '../assets/dietetics-icons/protein-icon.png';

class UserDataService {
  /**
 * Get user general informations
 * @param {Number} userId
 * @returns {Object} userInfos
 */
  static async getUserInfos(userId){
    const userInfosEndPoint = process.env.REACT_APP_ENV === 'prod' ? "http://localhost:3000/user/" + userId
                              : process.env.REACT_APP_ENV === 'dev' ? 'http://localhost:3001/user_info_mock.json' : '';

    try {
        const response = await fetch(userInfosEndPoint);
        const data = await response.json();
        const userInfos = data.data;

        return userInfos;  //todo? split into two calls one for name and one for score ? and keyData ?
    } catch (error) {
        console.log(error);
    }
  }

  /**
   * Get formatted data to build daily activity graph
   * @param {Number} userId
   * @returns {Array} - Array of objects ({day: Number, kilogram: Number, calories: Number})
   */
  static async getDailyActivity(userId){
    const userInfosEndPoint = process.env.REACT_APP_ENV === 'prod' ? "http://localhost:3000/user/" + userId + "/activity"
                            : process.env.REACT_APP_ENV === 'dev' ? 'http://localhost:3001/user_activity_mock.json' : '';

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
            }
        });

        return transformedData;
    } catch (error) {
        console.log(error);
    }
  }

  /**
   * Get key data to build dietetics indicator cards
   * @param {Number} userId
   * @returns {Array} - Array of objects ({id: Number, type: String, value: Number, unit: String, icon: String})
   */
  static async getKeyData(userId){
    const userInfosEndPoint = process.env.REACT_APP_ENV === 'prod' ? "http://localhost:3000/user/" + userId
                            : process.env.REACT_APP_ENV === 'dev' ? 'http://localhost:3001/user_info_mock.json' : '';
    //const dieteticIndicatorEndPoint = "http://localhost:3000/user/:id/key-data"; -> this route doesn't exist!
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

  /**
   * Get formatted data to build session duration graph
   * @param {Number} userId
   * @returns {Array} - Array of object ({day: String, sessionLength: Number})
   */
  static async getSessionDuration(userId){
    const sessionDurationEndPoint = process.env.REACT_APP_ENV === 'prod' ? "http://localhost:3000/user/" + userId + "/average-sessions"
                                  : process.env.REACT_APP_ENV === 'dev' ? 'http://localhost:3001/user_sessions_mock.json' : '';

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

  /**
   * Get formatted data to build session duration graph
   * @param {Number} userId
   * @returns {Array} - Array of object ({kind: String, value: Number})
   */
  static async getActivityType(userId){
    const activityTypeEndPoint = process.env.REACT_APP_ENV === 'prod' ? "http://localhost:3000/user/" + userId + "/performance"
                                : process.env.REACT_APP_ENV === 'dev' ? 'http://localhost:3001/user_performance_mock.json' : '';

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

// Functions used to transform received data

/**
 * Transform key data object into a array of objects formatted for component display
 * @param {Object} data
 * @param {Number} data.calorieCount
 * @param {Number} data.proteinCount
 * @param {Number} data.carbohydrateCount
 * @param {Number} data.lipidCount
 * @returns {Array} - Array of objects ({id: Number, type: String, value: Number, unit: String, icon: String})
 */
function transformKeyData(data){
  let transformedData = [];
  let id = 0;

  for (let [key, value] of Object.entries(data)) {
    transformedData.push({
      id: id++,
      type: key.replace('Count', 's'),
      value: value,
      unit: findUnitOfKeyData(key),
      icon: findIconOfKeyData(key)
    })
  }

  return transformedData;
}

/**
 * Return the unit corresponding to the key data type
 * @param {String} type
 * @returns {String} - unit
 */
function findUnitOfKeyData(type){
  switch(type){
    case 'calorieCount': return 'kCal';
    case 'carbohydrateCount': return 'g';
    case 'lipidCount': return 'g';
    case 'proteinCount': return 'g';
    default: return 'g';
  }
}

/**
 * Return the icon path corresponding to the key data type
 * @param {String} type
 * @returns {String} - icon path
 */
function findIconOfKeyData(type){
  switch(type){
    case 'calorieCount': return calorie;
    case 'carbohydrateCount': return carbohydrate;
    case 'lipidCount': return lipid;
    case 'proteinCount': return protein;
    default: return '';
  }
}

/**
 * Transform session duration data array into a array of objects formatted for graph display
 * @param {Array} data - Array of object
 * @param {Number} data[x].day
 * @param {Number} data[x].sessionLength
 * @returns {Array} - Array of object ({day: String, sessionLength: Number})
 */
function mapDaysOfSessions(data){
  return data.map(session => {
    return {
      day: transformDay(session.day),
      sessionLength: session.sessionLength
    }
  })
}

/**
 * Return the day as letter initial corresponding to the day of the week number
 * @param {Number} day
 * @returns {String} day
 */
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


/**
 * Transform activity type data array into a array of objects formatted for graph display
 * @param {Array} data - array of objects
 * @param {Number} data[x].kind
 * @param {Number} data[x].value
 * @param {Object} kinds - dictionnary: correspondence between kind number and kind name
 * @returns {Array} - Array of object ({kind: String, value: Number})
 */
function transformActivityTypeData(data, kinds){
  const frenchKinds = {
    "cardio": "cardio",
    "energy": "énergie",
    "endurance": "endurance",
    "strength": "force",
    "speed": "vitesse",
    "intensity": "intensité"
  }

  let activityType = data.map(type => {
    let kind = kinds[type.kind];
    let frenchKind = frenchKinds[kind]
    let capitalizedKind = frenchKind[0].toUpperCase() + frenchKind.substring(1);
    return {
      kind: capitalizedKind,
      value: type.value
    }
  })
  // change element order to display the longest words at top and bottom of the graph
  let firstItem = activityType.pop();
  activityType.unshift(firstItem);

  return activityType;
}
