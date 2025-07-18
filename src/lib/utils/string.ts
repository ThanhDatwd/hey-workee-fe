export const convertToSlug = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/đ/g, "d")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export const trimObjectStrings = (obj: any): any => {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      // Chỉ trim nếu value là string
      acc[key] = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : value;
      return acc;
    }, {} as any);
  };