import bcrypt from 'bcrypt';

// Sample password
const plainPassword = 'S=Siddhu@9';

// Hash the password
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        // Simulate password comparison
        await comparePassword(password, hashedPassword);
    } catch (error) {
        console.error("Error hashing password:", error);
    }
};

// Compare the password
const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        if (isMatch) {
            console.log("✅ Password matched successfully!");
        } else {
            console.log("❌ Password comparison failed!");
        }
    } catch (error) {
        console.error("Error comparing passwords:", error);
    }
};

// Run the code
hashPassword(plainPassword);
