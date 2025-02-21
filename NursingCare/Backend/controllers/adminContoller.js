const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file; // Image uploaded by multer

        // Log input data
        console.log("Request Body:", { name, email, password, speciality, degree, experience, about, fees, address });
        console.log("Uploaded File:", imageFile);

        // Check if an image was uploaded
        if (!imageFile) {
            return res.status(400).json({ error: "Image upload failed. No file received." });
        }

        // Save doctor to the database (optional)
        // Example: Assuming you have a Doctor model
        // const newDoctor = new Doctor({ name, email, speciality, degree, experience, about, fees, address, image: imageFile.path });
        // await newDoctor.save();

        return res.status(201).json({
            message: "Doctor added successfully",
            data: {
                name,
                email,
                image: `/uploads/${imageFile.filename}` // Use correct image path
            }
        });

    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export { addDoctor };
