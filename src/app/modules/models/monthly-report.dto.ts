import {
  QuranSurah,
  Grade,
  QuranRecitationTopic,
  TajweedRules,
  IslamicStudiesBooks,
} from "./report.dto";

export interface MonthlyReportDto {
  id: string;
  date?: Date;
  memorization?: QuranSurah;
  reading?: QuranSurah;
  noOfMemorizationAyah: number;
  noOfReadingAyah: number;
  grade?: Grade;
  basicQuranRecitationRules: BasicQuranRecitationRule[];
  tajweedRules: Tajweed[];
  progress?: Grade;
  quranComments?: string;
  islamicStudiesComments: string;
  islamicStudiesTopics?: string;
  islamicStudiesBooks?: IslamicStudiesBook[];
  islamicStudiesProgress?: Grade;
}

export interface BasicQuranRecitationRule {
  quranRecitationTopic: QuranRecitationTopic;
}
export interface Tajweed {
  tajweedRule: TajweedRules;
}

export interface IslamicStudiesBook {
  book: IslamicStudiesBooks;
}
