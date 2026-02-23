import {
  QuranSurah,
  Grade,
  QuranRecitationTopic,
  TajweedRules,
  IslamicStudiesBooks,
} from "./report.dto";

export interface MonthlyReportDto {
  id?: string;
  date: Date;
  memorization?: QuranSurah;
  memorizationGrade?: Grade;
  reading?: QuranSurah;
  readingGrade: Grade;
  noOfMemorizationAyah: number;
  noOfReadingAyah: number;
  basicQuranRecitationRules: BasicQuranRecitationRule[];
  basicQuranRecitationRulesProgress?: Grade;
  tajweedRules: Tajweed[];
  tajweedRulesProgress?: Grade;
  quranComments?: string;
  islamicStudiesComments?: string;
  islamicStudiesTopics?: string;
  islamicStudiesBooks: IslamicStudiesBook[];
  islamicStudiesProgress?: Grade;
  othersIslamicStudiesBooks: string;
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
