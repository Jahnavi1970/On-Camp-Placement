export const avatarTitle = (user) => {
  const defaultAvatarTitle = "NN";
  if (!user || !user.firstName || !user.lastName) {
    return defaultAvatarTitle;
  }
  return user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase();
};
