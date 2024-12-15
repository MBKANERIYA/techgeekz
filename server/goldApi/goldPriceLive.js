let axios = require("axios");
const { productServices } = require("../services");

module.exports.getGoldPrice = async () => {
    try {
        let rate = await axios.get('https://gold.g.apised.com/v1/latest?metals=XAU,XAG,XPT,XPD&base_currency=INR&currencies=EUR,KWD,GBP,USD&weight_unit=gram', {
            headers: { "x-api-key": "sk_2aA5e4764bd698D06b5fDcF02497e4d61110Bf9bCA3bB4D8" }
        });
        let liveGoldRate = rate.data.data.metal_prices.XAU
        console.log(liveGoldRate);
        

        // let goldRate = await axios.get("http://localhost:3001/v1/gold/get")
        // let liveGoldRate = goldRate.data.goldPrice[0]
        // console.log(liveGoldRate);



        let product = await axios.get("http://localhost:3001/v1/product/get");
        let products = product.data.product;
        console.log(products);

        for (let val of products) {
            // console.log(goldRate.data.goldPrice[0].gold_14kt);
            console.log(val.Option2_Value);
            console.log(val.Gold_Price);
            console.log(val.Variant_Grams);

            switch (val.Option2_Value) {
                case "14Kt":
                    val.Gold_Rate = liveGoldRate.price_14k;
                    break;
                case "18Kt":
                    val.Gold_Rate = liveGoldRate.price_18k;
                    break;
                case "22Kt":
                    val.Gold_Rate = liveGoldRate.price_22k;
                    break;
                default:
                    // val.Gold_Rate = 0;
                    break;
            }

            val.Gold_Price = val.Gold_Rate * val.Variant_Grams;
            val.Variant_Price = val.Gold_Price + val.Making_Price + val.Diamond_Price;

            // console.log(val.Gold_Rate, "Gold Rate");
            // console.log(val.Variant_Price, "Variant Price");

            await productServices.updateProduct(val._id, {
                Gold_Rate: val.Gold_Rate,
                Gold_Price: val.Gold_Price,
                Variant_Price: val.Variant_Price
            });
        }

    } catch (err) {
        console.error("Error updating products with gold rates:", err);
    }
};
