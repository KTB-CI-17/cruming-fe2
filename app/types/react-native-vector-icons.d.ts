declare module '@expo/vector-icons' {
    interface IconProps {
        name: string;
        size?: number;
        color?: string;
        style?: any;
    }

    export class MaterialCommunityIcons extends React.Component<IconProps> {}
    export class MaterialIcons extends React.Component<IconProps> {}
    export class Ionicons extends React.Component<IconProps> {}
    // 필요한 다른 아이콘 세트들도 추가할 수 있습니다
}