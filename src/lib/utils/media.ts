export const isImageFile = (url: string) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

export const isVideoFile = (url: string) => {
  const videoExtensions = [
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".webm",
    ".flv",
    ".wmv",
  ];
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};
