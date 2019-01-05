// const stripe = require('stripe')('sk_live_ZJ7T9ooIICoqzBscW0cq20pc');

const stripe = require('stripe')('sk_test_1PxLhQXh3FHIMCcB3oAkIIpT');

// Create a payment from a test card token.
async function createCharge(amount, currency, source, description) {
    const charge = await stripe.charges.create({
        amount: amount,
        currency: currency,
        source: source,
        description: description
    });
    return charge;
}

module.exports = {
    createCharge
};