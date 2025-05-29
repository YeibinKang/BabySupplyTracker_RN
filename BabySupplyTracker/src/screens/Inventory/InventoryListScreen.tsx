
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Card, Text, Menu, Button, PaperProvider } from "react-native-paper";
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useInventory } from "../../context/InventoryContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";



export default function InventoryListScreen() {

    //const [items, setItems] = useState(inventoryItems);
    const { items } = useInventory();
    const { categoryList } = useInventory();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute();

    //const [activeFilter, setActiveFilter] = useState<'all' | 'lowStock' | 'expiring' | 'both'>('all');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<'all' | 'lowStock' | 'expiring' | 'both'>('all');

    const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
    const [statusMenuVisible, setStatusMenuVisible] = useState(false);
    const openCategoryMenu = () => setCategoryMenuVisible(true);
    const closeCategoryMenu = () => setCategoryMenuVisible(false);
    const openStatusMenu = () => setStatusMenuVisible(true);
    const closeStatusMenu = () => setStatusMenuVisible(false);



    const handleItemPress = (item: any) => {
        navigation.navigate("ItemDetail", { itemId: item.id });

    }

    const handleAddItemPress = () => {
        navigation.navigate("ItemAdd");
    };

    const getCategoryIcon = (categoryLabel: string) => {
        const matchedIcon = categoryList.find((cat) => cat.label === categoryLabel);
        return matchedIcon ? matchedIcon.icon : "question-mark-circle"; // default icon if not found
    }

    const checkIsExpiringSoon = (dateStr: string) => {
        const today = new Date();
        const target = new Date(dateStr);
        const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && diffDays >= 0;
    };

    const getCategoryButtonStyle = () => ({
        ...styles.filterButton,
        backgroundColor: selectedCategory !== null ? '#007AFF' : '#e0e0e0',
    });

    const getCategoryButtonTextColor = () =>
        selectedCategory !== null ? 'white' : 'black';

    const getStatusButtonStyle = () => ({
        ...styles.filterButton,
        backgroundColor: selectedStatus !== 'all' ? '#FF6B35' : '#e0e0e0',
    });

    const getStatusButtonTextColor = () =>
        selectedStatus !== 'all' ? 'white' : 'black';

    const getClearButtonStyle = () => {
        const hasActiveFilters = selectedCategory !== null || selectedStatus !== 'all';

        return {
            ...styles.filterButton,
            backgroundColor: hasActiveFilters ? '#FFE6E6' : '#f8f8f8',
            // opacity: hasActiveFilters ? 1 : 0.6,
        };
    };

    const getClearButtonTextColor = () => {
        const hasActiveFilters = selectedCategory !== null || selectedStatus !== 'all';
        return hasActiveFilters ? '#D32F2F' : '#888888';
    };


    const filteredItems = items.filter((item) => {

        const categoryMatch = selectedCategory ? item.category === selectedCategory : true;

        const statusMatch = (() => {
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
            return true; // 'all'
        })();

        return categoryMatch && statusMatch;
    });


    return (
        <View style={{ flex: 1, position: 'relative' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
                <Text>
                    Filtered by:{' 📌 '}
                    <Text style={{ fontWeight: 'bold' }}>
                        {selectedCategory ? categoryList.find(c => c.value === selectedCategory)?.label : 'All Categories'}
                    </Text>{' '}
                    |{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                        {selectedStatus === 'all' ? 'All Statuses' :
                            selectedStatus === 'lowStock' ? 'Low Stock' :
                                selectedStatus === 'expiring' ? 'Expiring Soon' : 'Low Stock & Expiring'}
                    </Text>
                </Text>

            </View>

            <View style={styles.buttonGroup}>
                {/* category */}
                {/* todo: selectedCategory != null -> background color */}
                <Menu
                    visible={categoryMenuVisible}
                    onDismiss={() => setCategoryMenuVisible(false)}
                    anchor={
                        <Button compact={true} onPress={openCategoryMenu} style={getCategoryButtonStyle()} textColor={getCategoryButtonTextColor()}>Category Filter</Button>}>

                    <Menu.Item onPress={() => setSelectedCategory(null)} title="All Categories" />
                    {categoryList.map((category) => (
                        <Menu.Item
                            leadingIcon={category.icon}
                            key={category.value}
                            onPress={() => {
                                setSelectedCategory(category.value);
                                setCategoryMenuVisible(false);
                            } // Close the menu after selection
                            }
                            title={category.label}
                        />
                    ))}
                </Menu>

                <View style={styles.filterContainer}>


                    <Menu visible={statusMenuVisible}
                        onDismiss={() => setStatusMenuVisible(false)}
                        anchor={

                            <Button compact={true} onPress={openStatusMenu} style={getStatusButtonStyle()} textColor={getStatusButtonTextColor()}>Status Filter</Button>}>
                        <Menu.Item onPress={() => setSelectedStatus('lowStock')} title="Low Stock" />
                        <Menu.Item onPress={() => setSelectedStatus('expiring')} title="Expiring Soon" />
                        <Menu.Item onPress={() => setSelectedStatus('both')} title="Low Stock & Expiring" />
                        <Menu.Item onPress={() => setSelectedStatus('all')} title="All Statuses" />
                    </Menu>
                    {selectedStatus !== 'all' && (
                        <Text style={styles.activeFilterText}>
                            {selectedStatus === 'lowStock' ? 'Low Stock' :
                                selectedStatus === 'expiring' ? 'Expiring' : 'Both'}
                        </Text>
                    )}

                </View>


                <Button
                    compact={true}
                    onPress={() => {
                        setSelectedCategory(null);
                        setSelectedStatus('all');
                    }}
                    style={getClearButtonStyle()}
                    textColor={getClearButtonTextColor()}
                    icon="close-circle">
                    Clear Filters
                </Button>

            </View>


            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 150 }}
                showsVerticalScrollIndicator={false}

                renderItem={({ item }) => {

                    const isLowStock = item.qty < item.minStock;
                    const isExpiringSoon = item.hasExpiredDate && (() => {
                        const currentDate = new Date();
                        const expiredDate = new Date(item.expiredDate);
                        const timeDiff = expiredDate.getTime() - currentDate.getTime();
                        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        return daysDiff <= 7; // 7 days
                    })();

                    let cardStyle = styles.card;
                    if (isLowStock && isExpiringSoon) {
                        cardStyle = styles.bothWarningCard;
                    } else if (isLowStock) {
                        cardStyle = styles.lowStockCard;
                    } else if (isExpiringSoon) {
                        cardStyle = styles.expiringSoonCard;
                    }

                    let warningIcon = null;
                    if (isLowStock && isExpiringSoon) {
                        warningIcon = "clock-alert";
                    } else if (isLowStock) {
                        warningIcon = "shopping";
                    } else if (isExpiringSoon) {
                        warningIcon = "calendar-alert";
                    }

                    const getIconColor = () => {
                        if (isLowStock && isExpiringSoon) return '#BF360C';
                        if (isLowStock) return '#D32F2F';
                        if (isExpiringSoon) return '#FF9800';
                        return '#4CAF50';
                    };

                    return (
                        <Card style={cardStyle} onPress={() => handleItemPress(item)}>
                            <View style={styles.cardContent}>
                                <View style={styles.iconWrapper}>

                                    <Icon name={getCategoryIcon(item.category)} size={30} color="#0E2148" />
                                </View>

                                <View style={styles.textContent}>
                                    <Text style={styles.cardTitle}>{item.name}</Text>
                                    <Text>Qty: {item.qty} {item.unit}</Text>
                                    <Text>Stage: {item.hasStage ? item.stage : 'N/A'}</Text>
                                    <Text>Category: {item.category}</Text>
                                    <Text>Location: {item.itemLocation}</Text>
                                    <Text>Expired Date: {item.hasExpiredDate ? item.expiredDate : 'N/A'}</Text>
                                </View>

                                {warningIcon ? <View style={{
                                    backgroundColor: getIconColor(),
                                    padding: 6,
                                    borderRadius: 20,
                                }}>
                                    <Icon name={warningIcon} size={30} color='#FFFFFF' />
                                </View> : null}


                            </View>

                        </Card>
                    )

                }}
            />




            <TouchableOpacity style={styles.floatingButton} onPress={handleAddItemPress}>
                <Icon name="plus" size={30} color="#F2F2F2" />
            </TouchableOpacity>

        </View>
    )

};

const styles = StyleSheet.create({

    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#FDFAF6',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    title: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    iconWrapper: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 12,
        paddingTop: 6, // 아이콘을 위쪽에 정렬
        margin: 6,

    },
    statusIconWrapper: {
        backgroundColor: '#D32F2F',
        borderRadius: 12,
        padding: 4,
    },

    textContent: {
        flex: 1,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 16,
    },
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 50,
        backgroundColor: '#DA6C6C',
        borderRadius: 30,
        padding: 16,
        elevation: 5, // 안드로이드 그림자
        shadowColor: '#000', // iOS 그림자
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        zIndex: 1000
    },
    lowStockCard: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#FFE5E5',

    },
    bothWarningCard: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#FFD6B3',
    },
    expiringSoonCard: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#FFF6CC',
    },

    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingTop: 8,
        alignItems: 'center',
    },
    filterButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 1,
        flex: 1, // 동일한 너비로 분배
        marginHorizontal: 4, // 더 작은 간격
        alignSelf: 'center',

    },
    activeFilterText: {
        fontSize: 10,
        color: '#666',
        marginTop: 4,
        textAlign: 'center',
        fontWeight: '500',
    },


});