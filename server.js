// This is your test secret API key.
const stripe = require('stripe')('sk_test_51KwxvYGVoSBOtXM2XmVvIJnpCktSICKIYcdWijKEqLtIalOrFyCszRl2iNPLor2fjrOQmuAyTisoVL1v8s8RJvpO00xKsdBlUc');
const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:3000/",
    })
)

const YOUR_DOMAIN = 'http://localhost:4242';

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: (item.price*100).toFixed(0),
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${YOUR_DOMAIN}/order_success`,
            cancel_url: `${YOUR_DOMAIN}/checkout`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.listen(4242, () => console.log('Stripe server running on port 4242'));
