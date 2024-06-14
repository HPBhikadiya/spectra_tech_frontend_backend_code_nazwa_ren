we want to change a little bit the payment we already have stripe ✅

so here's the payment explained ✅

f a pizza at a restaurant costs 20$, they will list the price for the same amount for their menu on the Spectra Platform. If they choose to offer 20% discount, Then on the top left corner of their restaurant box (on the restaurants page where Customers can browse restaurants), it will show 20% off. ✅

If Customers clicks on the restaurant profile, each menu item will be shown with 2 prices: The original one crossed out, and the new discounted price. For the 20$ Pizza, it will show $~20.00 $16.00. ✅

Taxes will be combined QST and GST rate, which is 14.975%.✅

After taxes, order will cost 16 \* 1.14975 = $18.40 (rounded to the neared cent). ✅

If customer chooses to tip 15%, total cost will be
18.40 \* 1.15 = $21.16. ✅

Total amount charged to Customer = $21.16. ✅

Spectra takes a % commission from the original price of the item on the menu. This % will be chosen by Spectra on its own dashboard of restaurants.

If Spectra takes 10% commission, then for the 20$ pizza, it receives $2.00.

Restaurant will receive the remainder, so $21.16 - $2.00 = $19.16

this is an explination for the process of the payment ✅

also we want to add gmail option there ✅

When Merchants sign up, they must select method for receiving orders (by text, email, or both). ✅ ( DISCUSS: Twilio or...)

When customer orders, their order will have an orde $, followed by taxes calculated on the order $, followed by Order Total $ (including taxes). 👉 They will then choose Dine-in or Take-out. 👈 They should then be able to choose a tip for the restaurant. Tip options will be: 15%, 18%, 20%, or “Custom”, where they can type the % tip or $Dollar amount. Under the options write “100% of tips will go to the Restaurant” ✅

Taxes are based on where Merchant is located. For now we’re only in Quebec (so QST+GST). Taxes will be calculated cost of order only. Tips will be a percentage calculated on the sum of order+taxes. ✅

After tipping, Customer is notified that: ✅

[[[[[[ “Your order has been sent to the merchant for preparation. Please confirm your order upon arrival.

The merchant has the right to request ID for age verification. If you are above 36 years of age and do not meet our financial assistance criteria, the merchant may cancel your order.” ]]]]]] ✅

👉 Merchant will then be notified through their selected method of the order made. 👈

✅ For each order, Merchant has 2 options: “Cancel” or “Fulfilled” ✅

Merchants have option to cancel order and state reason for cancellation. ✅
Fulfilled means the service has been fully completed. ✅

Once order is Fulfilled, Customers can “Rate Restaurant” on their orders page. Each Merchant should have a rating out of 5 stars and number of ratings (312) next to it. ✅

👉 Forgot password. 👈
✅ Remove delivery address✅
✅ Starts instead of faces, make is smaller✅

the text looks long but its just the explication

for the database i have mongodb

\*================================

After tipping, Customer is notified that:

[[[[[[ “Your order has been sent to the merchant for preparation. Please confirm your order upon arrival.

The merchant has the right to request ID for age verification. If you are above 35 years of age and do not meet our financial assistance criteria, the merchant may cancel your order.” ]]]]]]

Merchant will then be notified through their selected method of the order made.

For each order, Merchant has 2 options: “Cancel” or “Fulfilled”

Merchants have option to cancel order and state reason for cancellation.
Fulfilled means the service has been fully completed.

Once order is Fulfilled, Customers can “Rate Restaurant” on their orders page. Each Merchant should have a rating out of 5 stars and number of ratings (312) next to it.

Calculation of orders, commissions, taxes:

If the menu item price originally is $20, and the restaurant selects 10% discount,
cost = price _ (1 - discount%)
eg. if a pizza originally costs $20 and the restaurant selects 10% discount on our platform.
cost = 20 _ (1 - 0.1) = $18

Price customer pays = cost _ (1 + %taxes) _ (1 + %tips)
eg. if a pizza costs 18$ after discount, Taxes in quebec are 14.975%, and customer tips 15%, then
price customer pays = 18 _ (1 + 0.14975) _ (1 + 0.15) = $23.80 rounded to the neared cent.

Our platform (Spectra) will always take commission from the cost before taxes and tips
commission = (commission% _ cost)
using the same pizza example, if we take 10% commission,
commission = (0.1 _ 18) = $1.8

The restaurant gets the remainder, so
restaurant receives = pricecustomerpays - commission
in the example, restaurant receives = 23.80 - 1.8 = $22.00

Commission that goes to Spectra will be called “service fee”

Restaurants should get a full breakdown of each order as follows (using the same pizza example):
Subtotal: $18
Taxes: $2.7
Tips: $2.7
Service fee: -$1.80
Stripe fee: $-1.00
Total: $21.00

customers, upon checkout, should also get a total, and below it we show “You save X dollars on this order”
Subtotal: $18
Taxes: $2.7
Tips: $2.7
Total: $23.8
You save $2.64 dollars on this order.
Where X is calculated as:
discount% _ price _ (1 + taxes%) _ (1 + tips%)
X = 0.1 _ 20 _ (1 + 0.14975) _ (1 + 0.15) = $2.64

Lastly, students should have a total savings number on the top right of their order page at all times, showing the total $ amount they have saved.

For cancel put a reason why cancel ( restaurant, user)

refund policy

