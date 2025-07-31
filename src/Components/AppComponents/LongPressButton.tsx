"use client";

import {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    useRef,
    type FC,
} from "react";

interface Props
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    onLongPress: () => void;
    onClick?: () => void;
    delay?: number;
}

const LongPressButton: FC<Props> = ({
    children,
    onLongPress,
    delay = 500,
    onClick,
    ...props
}) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const isLongPress = useRef(false);

    const start = () => {
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            onLongPress();
        }, delay);
    };

    const clear = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const handleMouseUp = () => {
        clear();
        if (!isLongPress.current && onClick) onClick();
    };

    return (
        <button
            onMouseDown={start}
            onTouchStart={start}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            onMouseLeave={clear}
            onTouchCancel={clear}
            {...props}
        >
            {children}
        </button>
    );
};

export default LongPressButton;
