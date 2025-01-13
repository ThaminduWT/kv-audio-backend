import Review from "../models/review.js";

export async function addReview(req, res) {
    if (req.user == null) {
        res.status(401).json({ message: "Please login and try again" })
        return;
    }

    const data = req.body;
    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;

    const newReview = new Review(data);

    try {
        await newReview.save();
        res.json({ message: "Review added successfully" })
    } catch (e) {
        res.status(500).json({ message: "Revied added failed" })
    }

}

export async function getReviews(req, res) {

    const user = req.user;

    try {
        if (user == null || user.role != "admin") {
            const result = await Review.find({ isApproved: true });
            res.json(result);
            return;
        }

        if (user.role == "admin") {
            const result = await Review.find();
            res.json(result);
            return;
        }

    } catch (error) {
        res.status(500).json({ error: "Failed to get reviews" })
    }




}

export async function deleteReview(req, res) {
    const email = req.params.email;
    try {


        if (req.user == null) {
            res.status(401).json({ message: "Please login and try again" })
            return;
        }

        if (req.user == "admin") {
            await Review.deleteOne({ email: email });
            res.json({ message: "Review delete successfully" });
            return;

        }

        if (req.user.email == email) {
            await Review.deleteOne({ email: email });
            res.json({ message: "Review delete successfully" });

        } else {
            res.status(403).json({ message: "You are not authorized to perform this action" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete reviews" })
    }


}

export async function approveReview(req, res) {
    const email = req.params.email;

    try {
        if (req.user == null) {
            res.json({ message: "Please login and try again" })
        }

        if (req.user.role == "admin") {


            await Review.updateOne(
                { email: email },
                { isApproved: true })
            res.json({ message: "Review approved successfully" })

        } else {
            res.json({ message: "You are not and admin. only admins can approve the reviews." })
        }

    } catch (error) {
        res.status(500).json({ error: "Failed to approve reviews" })
    }


}