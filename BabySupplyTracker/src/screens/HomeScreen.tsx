

import { Card, Text } from 'react-native-paper';

export default function HomeScreen() {


    return (

        //card - hello + name
        <Card>
            <Card.Title title="Good morning, User!" titleVariant='headlineLarge' />
            <Card.Content>
                <Text variant="titleLarge">List of items</Text>
                <Text variant="bodyMedium">This app helps you keep track of your baby&apos;s supplies.</Text>
            </Card.Content>
        </Card>



        // card - show out of stock items
        // card - show items that are almost expired items
    );
}