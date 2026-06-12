import User from "../models/User.js";

// GET /api/user
export const getUserData = async (req, res) => {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({ success: true, role, recentSearchedCities })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// POST /api/user/store-recent-search
export const storeREcentSearchedCities = async (req, res) => { // ✅ res parameter add kiya
    try {
        const { recentSearchedCity } = req.body; // ✅ singular city, array nahi
        const user = req.user; // ✅ await hata diya

        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCity) // ✅ variable name fix
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity) // ✅ variable name fix
        }
        await user.save();
        res.json({ success: true, message: "City added" })
    } catch (error) {
        res.json({ success: false, message: error.message }) // ✅ error.message
    }
}