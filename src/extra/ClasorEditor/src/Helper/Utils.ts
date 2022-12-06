import { ClasorExtension } from '../Enum';

export const toPersinaDigit = (digits: number | string): string => {
  const fa = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return digits.toString().replace(/[0-9]/g, function (w) {
    return fa[+w];
  });
};

export const IsJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const fileTypeIs = (
  extension: string
): 'VIDEO' | 'AUDIO' | 'IMAGE' | 'WORD' | 'TEXT' | 'CLASOR_CONTENT' | null => {
  extension = extension.toLowerCase();
  const wordExtensions = ['docx', 'doc'];
  const textExtensions = ['txt'];
  const videoExtensions = [
    'mp4',
    'mov',
    'wmv',
    'flv',
    'avi',
    'avi',
    'avchd',
    'webm',
    'mkv',
    'ogv',
  ];
  const audioExtensions = [
    'mp3',
    'aac',
    'ogg',
    'flac',
    'alac',
    'wav',
    'aiff',
    'dsd',
  ];
  const imageExtensions = [
    'tif',
    'tiff',
    'gif',
    'png',
    'eps',
    'jpeg',
    'jpg',
    'raw',
  ];

  if (videoExtensions.includes(extension)) {
    return 'VIDEO';
  } else if (audioExtensions.includes(extension)) {
    return 'AUDIO';
  } else if (imageExtensions.includes(extension)) {
    return 'IMAGE';
  } else if (textExtensions.includes(extension)) {
    return 'TEXT';
  } else if (wordExtensions.includes(extension)) {
    return 'WORD';
  } else if (extension === ClasorExtension.CONTENT) {
    return 'CLASOR_CONTENT';
  }
  return null;
};

export const readFileContent = (file: File) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event: ProgressEvent<FileReader>) =>
      resolve(event.target?.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
