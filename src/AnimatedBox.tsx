import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Box } from '@mui/material';

interface AnimatedBoxProps {
    children: React.ReactNode;
    animateDirection: string;
    height?: string;
    width?: string;
    border?: number;
    flexGrow?: number;
    display?: string;
    flexWrap?: string;
    flexBasis?: string | { [key: string]: string };
    justifyContent?: string;
    alignItems?: string;
    flexDirection?: string;
    position?: string;
    zIndex?: number;
    mb?: number;
    backgroundColor?: string;
    borderRadius?: number;
    duration: number;
    fontsize?: number;
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({ children, animateDirection, height, width, border, flexGrow, display, flexWrap, flexBasis, justifyContent, alignItems, flexDirection, position, zIndex, mb, backgroundColor, borderRadius, duration, fontsize }) => {
    const ref = useRef(null);
    const isInViewport = useInView(ref);
    const mainControls = useAnimation();
    const [initialHidden, setInitialHidden] = useState<string>('hiddenYU');

    useEffect(() => {
        let variant;
        switch (animateDirection) {
            case 'xLeft':
                variant = isInViewport ? 'visibleXL' : 'hiddenXL';
                setInitialHidden('hiddenXL')
                break;
            case 'xRight':
                variant = isInViewport ? 'visibleXR' : 'hiddenXR';
                setInitialHidden('hiddenXR')

                break;
            case 'yDown':
                variant = isInViewport ? 'visibleYD' : 'hiddenYD';
                setInitialHidden('hiddenYD')

                break;
            case 'yUp':
                variant = isInViewport ? 'visibleYU' : 'hiddenYU';
                setInitialHidden('hiddenYU')

                break;
            default:
                variant = 'hidden';
                setInitialHidden('hiddenYU')

                break;
        }
        mainControls.start(variant);

    }, [isInViewport]);



    return (
        <Box
            height={height}
            width={width}
            component={motion.div}
            ref={ref}
            sx={{ border: border, borderRadius: borderRadius, flexWrap: flexWrap === 'wrap' ? 'wrap' : 'nowrap', backgroundColor: backgroundColor, '& *': { fontSize: fontsize } }}
            flexBasis={flexBasis}
            flexGrow={flexGrow}
            flexDirection={flexDirection === 'column' ? 'column' : 'row'}
            display={display}
            justifyContent={justifyContent}
            alignItems={alignItems}
            position={position === 'absolute' ? 'absolute' : 'relative'}
            zIndex={zIndex}
            variants={{
                hiddenYU: { opacity: 0, y: 100 },
                visibleYU: { opacity: 1, y: 0 },
                hiddenYD: { opacity: 0, y: -100 },
                visibleYD: { opacity: 1, y: 0 },
                hiddenXL: { opacity: 0, x: 100 },
                visibleXL: { opacity: 1, x: 0 },
                hiddenXR: { opacity: 0, x: -100 },
                visibleXR: { opacity: 1, x: 0 },
            }}
            initial={initialHidden}
            animate={mainControls}
            transition={{ duration: duration }}
            mb={mb}
        >
            {children}
        </Box>
    );
};


export default AnimatedBox;
