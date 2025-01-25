"use client"

import { Price, ProductWithPrices } from "@/types";
import Modal from "./Modal";
import Button from "./Button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { getStripe } from "@/libs/stripeClient";
import { postData } from "@/libs/helpers";
import useSubscribeModal from "@/hooks/useSubscribeModal";


interface SubscribeModalProps {
    products:ProductWithPrices[];
}

const formatPrice = (price:Price) => {
    const priceString = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:price.currency,
        minimumFractionDigits:0
    }).format((price?.unit_amount || 0 )/100);
    return priceString;
}
const SubscribeModal:React.FC<SubscribeModalProps> = ({
    products
}) => {

    const subscribeModal = useSubscribeModal();
    const {user,isLoading,subscription} = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();

    const onChange = (open:boolean) => {
        if(!open){
            subscribeModal.onClose();
        }
    }

    const handleCheckout = async (price:Price) => {
     setPriceIdLoading(price.id);

     if(!user){
        setPriceIdLoading(undefined);
        return toast.error("You need to be logged in to subscribe");
     }

     if(subscription){
        setPriceIdLoading(undefined);
        return toast.error("You are already subscribed");
     }

     try{
        const {sessionId} = await postData({
            url : '/api/create-checkout-session',
            data : {price}
        });
        const stripe = await getStripe();
        stripe?.redirectToCheckout({sessionId});
     } catch(error){
        toast.error((error as Error)?.message);
     } finally{
        setPriceIdLoading(undefined);
     }
    }

    let content = (
        <div className="text-center">
          No products found
        </div>
    )

    if(products.length){
        content = (
           <div>
            {products.map((product)=>{
             if(!product.prices?.length){
                return (
                    <div key={product.id} >
                        No Prices Available
                    </div>
                )
             }
             return product.prices.map((price)=>(
                <Button 
                key={price.id}
                onClick={()=> handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
                className="mb-4"
                >
                    {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                </Button>
             ))
            })}

           </div>
        )
    }

    if(subscription){
        content = (
            <div className="text-center">
                You are already subscribed
            </div>
        )
    }
    return ( 
        <Modal
        title="Subscribe to Premium"
        description="Get access to all the songs"
        isOpen={subscribeModal.isOpen}
        onChange={onChange}
        >
            {content}
        </Modal>
     );
}
 
export default SubscribeModal;