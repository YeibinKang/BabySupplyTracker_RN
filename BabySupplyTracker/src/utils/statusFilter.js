const { checkIsExpiringSoon } = require("../utils/expiringFilter");

const isStatusMatched = (item, selectedStatus) => {
    if (selectedStatus === 'lowStock') {
        return item.qty < item.minStock;
    }
    if (selectedStatus === 'expiring') {
        return item.hasExpiredDate && checkIsExpiringSoon(item.expiredDate);
    }
    if (selectedStatus === 'both') {
        return (
            item.qty < item.minStock &&
            item.hasExpiredDate && checkIsExpiringSoon(item.expiredDate)
        );
    }
    return true;
};

module.exports = { isStatusMatched };