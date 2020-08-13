export const GET_USER_FROM_DATABASE = "GET_USER_FROM_DATABASE";

class User {
  constructor(userId, name, email, phone, position, imageUrl) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.position = position;
    this.imageUrl = imageUrl;
  }
}

export const getUserFromDatabase = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const userResponse = await fetch(
      `https://the-raymond-shop.firebaseio.com/users.json?auth=${token}`
    );

    const resData = await userResponse.json();

    const loadedUsers = [];

    for (const key in resData) {
      loadedUsers.push(
        new User(
          resData[key].userId,
          resData[key].name,
          resData[key].email,
          resData[key].phone,
          resData[key].position,
          resData[key].imageUrl
        )
      );
    }

    const currentUser = loadedUsers.filter((user) => user.userId === userId);

    if (currentUser[0].position === undefined) {
      currentUser[0].position = "Please add your position";
    }

    if (currentUser[0].imageUrl === undefined) {
      currentUser[0].imageUrl =
        "https://i2.wp.com/news.microsoft.com/apac/wp-content/themes/microsoft-news-center-2016/assets/img/default-avatar.png?ssl=1";
    }

    const userDetails = {
      name: currentUser[0].name,
      email: currentUser[0].email,
      phone: currentUser[0].phone,
      position: currentUser[0].position,
      imageUrl: currentUser[0].imageUrl,
    };

    dispatch({
      type: GET_USER_FROM_DATABASE,
      userDetails: userDetails,
    });
  };
};
