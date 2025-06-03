/**
 * @jest-environment node
 */

const { checkIsExpiringSoon } = require('../../src/utils/expiringFilter');

describe('checkIsExpiringSoon', () => {
    it('returns true for the expired date is within 7 days from today', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 3);
        const result = checkIsExpiringSoon(futureDate.toISOString());
        expect(result).toBe(true);
    });


    it('returns false if the expired date is more than 7 days from today', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 15);
        const result = checkIsExpiringSoon(futureDate.toISOString());
        expect(result).toBe(false);
    });

});
