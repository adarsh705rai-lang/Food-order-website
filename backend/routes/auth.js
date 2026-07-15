const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../users.json");

// -----------------------------
// SIGN UP
// -----------------------------
router.post("/signup", (req, res) => {
           console.log(req.body);
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
        return res.status(400).json({
            message: "Please fill all fields."
        });
    }
  
    const users = JSON.parse(fs.readFileSync(filePath));

    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(400).json({
            message: "Email already registered."
        });
    }

    users.push({
        fullName,
        email,
        phone,
        password
    });

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    console.log("Data saved:",users);

    res.json({
        message: "Registration Successful!"
    });

});

// -----------------------------
// LOGIN
// -----------------------------
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const users = JSON.parse(fs.readFileSync(filePath));

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid Email or Password."
        });
    }

    res.json({
        message: "Login Successful!",
        user: {
            fullName: user.fullName,
            email: user.email
        }
    });

});

module.exports = router;