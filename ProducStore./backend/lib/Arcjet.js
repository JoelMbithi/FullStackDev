import arcjet,{ tokenBucket, shield, detectBot} from "@arcjet/node";
import "dotenv/config.js"

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristic:["ip.src"],
    rules: [
        shield({node:"LIVE"}),
        detectBot({node:"LIVE", 
            allow:"CATEGORY:SEARCH_ENGINES"
        }),
        //rate limiting 
       tokenBucket({
        node: "LIVE",
        refillRate:5,
        interval: 10,
        capacity: 10
       }) 
    ]
})