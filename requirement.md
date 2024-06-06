we want to change a little bit the payment we already have stripe

so here's the payment explained

f a pizza at a restaurant costs 20$, they will list the price for the same amount for their menu on the Spectra Platform. If they choose to offer 20% discount, Then on the top left corner of their restaurant box (on the restaurants page where Customers can browse restaurants), it will show 20% off.

If Customers clicks on the restaurant profile, each menu item will be shown with 2 prices: The original one crossed out, and the new discounted price. For the 20$ Pizza, it will show $~20.00 $16.00.

Taxes will be combined QST and GST rate, which is 14.975%.

After taxes, order will cost 16 \* 1.14975 = $18.40 (rounded to the neared cent).

If customer chooses to tip 15%, total cost will be
18.40 \* 1.15 = $21.16.

Total amount charged to Customer = $21.16.

Spectra takes a % commission from the original price of the item on the menu. This % will be chosen by Spectra on its own dashboard of restaurants.

If Spectra takes 10% commission, then for the 20$ pizza, it receives $2.00.

Restaurant will receive the remainder, so $21.16 - $2.00 = $19.16

this is an explination for the process of the payment

also we want to add gmail option there

When Merchants sign up, they must select method for receiving orders (by text, email, or both).

When customer orders, their order will have an orde $, followed by taxes calculated on the order $, followed by Order Total $ (including taxes). They will then choose Dine-in or Take-out. They should then be able to choose a tip for the restaurant. Tip options will be: 15%, 18%, 20%, or “Custom”, where they can type the % tip or $Dollar amount. Under the options write “100% of tips will go to the Restaurant”

Taxes are based on where Merchant is located. For now we’re only in Quebec (so QST+GST). Taxes will be calculated cost of order only. Tips will be a percentage calculated on the sum of order+taxes.

After tipping, Customer is notified that:

[[[[[[ “Your order has been sent to the merchant for preparation. Please confirm your order upon arrival.

The merchant has the right to request ID for age verification. If you are above 36 years of age and do not meet our financial assistance criteria, the merchant may cancel your order.” ]]]]]]

Merchant will then be notified through their selected method of the order made.

For each order, Merchant has 2 options: “Cancel” or “Fulfilled”

Merchants have option to cancel order and state reason for cancellation.
Fulfilled means the service has been fully completed.

Once order is Fulfilled, Customers can “Rate Restaurant” on their orders page. Each Merchant should have a rating out of 5 stars and number of ratings (312) next to it.

the text looks long but its just the explication

for the database i have mongodb
