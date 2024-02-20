import { USER_BG_COLORS } from "../../constants/user";


export const randomBGColor = () => {
  return Math.floor(Math.random() * USER_BG_COLORS.length);
}