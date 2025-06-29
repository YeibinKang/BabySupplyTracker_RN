import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Linking, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Text, Button, Divider } from "react-native-paper";
import { useInventory } from '../../context/InventoryContext';


export default function ItemDetailScreen() {
    const route = useRoute();
    const { items, deleteItem } = useInventory();
    const navigation = useNavigation();
    const itemInfo = route.params;
    const [itemData, setItemData] = useState(null); //individual item data (selected from the list)



    useEffect(() => {
        if (items && items.length > 0) {
            const item = items.find((item) => item.id === itemInfo.itemId);
            setItemData(item);

        }


    }, [items, itemInfo]);

    if (!itemData) {
        return null;
    }

    const handleEditButtonPress = () => {

        console.log("item id: ", itemData.id);


        if (itemData && itemData.id) {
            console.log("Edit button pressed");
            navigation.navigate("ItemEdit", { itemId: itemData.id });
        } else {
            console.log("itemData is empty");
        }

    }

    const handleDeleteButtonPress = () => {

        if (itemData !== null) {

            //delete item from the useInventory context (items)

            const deletedItem = items.find((item) => item.id === itemData.id);
            if (!deletedItem) {
                console.log("Item not found in the inventory");
                return;
            } else {

                deleteItem(deletedItem.id);
                navigation.goBack(); // Navigate back to the previous screen after deletion
            }

        }

    }

    const confirmDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: handleDeleteButtonPress
                }
            ]
        );
    };


    const checkIsExpiringSoon = (dateStr: string) => {
        const today = new Date();
        const target = new Date(dateStr);
        const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && diffDays >= 0;
    };


    return (

        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{itemData.name}</Text>

            </View>

            <Divider style={{ marginVertical: 16 }} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quantity</Text>
                <Text style={styles.sectionContent}>{itemData.qty} {itemData.unit}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Minimum stock quantity</Text>
                <Text style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
                    You'll receive a notification when quantity falls below this number.
                </Text>
                <Text style={styles.sectionContent}>{itemData.minStock} {itemData.unit}</Text>

            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Stage</Text>
                {itemData.hasStage ? <Text style={styles.sectionContent}>{itemData.stage}</Text> : <Text style={styles.sectionContent}>N/A</Text>}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Category</Text>
                <Text style={styles.sectionContent}>{itemData.category}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Item location</Text>
                <Text style={styles.sectionContent}>{itemData.itemLocation}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Expired date</Text>
                {itemData.hasExpiredDate ? <Text style={styles.sectionContent}>{itemData.expiredDate}</Text> : <Text style={styles.sectionContent}>N/A</Text>}

            </View>


            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Memo</Text>
                <Text style={styles.sectionContent}>{itemData.memo}</Text>
            </View>

            {(itemData.minStock > itemData.qty || checkIsExpiringSoon(itemData.expiredDate)) && (
                <View style={styles.buttonContainer}>
                    <Button mode="outlined" style={styles.button} buttonColor='#213363' textColor='white' onPress={() => {
                        itemData.hasStage ? Linking.openURL(`https://www.google.com/search?q=${encodeURIComponent(itemData.name + ' ' + itemData.stage)}`) :
                            Linking.openURL(`https://www.google.com/search?q=${encodeURIComponent(itemData.name + ' baby')}`)
                    }}
                    >Buy Now</Button>

                </View>
            )}


            <Divider style={{ marginVertical: 16 }} />

            <View style={styles.buttonContainer}>
                <Button mode="outlined" style={styles.button} onPress={handleEditButtonPress}>Edit</Button>
                <Button mode="contained" buttonColor="red" style={styles.button} onPress={confirmDelete}>Delete</Button>
            </View>


        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        marginHorizontal: 4,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
        marginBottom: 4,
    },
    sectionContent: {
        fontSize: 16,
        color: '#777',
    },
});