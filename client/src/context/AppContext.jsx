import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();

    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms');

            console.log("Rooms API:", data);

            if (data.success) {
                setRooms(data.rooms);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Rooms Error:", error);
            toast.error(error.message);
        }
    };

    const fetchUser = async () => {
        try {
            const token = await getToken();

            console.log("Token:", token);

            const { data } = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("API Response:", data);

            if (data.success) {

                console.log("Role:", data.role);

                setIsOwner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities || []);

            } else {
                setTimeout(() => {
                    fetchUser();
                }, 5000);
            }

        } catch (error) {
            console.log("Fetch User Error:", error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            console.log("Clerk User:", user);
            fetchUser();
        }
    }, [user]);

    useEffect(() => {
        fetchRooms();
    }, []);

    // DEBUG LOGS
    useEffect(() => {
        console.log("Current User:", user);
        console.log("Current isOwner:", isOwner);
        console.log("Current searchedCities:", searchedCities);
    }, [user, isOwner, searchedCities]);

    const value = {
        currency,
        navigate,
        user,
        getToken,
        isOwner,
        setIsOwner,
        axios,
        showHotelReg,
        setShowHotelReg,
        searchedCities,
        setSearchedCities,
        rooms,
        setRooms
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);