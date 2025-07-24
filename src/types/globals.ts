import { MaterialCommunityIcons } from "@expo/vector-icons";
import type {
    PressableAndroidRippleConfig,
    PressableProps,
    StyleProp,
    ViewStyle,
} from "react-native";

const names = MaterialCommunityIcons.glyphMap;
export type IconNamesType = keyof typeof names;

export interface SelectOptionInterface {
    item: {
        label: string;
        icon?: {
            backgroundColor: string;
            icon: IconNamesType;
            iconColor?: string;
        };
    };
    value: number;
}
export interface SelectedOption {
    selectedIcon: IconNamesType;
    selectedLabel: string;
    selectedValue: number;
}

export interface UserLocationType{
    latitude?:number;
    longitude?:number;
}

export interface ListItemProps extends PressableProps {
    image?: any;
    title: string;
    subTitle?: string;
    style?: StyleProp<ViewStyle>;
    onPress?: (e: any) => void;
    ImageReplaceComponent?: () => React.JSX.Element;
    pressAction?: {
        android_ripple: PressableAndroidRippleConfig;
        highlightColor: string;
    };
}
