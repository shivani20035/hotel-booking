import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async(req,res)=>{
    try{
        //create a svix
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // getting headers
        const headers={
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],

        };

        //Verifying headers
        await whook.verify(JSON.stringify(req.body),headers)

        //getting data from request body
        const {data,type}=req.body
        
        //Switch cases for diffrent event
        switch(type){

            case "user.created":{
                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || "test@email.com",
                    username: (data.first_name || "Test") + " " + (data.last_name || "User"),
                    image: data.image_url || "https://placehold.co/150",
                }
                await User.create(userData);
                break;
            }
            case "user.updated":{
                 const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || "test@email.com",
                    username: (data.first_name || "Test") + " " + (data.last_name || "User"),
                    image: data.image_url || "https://placehold.co/150",
                }
                await User.findByIdAndUpdate(data.id,userData);
                break;
            }
            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                break;
        }
        res.json({success: true,message:"Webhook Recieved"})







    } catch(error){
        console.log(error.message);
        res.json({ success: false,message: error.message})


    }
}


export default clerkWebhooks;