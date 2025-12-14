import { View, Text } from "react-native";

import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';

const NotificationPage = () => (
    <View>
        <NavigationHeader />
        <Text>Notifications</Text>
        <NavigationFooter />
    </View>
)

export default NotificationPage