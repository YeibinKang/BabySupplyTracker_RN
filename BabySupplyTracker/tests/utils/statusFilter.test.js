/* global jest */
const { isStatusMatched } = require("../../src/utils/statusFilter");
const { checkIsExpiringSoon } = require("../../src/utils/expiringFilter");

jest.mock('../../src/utils/expiringFilter', () => ({
    checkIsExpiringSoon: jest.fn(),
}));


test('should return true when item is expiring soon', () => {
    checkIsExpiringSoon.mockReturnValue(true); // mock 설정
    const result = isStatusMatched({ qty: 10, minStock: 5, hasExpiredDate: true, expiredDate: '2024-12-31' }, 'expiring');
    expect(result).toBe(true);
});


//returns false when expiring function is false
test('should return false when item has enough expired date', () => {
    checkIsExpiringSoon.mockReturnValue(false);
    const result = isStatusMatched({ qty: 10, minStock: 5, hasExpiredDate: true, expiredDate: '2025-12-31' }, 'expiring');
    expect(result).toBe(false);
});

//describe('returns true when qty > min) -> lowStock
test('should return true when qty < min and selectedStatus === lowStock', () => {
    const result = isStatusMatched({ qty: 1, minStock: 5, hasExpiredDate: true, expiredDate: '2025-12-31' }, 'lowStock');
    expect(result).toBe(true);
})


//returns false when qty<min && selectedStatus === lowStock
test('should return false when qty > min and selectedStatus === lowStock', () => {
    const result = isStatusMatched({ qty: 10, minStock: 3, hasExpiredDate: true, expiredDate: '2025-12-31' }, 'lowStock');
    expect(result).toBe(false);
})

//selectedStatus === both if expiring && lowstock
test('should return true, qty<min && selectedStatus === both', () => {
    checkIsExpiringSoon.mockReturnValue(true);
    const result = isStatusMatched({ qty: 1, minStock: 3, hasExpiredDate: true, expiredDate: '2024-12-31' }, 'both');
    expect(result).toBe(true);
})


//one of them is false -> false
test('should return false, if qty>mim && expired date is soon && selectedStatus === both', () => {
    checkIsExpiringSoon.mockReturnValue(true);
    const result = isStatusMatched({ qty: 10, minStock: 3, hasExpiredDate: true, expiredDate: '2024-12-31' }, 'both');
    expect(result).toBe(false);
})

test('should return false, if qty<mim && expired date is not coming soon && selectedStatus === both', () => {
    checkIsExpiringSoon.mockReturnValue(false);
    const result = isStatusMatched({ qty: 1, minStock: 3, hasExpiredDate: true, expiredDate: '2025-12-31' }, 'both');
    expect(result).toBe(false);
})