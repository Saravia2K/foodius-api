export default function formatName(fullname: string) {
  const parts = fullname.trim().split(" ");
  if (parts.length < 2) {
    return fullname;
  }

  const firstName = parts[0];
  const lastNameFirstLetter = parts[1].charAt(0).toUpperCase();
  return `${firstName} ${lastNameFirstLetter}.`;
}
