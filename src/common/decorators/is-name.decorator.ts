import { Matches } from 'class-validator';
import NAME_REGEX from '@/common/regex/NameRegex';

export function IsName() {
  return Matches(NAME_REGEX, {
    message: 'name must contain only letters and spaces',
  });
}
