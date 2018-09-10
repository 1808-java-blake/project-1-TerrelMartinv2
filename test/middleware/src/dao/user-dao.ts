import { connectionPool } from "../util/connection-util";
import { User } from "../model/user";
import { userConverter } from "../util/user-converter";
// import { userConverter } from "../util/user-converter";

/**
 * Retreive all users from the DB
 */
export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const res = await client.query(
      `SELECT * FROM project1.ers_users`
    );
    // extract the users
    const users = [];
    res.rows.forEach(user_result => {
      users.push(user_result);
    });
    return users;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by id, will also retreive all of that users movies
 * @param id 
 */
export async function findById(id: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.users 
        WHERE user_id = $1`, [id]);
        let user = new User();
        if(resp.rows.length !== 0) {
        user = resp.rows[0];
      }
      return user;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by username and password, will also retreive all of that users movies
 * @param id 
 */
/**
 * Retreive a single user by username and password, will also retreive all of that users movies
 * @param id
 */
//****************FIRST WAY!!!! */
// export async function findByUsernameAndPassword(
//   username: string,
//   password: string
// ): Promise<User> {
//   const client = await connectionPool.connect();
//   try {
//     console.log("here");
//     const res = await client.query(
//       `SELECT * FROM project1.ers_users u
//         WHERE u.ers_username = $1
//         AND u.ers_password = $2`,
//       [username, password]
//     );
//     console.log(res.rows[0]);
//     if (res.rows.length !== 0) {
//       return userConverter(res.rows[0]); // get the user data from first row
//     }
//     return null;
//   } finally {
//     client.release();
//   }
// }


export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM project1.ers_users 
        WHERE ers_username = $1
        AND ers_password = $2`, [username, password]);
       
        // let user = new User();
        if(resp.rows.length !== 0) {
        return userConverter(resp.rows[0]);
      }
      return null;
  } finally {
    client.release();
  }
}



/**
 * Add a new user to the DB
 * @param user 
 */
export async function create(user: any): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO project1.ers_users 
        (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id)
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING ers_users_id`, [user.username, user.password, user.firstname, user.lastname, user.email, 1]);
    return resp.rows[0].ers_users_id;
  } finally {
    client.release();
  }
}
/**
 * Add a movie to a users list
 * @param movieId 
 * @param userId 
 */
// export async function addMovieToUser(movieId: number, userId: number): Promise<any> {
//   const client = await connectionPool.connect();
//   try {
//     const resp = await client.query(
//       `INSERT INTO movies.users_movies 
//         (user_id, movie_id)
//         VALUES ($1, $2)`, [userId, movieId]);
//   } finally {
//     client.release();
//   }
// }