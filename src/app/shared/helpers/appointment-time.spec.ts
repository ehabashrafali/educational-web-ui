import { normalizeAppointmentTime } from './appointment-time';
import { convertTo12HourFormat, convertWeeklyAppointmentToClients } from './clientTimeZone';

describe('Appointment clock times', () => {
  it('normalizes migrated hours and preserves seconds', () => {
    expect(normalizeAppointmentTime('9:30')).toBe('09:30');
    expect(normalizeAppointmentTime('09:30:45')).toBe('09:30:45');
    expect(normalizeAppointmentTime('00:00')).toBe('00:00');
  });

  it('rejects legacy, ambiguous and out-of-range values', () => {
    for (const time of ['9.30', '9:3', '24:00', '12:60', '12:30:60', '', null]) {
      expect(normalizeAppointmentTime(time)).toBe('');
    }
  });

  it('formats midnight, noon and seconds correctly', () => {
    expect(convertTo12HourFormat('00:00')).toBe('12:00 AM');
    expect(convertTo12HourFormat('12:00')).toBe('12:00 PM');
    expect(convertTo12HourFormat('23:59:45')).toBe('11:59:45 PM');
    expect(convertTo12HourFormat('invalid')).toBe('-');
  });

  it('converts clock times across a day boundary without losing seconds', () => {
    const appointment = { day: 'Monday', time: '00:30:45', timeZone: 'Africa/Cairo' };
    const result = convertWeeklyAppointmentToClients(appointment, 'Etc/GMT+12');
    expect(result.day).toBe('Sunday');
    expect(result.time.endsWith(':30:45')).toBeTrue();
  });

  it('does not substitute the current time for an invalid appointment', () => {
    const result = convertWeeklyAppointmentToClients({ day: 'Monday', time: 'bad', timeZone: '' });
    expect(result.time).toBe('');
  });
});
