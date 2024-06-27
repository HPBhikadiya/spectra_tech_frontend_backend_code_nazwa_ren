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

move to next step => preparing, done

the text looks long but its just the explication

for the database i have mongodb

\*================================ REQ 2 =============================

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

\*================================ REQ 3 =============================

The minimum order before taxes and tips is $10. We should be able to change that number if we need on the admin page
after cancellation redirect to orders page.
Customer cancel will charge to customer => notified you will be charge for stripe fee

\*================================ REQ 4 =============================

Here are the next things we need. Let me know if you can do this and how much time it will take.

1. When restaurant signs up, there is a commission option. They should only have a discount option. Commission is decided by Spectra, not by the restaurant. Spectra decides the commission for each restaurant through the Admin page.
2. On restaurant sign up, when they choose notificationmode, it should say “Choose how you would like to receive orders. Don’t worry if you miss them, customers will always show up in person to remind you otherwise! ”
3. Next to the choose file on restaurant registration page, explain “Upload your menu for us to set up your restaurant. You’ll be able to add/remove items after.”
4. After signing up, they should be logged in automatically. No need to return to login page and type everything again.
5. Forgot password button and password reset page after clicking it. They should type email, after which a password reset email will be sent to their email account. Write the following on the forgot password page: “Enter your email to have a password reset link sent to you.” Make sure that the email will only be sent if they type an email of an actual account. The email they receive should say:

Hello!

You requested a password reset from us. Please use the link below to set up a new password!

www.reset.com

6. Open and close time should be moved to the next page (after registration page, before setting up stripe page), where merchants can choose the hours the store is open for each day.
   They will be able to drag to select the hours the store is open, between 0:00 and 24:00. They can also drag to select multiple time slots (eg from 7:00 to 10:00, then from 14:00 to 18:00). Keep it compact so that the page is not too long.

At the top of the page (above the days and times table), there will be 2 options: Dine-in and Takeout. They will be able to select the available hours for both. the instructions will be “Please drag to select the time slots you wish to provide discounts for Dine-in and Takeout respectively.”
Once weekly schedule is selected, store should be able to select closed dates (for holidays or any other reasons). This page will be a new tab in their restaurant page, where they can pull up a calendar and click or drag to select days where the restaurant is closed, without affecting their weekly availability schedules.
When a restaurant is only available for take-out or dine-in, customers will see when browsing for stores that a restaurant is only available for Dine-in or Takeout (eg. “Take-out only”)
When restaurants are not available, their picture on the customer’s page will be filtered and it will move to the bottom of the list. On the filtered image, it will also show the next time the restaurant opens (eg. if it opens later today, it will say “Available at 18:00”) if it opens on a future date, it will say “Available July 18th at 19:00”

7. If restaurant does not upload a photo for menu item, it will just show a generic photo. Size of picture should not be stretched.
8. New orders should be at the top of the page for both customers and restaurants. (currently at the bottom)
9. Login should work when letters are capitalized for both merchants and customers.
10. When ordering food, each item selected should show a total number (1,2,3,4, etc.) on the cart at the top right.
11. Customers should be able to add multiple items from menu instead of only being able to do so after opening the cart.
