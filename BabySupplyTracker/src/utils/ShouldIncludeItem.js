
const { checkIsExpiringSoon } = require("../utils/expiringFilter");
const { isStatusMatched } = require("../utils/statusFilter");

const shouldIncludeItem = (item, selectedCategory, selectedStatus) => {

    const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
    const statusMatch = isStatusMatched(item, selectedStatus);


    return categoryMatch && statusMatch;
}

module.exports = { shouldIncludeItem };