import {connectionPool} from "../util/connection-util";
const schema = "project1";
const users = schema + ".ers_users";

export async function getusers()
{
    const client = await connectionPool.connect();
    try
    {
        const resp = await client.query("SELECT * FROM "+users);
        return resp.rows;
    }
    finally
    {
        client.release();
    }
}

export async function verifyUser(username: string, password: string)
{
    const client = await connectionPool.connect();
    try
    {
        const resp = await client.query("SELECT * FROM "+users+" WHERE ers_username = $1 AND ers_password = $2", [username, password]);
        if(resp.rows.length == 1)
            return resp.rows[0];
    }
    finally
    {
        client.release();
    }
}

export async function create(user)
{
    const ers_username = user.username;
    const ers_password = user.password;
    const user_first_name = user.firstname;
    const user_last_name = user.lastname;
    const user_email = user.email;
    const user_role_id = user.user_role_id;

    const client = await connectionPool.connect();
    try
    {
        const resp = await client.query("INSERT INTO "+users+" (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ers_users_id", [ers_username, ers_password, user_first_name, user_last_name, user_email, 1] );
        /* We will give anyone who sign up a value of 1 for user_role_id because only the manager will be created by using a query to the database */
        return resp;
    }
    finally
    {
        client.release();
    }
}