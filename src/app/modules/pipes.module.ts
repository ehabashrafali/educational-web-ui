import { NgModule } from "@angular/core";
import { EnumToListPipe } from "app/pipes/enum-to-list.pipe";
import { EnumValuePipe } from "app/pipes/enum-value.pipe";
import { ExtractNestedValuePipe } from "app/pipes/extract-nested-value.pipe";
import { FileExtensionPipe } from "app/pipes/file-extension.pipe";
import { FilterArrayPipe } from "app/pipes/filter-array.pipe";
import { FormatBooleanPipe } from "app/pipes/format-boolean";
import { FormatDateOnlyPipe } from "app/pipes/format-date-only.pipe";
import { FormatDatePipe } from "app/pipes/format-date.pipe";
import { FormatDatetimePipe } from "app/pipes/format-datetime.pipe";
import { FormatDecimalPipe } from "app/pipes/format-decimal.pipe";
import { FormatEnumPipe } from "app/pipes/format-enum.pipe";
import { FormatFileSizePipe } from "app/pipes/format-file-size.pipe";
import { FormatIntegerPipe } from "app/pipes/format-integer.pipe";
import { FormatTimePipe } from "app/pipes/format-time.pipe";
import { FormatValidationErrorsPipe } from "app/pipes/format-validation-errors.pipe";
import { HumanizePipe } from "app/pipes/humanize.pipe";
import { InitialsPipe } from "app/pipes/initials.pipe";
import { IsDateClosePipe } from "app/pipes/is-date-close.pipe";
import { IsNewPipe } from "app/pipes/is-new.pipe";
import { NumberOfRemainingDaysPipe } from "app/pipes/number-of-remaining-days.pipe";
import { OrdinalSuffixPipe } from "app/pipes/ordinal-suffix.pipe";
import { ReverseListPipe } from "app/pipes/reverse-list.pipe";
import { SecureFilePipe } from "app/pipes/secure-file.pipe";

@NgModule({
  declarations: [
    FormatDatePipe,
    FormatDatetimePipe,
    FormatDateOnlyPipe,
    FormatTimePipe,
    FormatIntegerPipe,
    ExtractNestedValuePipe,
    HumanizePipe,
    ReverseListPipe,
    EnumToListPipe,
    FormatEnumPipe,
    FilterArrayPipe,
    EnumValuePipe,
    FileExtensionPipe,
    SecureFilePipe,
    FormatFileSizePipe,
    IsDateClosePipe,
    NumberOfRemainingDaysPipe,
    IsNewPipe,
    InitialsPipe,
    OrdinalSuffixPipe,
    FormatBooleanPipe,
    FormatValidationErrorsPipe,
    FormatDecimalPipe,
  ],
  exports: [
    FormatDatePipe,
    FormatDatetimePipe,
    FormatDateOnlyPipe,
    FormatTimePipe,
    FormatIntegerPipe,
    ExtractNestedValuePipe,
    HumanizePipe,
    EnumToListPipe,
    FormatEnumPipe,
    ReverseListPipe,
    FilterArrayPipe,
    EnumValuePipe,
    FileExtensionPipe,
    SecureFilePipe,
    FormatFileSizePipe,
    IsDateClosePipe,
    NumberOfRemainingDaysPipe,
    IsNewPipe,
    InitialsPipe,
    OrdinalSuffixPipe,
    FormatBooleanPipe,
    FormatValidationErrorsPipe,
    FormatDecimalPipe,
  ],
})
export class PipesModule {}
