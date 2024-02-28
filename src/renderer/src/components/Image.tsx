import React from 'react';


interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
}

export function getImage(src: string) {
    return new URL(`../assets/Expression/${src}.png`, import.meta.url).href
}

const Image: React.FC<ImageProps> = ({ src, ...rest }) => {
    return <img src={getImage(src)} {...rest} />;
};

export default Image;