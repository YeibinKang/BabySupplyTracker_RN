import { View, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, TextInput, Switch } from "react-native-paper";
import { useState, useEffect } from 'react';
import { useRoute, useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useInventory } from '../../context/InventoryContext';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../context/AuthContext';
import { serverTimestamp } from 'firebase/firestore';




export default function ItemAddScreen() {

    const navigation = useNavigation();
    const { items, addItem, uid } = useInventory();
    const { categoryList = [] } = useInventory();
    const { unitList = [] } = useInventory();

    const isGuestMode = uid === null;

    const [itemData, setItemData] = useState({
        name: "",
        qty: 0,
        unit: "",
        stage: "",
        category: "",
        itemLocation: "",
        expiredDate: "",
        needsRestock: false,
        createdAt: "",
        minStock: 0,
        memo: "",
        hasExpiredDate: false,
        hasStage: false,

    });

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);



    const handleTextInputChange = (field, value) => {
        setItemData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDateChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate) {
            setDate(selectedDate);
            handleTextInputChange('expiredDate', selectedDate.toISOString().split('T')[0]);
        }
    };

    const handleSaveButtonPress = () => {

        let item = { ...itemData };

        /// Check if the item name is empty
        if (!item.name.trim()) {
            alert("Please enter an item name.");
            return;
        }

        if (isGuestMode) {
            //Guest mode: local

            item = {
                ...item,
                id: Date.now().toString(), // Generate a unique ID based on timestamp
                createdAt: new Date().toISOString(),
            }


        } else {
            //firebase
            item = {
                ...item,
                createdAt: serverTimestamp(),
            }
        }

        addItem(item);
        navigation.navigate("MainTabs", { screen: "InventoryList" });
        return;

    };




    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}>

            <ScrollView contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled">
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Name</Text>
                    <TextInput
                        value={itemData.name?.toString() ?? ''}
                        onChangeText={(value) => handleTextInputChange('name', value)}
                        mode="outlined"
                        style={styles.sectionContent}
                    />
                </View>


                <View style={styles.rowBetween}>
                    <Text style={styles.sectionTitle}>Quantity</Text>
                    <View style={styles.stepper}>
                        <TouchableOpacity
                            onPress={() => handleTextInputChange('qty', Math.max(0, itemData.qty - 1))}
                            style={{ padding: 10, backgroundColor: '#ddd', borderRadius: 4, marginLeft: 16 }}
                        >
                            <Text style={{ fontSize: 20 }}>-</Text>
                        </TouchableOpacity>

                        <Text style={{ marginHorizontal: 16, fontSize: 16 }}> {isNaN(itemData.qty) ? 0 : itemData.qty}</Text>

                        <TouchableOpacity
                            onPress={() => handleTextInputChange('qty', itemData.qty + 1)}
                            style={{ padding: 10, backgroundColor: '#ddd', borderRadius: 4 }}
                        >
                            <Text style={{ fontSize: 20 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.rowBetween}>
                    <Text style={styles.sectionTitle}>Minimum stock quantity</Text>
                    <View style={styles.stepper}>
                        <TouchableOpacity
                            onPress={() => handleTextInputChange('minStock', Math.max(0, itemData.minStock - 1))}
                            style={{ padding: 10, backgroundColor: '#ddd', borderRadius: 4, marginLeft: 16 }}
                        >
                            <Text style={{ fontSize: 20 }}>-</Text>
                        </TouchableOpacity>

                        <Text style={{ marginHorizontal: 16, fontSize: 16 }}> {isNaN(itemData.qty) ? 0 : itemData.minStock}</Text>

                        <TouchableOpacity
                            onPress={() => handleTextInputChange('minStock', itemData.minStock + 1)}
                            style={{ padding: 10, backgroundColor: '#ddd', borderRadius: 4 }}
                        >
                            <Text style={{ fontSize: 20 }}>+</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <Text style={{ color: '#888', fontSize: 13, marginTop: 8, marginBottom: 16 }}>
                    You'll receive a notification when quantity falls below this number.
                </Text>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Category</Text>
                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginTop: 4 }}>
                        <Picker style={styles.picker}
                            selectedValue={itemData.category}
                            onValueChange={(value) => handleTextInputChange('category', value)}
                        >
                            <Picker.Item label="Select Category" value="" />
                            {categoryList.map((cat) => (
                                <Picker.Item label={cat.label} value={cat.value} key={cat.value} />
                            ))}
                        </Picker>
                    </View>
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Expired Date</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                        <Text>Has Expiry Date?</Text>
                        <Switch
                            style={{ marginLeft: 10 }}
                            value={itemData.hasExpiredDate}
                            onValueChange={(value) => {
                                handleTextInputChange('hasExpiredDate', value);

                                if (!value) {
                                    handleTextInputChange('expiredDate', 'N/A');
                                } else {
                                    handleTextInputChange('expiredDate', date.toISOString().split('T')[0]);
                                }
                            }}
                        />
                    </View>

                    <TextInput
                        value={itemData.expiredDate}
                        editable={false}
                        mode="outlined"
                        style={[
                            styles.sectionContent,
                            { backgroundColor: itemData.hasExpiredDate ? '#fff' : '#eee' },
                        ]}
                    />

                    {itemData.hasExpiredDate && (
                        <Button mode="outlined" onPress={() => setShow(true)} style={{ marginTop: 8 }}>
                            Edit Date
                        </Button>
                    )}

                    {show && itemData.hasExpiredDate && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>



                {/* optional sections */}
                <TouchableOpacity onPress={() => setShowAdvanced(prev => !prev)} style={styles.toggleButton}>
                    <Text style={styles.toggleButtonText}>
                        {showAdvanced ? '▲ Hide Additional Info' : '▼ Add Additional Info'}
                    </Text>
                </TouchableOpacity>


                {showAdvanced && (
                    <>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Unit</Text>
                            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginTop: 4 }}>
                                {(unitList) && (
                                    <Picker style={styles.picker}
                                        selectedValue={itemData.unit}
                                        onValueChange={(value) => handleTextInputChange('unit', value)}
                                        mode='dropdown'
                                    >
                                        <Picker.Item label="Select Unit" value="" />
                                        {unitList.map((unitObj) => (
                                            <Picker.Item label={unitObj.label} value={unitObj.label} key={unitObj.id} />
                                        ))}
                                    </Picker>
                                )}

                            </View>
                        </View>


                        <View style={styles.section}>

                            <Text style={styles.sectionTitle}>Stage</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                                <Text>Has Stage?</Text>
                                <Switch
                                    style={{ marginLeft: 10 }}
                                    value={itemData.hasStage}
                                    onValueChange={(value) => {
                                        handleTextInputChange('hasStage', value);

                                        if (!value) {
                                            handleTextInputChange('stage', 'N/A');

                                        } else {
                                            handleTextInputChange('stage', itemData.stage);

                                        }
                                    }}
                                />
                            </View>
                            <TextInput
                                value={itemData.stage?.toString() ?? ''}
                                onChangeText={(value) => handleTextInputChange('stage', value)}
                                mode="outlined"
                                style={styles.sectionContent}
                                editable={itemData.hasStage}
                                placeholder={itemData.hasStage ? "Enter stage info" : "N/A"}
                                pointerEvents={itemData.hasStage ? "auto" : "none"}
                            />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Item Location</Text>
                            <TextInput
                                value={itemData.itemLocation?.toString() ?? ''}
                                onChangeText={(value) => handleTextInputChange('itemLocation', value)}
                                mode="outlined"
                                style={styles.sectionContent}
                            />
                        </View>




                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Memo</Text>
                            <TextInput
                                value={itemData.memo?.toString() ?? ''}
                                onChangeText={(value) => handleTextInputChange('memo', value)}
                                mode="outlined"
                                multiline={true}
                                numberOfLines={4}
                                style={[styles.sectionContent, { height: 100, textAlignVertical: 'top' }]}
                            />

                        </View>
                    </>
                )}





                <View style={styles.buttonContainer}>
                    <Button mode="outlined" style={styles.button} onPress={handleSaveButtonPress}>
                        Save
                    </Button>
                    <Button mode="contained" buttonColor="red" style={styles.button}>
                        Cancel
                    </Button>
                </View>



            </ScrollView>
        </KeyboardAvoidingView>


    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        padding: 16,
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
        marginBottom: 0,
    },
    sectionContent: {
        fontSize: 16,
        color: '#777',
        margin: 2,
    },
    picker: {
        paddingVertical: 0,
        marginTop: 0,
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#B2CD9C',
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginVertical: 12,
    },

    toggleButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

});