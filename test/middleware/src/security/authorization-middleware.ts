
export function authMiddleware(...user_role_id: number[]) {
  return (req, resp, next) => {
    const user = req.session.user;
    if (!user) {
      resp.sendStatus(401);
      return;
    }
    const hasPermission = user_role_id.some(user_role_id => {
      if (user.user_role_id === user_role_id) {
        return true;
      } else {
        return false;
      }
    })
    if (hasPermission) {
      next();
    } else {
      resp.sendStatus(403);
    }
  }
}