import { Product } from "@/types/types";
import { Card, Skeleton, Typography, styled } from "@mui/material";
import { useState } from "react";

export const ProductComponent: React.FC<Product> = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const {id, title, description, image, price, rating} = props

    const size = imageLoaded ? 120 : 0
    return (
        <CardLayout>
            <img src={image} alt={title} width={size} height={size} loading='lazy' onLoad={() => setImageLoaded(true)}/>
            {!imageLoaded && <Skeleton variant='rounded' width={120} height={120}/>}
            <Typography variant='body2' fontWeight={'bold'}>{title}</Typography>
            <Typography variant='caption'>{`$ ${price.toLocaleString()}`}</Typography>
        </CardLayout>
    )
}

export const ProductSkeletonComponent: React.FC = () => {
    return (
        <CardLayout>
            <Skeleton variant='rounded' width={120} height={120} />
            <Skeleton variant='text' height={20} width={120}/>
            <Skeleton variant='text' height={20} width={120}/>
            <Skeleton variant='text' height={20} width={40}/>
        </CardLayout>
    )
}
const CardLayout = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: 160,
    height: 300,
    margin: 4,
})