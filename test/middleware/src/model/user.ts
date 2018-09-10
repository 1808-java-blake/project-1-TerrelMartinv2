export class User {
  ers_users_id = 0;
  ers_username = '';
  ers_password = '';
  user_first_name = '';
  user_last_name = '';
  user_email = '';
  user_role_id = 0;
  

  constructor(ers_users_id?: number, ers_username?: string, ers_password?: string, user_first_name?: string, user_last_name?: string, user_email?: string, user_role_id?: number) {
    
    ers_users_id && (this.ers_users_id = ers_users_id);
    ers_username && (this.ers_username = ers_username);
    ers_password && (this.ers_password = ers_password);
    user_first_name && (this.user_first_name = user_first_name);
    user_last_name && (this.user_last_name = user_last_name);
    user_email && (this.user_email = user_email);
    user_role_id && (this.user_role_id = user_role_id);
    
  }
}