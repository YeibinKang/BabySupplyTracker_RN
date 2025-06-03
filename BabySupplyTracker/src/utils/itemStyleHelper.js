export const getCardStyleByStatus = (isLowStock, isExpiringSoon) => {
    if (isLowStock && isExpiringSoon) return 'bothWarning';
    if (isLowStock) return 'lowStock';
    if (isExpiringSoon) return 'expiring';
    return 'normal';
};

export const getWarningIcon = (isLowStock, isExpiringSoon) => {
    if (isLowStock && isExpiringSoon) return 'clock-alert';
    if (isLowStock) return 'shopping';
    if (isExpiringSoon) return 'calendar-alert';
    return null;
};

export const getIconColor = (isLowStock, isExpiringSoon) => {
    if (isLowStock && isExpiringSoon) return '#BF360C';
    if (isLowStock) return '#D32F2F';
    if (isExpiringSoon) return '#FF9800';
    return '#4CAF50';
};