const checkIsExpiringSoon = (dateStr) => {
        const today = new Date();
        const target = new Date(dateStr);
        const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && diffDays >= -100;
};

module.exports = { checkIsExpiringSoon };