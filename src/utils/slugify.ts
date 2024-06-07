export default function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s_/-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
