export const validPhone = (num: string) => {
  return num.replace(/^\+?(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '+$1($2) $3-$4-$5')
}