import {
  QuranSurah,
  Grade,
  QuranRecitationTopic,
  TajweedRules,
  IslamicStudiesBooks,
} from "./report.dto";

export interface MonthlyReportDto {
  id: string;
  date: Date;
  memorization: QuranSurah;
  reading: QuranSurah;
  noOfMemorizationAyah: number;
  noOfReadingAyah: number;
  grade: Grade;
  basicQuranRecitationRules: QuranRecitationTopic;
  tajweedRules: TajweedRules;
  progress: Grade;
  quranComments: string;
  islamicStudiesComments: string;
  islamicStudiesTopics: string;
  islamicStudiesBooks: IslamicStudiesBooks;
  islamicStudiesProgress: Grade;
}
