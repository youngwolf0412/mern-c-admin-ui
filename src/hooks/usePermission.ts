import { User } from "../types";

export const usePermission = () => {
  const allowedRoles = ["admin", "manager"];

  const _hasPermission = (user: any) => {
    if (user) {
      return allowedRoles.includes(user.role);
    }
    return false;
  };

  return {
    isAllowed: _hasPermission,
  };
};
