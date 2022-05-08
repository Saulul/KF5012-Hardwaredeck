// This is your test secret API key.
const stripe = require('stripe')('sk_test_51KwxvYGVoSBOtXM2XmVvIJnpCktSICKIYcdWijKEqLtIalOrFyCszRl2iNPLor2fjrOQmuAyTisoVL1v8s8RJvpO00xKsdBlUc');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1KwyVNGVoSBOtXM2T0zYX0E6',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/?success=true`,
        cancel_url: `http://localhost:3000/?canceled=true`,
    });

    res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));