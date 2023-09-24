/** Capitalizes the name of the category.  */
export function formatCategoryName(rawName: string) {
  return rawName?.length > 0 ? rawName[0].toUpperCase() + rawName.slice(1) : "";
}
