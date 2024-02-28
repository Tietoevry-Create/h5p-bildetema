import { audioFileTypes } from "../../constants/audio-file-types";
import { AudioFile } from "../../types/AudioFile";
import { LanguageCode } from "../../types/LanguageCode";

export const getAudioPath = (
  audioContainerURL: string,
  languageCode: LanguageCode,
  id: string,
): string => {
  return `${audioContainerURL}/${languageCode}/${id}`;
};

export const getAudioURLs = (
  audioContainerURL: string,
  languageCode: LanguageCode,
  id: string,
): Array<AudioFile> => {
  const audioPath = getAudioPath(audioContainerURL, languageCode, id);

  return audioFileTypes.map(fileType => ({
    ...fileType,
    url: `${audioPath}.${fileType.extension}`,
  }));
};

export const getAudioFiles = (
  wordId: string,
  backedUrl: string,
  languageCode: LanguageCode,
): Array<AudioFile> => {
  const audioFile: AudioFile = {mimeType: "audio/mp3", url: `${backedUrl}audio/${languageCode}/${wordId}.mp3`}
  return [audioFile]
};
