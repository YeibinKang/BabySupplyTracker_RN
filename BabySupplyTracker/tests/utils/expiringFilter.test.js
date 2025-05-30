const { checkIsExpiringSoon } = require('../../src/utils/expiringFilter');

describe('checkIsExpiringSoon', () => {
    it('returns true for a date within 7 days', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 3);
        const result = checkIsExpiringSoon(futureDate.toISOString());
        expect(result).toBe(true);
    });

});
