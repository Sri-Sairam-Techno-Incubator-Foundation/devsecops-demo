const express = require("express");
const { doubleCsrf } = require("csrf-csrf");

const app = express();

app.use(express.json());

const {
    doubleCsrfProtection
} = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || "dev-only-secret",
    cookieName: "__Host-csrf",
    cookieOptions: {
        sameSite: "strict",
        secure: false,
        httpOnly: true
    }
});

app.get("/", (req, res) => {
    res.json({
        message: "DevSecOps Demo Application",
        status: "running"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy"
    });
});

app.get("/api/users", (req, res) => {
    res.json([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ]);
});

app.post("/api/users", doubleCsrfProtection, (req, res) => {
    res.json({
        message: "User created"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Demo application running on port ${PORT}`);
});
