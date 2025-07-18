import * as qs from "qs";
import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { parse } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isVietnameseTones(str?: string) {
  if (str) {
    return str
      .split("")
      .map((o) =>
        new RegExp(
          "^[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$"
        ).test(o)
      )
      .some((o) => o);
  }
  return true;
}
export function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  const formattedDate = format(date, "dd/MM/yyyy");
  return formattedDate;
}

// Hàm chuyển đổi từ "dd/MM/yyyy" sang ISO 8601
export const parseToISO = (dateString: string): string => {
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  const utcDate = new Date(
    parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000
  );
  return utcDate.toISOString();
};

export const convertQueryParam = (params: Record<string, any>): string => {
  const queryParams = qs.stringify(params);
  return queryParams;
};

export const formatLastWord = (input: string) => {
  if (input) {
    const words = input.trim().split(/\s+/);
    if (words.length === 1 && input.trim() !== "") {
      return words[0].charAt(0).toUpperCase();
    }
    if (words.length >= 2) {
      const lastTwoWords = words.slice(-2);
      return lastTwoWords.map((word) => word.charAt(0).toUpperCase()).join("");
    }
    if (input.trim() === "") return "AD";
  } else return "AD";
};

export const handlingDateFilter = (filterData: {
  [key: string]: any;
  date?: { from?: string; to?: string };
}) => {
  if (!filterData.date) return filterData;
  const { date, ...rest } = filterData;
  return { ...rest, fromDate: date?.from ?? "", toDate: date?.to ?? "" };
};
