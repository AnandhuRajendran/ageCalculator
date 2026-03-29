import { ageCalculator, messageToUser, validateFormat } from '../ageCalculator';

describe('Age Calculator', () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  describe('validateFormat', () => {
    it('should accept valid date format YYYY/MM/DD', () => {
      expect(validateFormat('2000/01/01')).toBe(true);
    });

    it('should reject invalid date format', () => {
      expect(validateFormat('01/01/2000')).toBe(false);
      expect(validateFormat('2000-01-01')).toBe(false);
      expect(validateFormat('abcd/ef/gh')).toBe(false);
    });

    it('should reject impossible dates', () => {
      expect(validateFormat('2023/02/30')).toBe(false); // Feb 30
      expect(validateFormat('2023/13/01')).toBe(false); // Month 13
    });
  });

  describe('ageCalculator', () => {
    it('should calculate correct age', () => {
      const dob = `${currentYear - 25}/${currentMonth}/${currentDay}`;
      expect(ageCalculator(dob)).toBe(25);
    });

    it('should decrease age if birthday has not occurred yet this year', () => {
      const futureMonth = currentMonth === 12 ? 1 : currentMonth + 1;
      const dob = `${currentYear - 25}/${futureMonth}/${currentDay}`;
      expect(ageCalculator(dob)).toBe(24);
    });
  });

  describe('messageToUser', () => {
    it('should show "Superhuman level reached!" for age >= 100', () => {
      const dob = `${currentYear - 100}/01/01`;
      console.log = jest.fn();
      messageToUser(dob, 100);
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Superhuman level reached'));
    });

    it('should show birthday message if today is birthday', () => {
      const dob = `${currentYear - 30}/${currentMonth}/${currentDay}`;
      console.log = jest.fn();
      messageToUser(dob, 30);
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Happy Birthday!'));
    });

    it('should show "Are you sure you are born today?" if born today', () => {
      const dob = `${currentYear}/${currentMonth}/${currentDay}`;
      console.log = jest.fn();
      messageToUser(dob, 0);
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Are you sure you are born today?'));
    });

    it('should show "You are not born yet!" if future date', () => {
      const dob = `${currentYear + 1}/01/01`;
      console.log = jest.fn();
      messageToUser(dob, -1);
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('You are not born yet'));
    });

    it('should show leap year message for Feb 29', () => {
      const dob = `${currentYear - 20}/02/29`;
      console.log = jest.fn();
      messageToUser(dob, 20);
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Born on Feb 29'));
    });

    it('should show default message if no special case applies', () => {
      const dob = `${currentYear - 25}/03/15`;
      console.log = jest.fn();
      messageToUser(dob, 25);
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Keep enjoying your life'));
    });
  });
});
