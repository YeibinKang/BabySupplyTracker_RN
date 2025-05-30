// Jest setup file
import 'react-native-gesture-handler/jestSetup';

// Mock react-native modules
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => { };
    return Reanimated;
});

// Mock expo modules if needed
jest.mock('expo-constants', () => ({
    default: {
        expoConfig: {
            name: 'BabySupplyTracker',
        },
    },
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');