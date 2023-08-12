import jwt from "jsonwebtoken"


export const verifyUser = (req, res, next) => {

    const accessToken = req.cookies.access_token;

    if (!accessToken) {
        return res.status(401).send("Verification Failed");
    }

    jwt.verify(accessToken, process.env.JWT_KEY, (error, user) => {
        if (error) {
            return res.status(403).send("Invalid User Token!")
        }
        req.user = user;
        next();

    })


}