import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "./navigationbar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    boxShadow: "1px 0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "16px",
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(3),
  },
}));

function TermsAndConditionsRes() {
  const classes = useStyles();

  return (
    <>
      <NavigationBar />
      <Container className={classes.root} maxWidth="md">
        <Typography variant="h4" className={classes.title}>
          Spectra Terms and Conditions
        </Typography>

        <Box className={classes.section}>
          <Typography variant="h6">0. Fees</Typography>
          <Typography variant="body1">
            A 10% Fee is charged based on the cost of the item or service before
            discount. The remainder of the discount percentage chosen by the
            Merchant is transferred to Customers.
            <br />
            Eg. A $10 item discounted to Customers for 20% will be listed to
            Customers as $8. Platform fees in this instance would be $1 (10% of
            $10). Merchant receives $7, minus transaction fees, plus applicable
            taxes, plus 100% of tips. Spectra receives $1 (10% of pre-discount
            price).
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">
            1. Agreement to Terms and Conditions
          </Typography>
          <Typography variant="body1">
            <b>1.1. Terms of Use</b>
            <br />
            These terms and conditions govern the use of the Spectra platform
            and any related services provided by Spectra. By accepting an order
            placed through the Spectra Platform and by clicking ‘agree’ to this
            Agreement on a website, the Merchant accepts and agrees to this
            Agreement.
            <br />
            <br />
            Spectra is not a restaurant nor service provider, but a facilitator
            of the ordering process between Merchants (restaurants and service
            providers) and Customers (students and young professionals under the
            age of 30).
            <br />
            Spectra operates an online platform that connects restaurants and
            service providers with Customers for the purchase of food,
            beverages, and services.
            <br />
            Customers can place orders through the Spectra platform, which will
            transmit the orders to the respective Stores for preparation and
            delivery.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>1.2. Authority to Bind Merchant</b>
            <br />
            The individual that accepts and agrees to this Agreement represents
            and warrants that they have the authority and capacity to accept and
            agree to this Agreement on behalf of, and legally bind, the
            Merchant, and its applicable legal entity(ies).
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">2. Merchants</Typography>
          <Typography variant="body1">
            <b>2.1. Registration</b>
            <br />
            To become a Merchant on our platform, you must create an account and
            provide accurate, current, and complete information about your
            restaurant or service establishment as prompted by the registration
            form.
            <br />
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>2.2. Listing Goods and Services</b>
            <br />
            As a Merchant, you may list food and beverage items available for
            purchase through our platform, including accurate descriptions,
            prices, and images.
            <br />
            You represent and warrant that all food and beverage items offered
            through our platform comply with applicable laws and regulations,
            including those relating to food safety and hygiene.
            <br />
            The Merchant must hold and maintain any and all Required Licenses.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>2.3. Orders and Fulfillment</b>
            <br />
            Orders placed by Customers through our platform constitute offers to
            purchase the specified foods, beverages, and services from the
            Merchant’s establishment.
            <br />
            You agree to fulfill orders promptly and to the best of your
            ability, ensuring the quality and accuracy of the items ordered.
            <br />
            You acknowledge that Spectra is not responsible for any delays in
            order fulfillment or for the quality of the items prepared and
            delivered by your establishment.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>2.4. Contact</b>
            <br />
            Merchant gives Spectra permission to contact Merchant by text, dial,
            or email to inform Merchant of orders, changes, payments, and other
            subjects relating to operation.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>2.5. Pricing</b>
            <br />
            The Merchant must ensure that the pre-discount price listed on the
            Spectra Platform matches the item or service prices in-store, and
            will update prices on the Spectra Platform according to changes in
            in-store prices. The Merchant agrees that the Merchant will not make
            an item available at a higher price than the amount the Merchant is
            charging for the same or similar items in-store.
            <br />
            The minimum discount Merchant must offer Customers is 10%.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>2.6. Service Quality</b>
            <br />
            The Merchant must ensure that the quality of goods and services
            provided through the Spectra platform at discounts to Customers
            matches the in-store quality of goods and services sold at full
            (regular) price.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">3. Payments</Typography>
          <Typography variant="body1">
            <b>3.1. Methods</b>
            <br />
            Payments for orders placed through our platform will be processed
            securely using the available payment methods.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>3.2. Fees and Commissions</b>
            <br />
            Spectra will remit payment to you for fulfilled orders, minus any
            applicable fees and commissions as agreed upon between the Merchant
            and Spectra.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>3.3. Taxes</b>
            <br />
            The Merchant is the seller of all goods and services made available
            on the Spectra platform. The Merchant is responsible for determining
            and setting the price for each item and for the collection and
            remittance of all applicable Sales Taxes, where required under
            applicable Laws.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>3.4. Payment Processing</b>
            <br />
            All payments are processed securely through third-party payment
            processors.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">4. Items and Services</Typography>
          <Typography variant="body1">
            <b>4.1.</b>
            <br />
            The Merchant must make items available for purchase through the
            Spectra platform during its normal business hours and ensure the
            menu of available items is accurate.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>4.2. Standards, Quality, and Accuracy</b>
            <br />
            The Merchant must prepare, handle, store, label, and package all
            items in accordance with applicable laws, including without
            limitation Food Safety Standards, Laws related to the items or
            packaging materials used, and Alcohol Safety Standards.
            <br />
            When making items available through the Spectra platform, identify
            items correctly, particularly where the items may be subject to age
            restrictions or identification requirements (e.g., alcohol,
            pharmaceutical items).
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>4.3. Goods and Services Responsibility</b>
            <br />
            The Merchant is responsible for any reimbursement costs related to
            Customer refunds for substandard goods, services, or other related
            issues within the Merchant’s control (e.g., missing or incomplete
            goods, foods not cooked thoroughly, and goods and services not
            prepared and delivered in accordance with the Merchant’s internal
            standards). The Merchant authorizes Spectra to deduct such
            reimbursement costs from the payment Spectra remits to the Merchant.
            The policy for refunds and substandard goods and services is located
            at the end of the Terms and Conditions.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">5. Intellectual Property</Typography>
          <Typography variant="body1">
            The Spectra website and all of its contents, features, and
            functionality are owned by Spectra, its licensors, or other
            providers and are protected by copyright, trademark, and other
            intellectual property laws.
            <br />
            You may not reproduce, distribute, modify, or create derivative
            works of any portion of our website without our prior written
            consent.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">6. Ratings and Customer Feedback</Typography>
          <Typography variant="body1">
            <b>6.1.</b>
            <br />
            After receiving items, a Customer may be prompted to provide
            Customer Feedback. Spectra and its Affiliates reserve the right to
            use, share, and display Customer Feedback on Spectra platforms and
            communications in any manner in connection with the business of
            Spectra without attribution or approval from the Merchant.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>6.2.</b>
            <br />
            Merchant agrees that Spectra is an online service provider and is
            not a publisher of Customer Feedback; nonetheless, Spectra may, but
            will not be obligated to, review or monitor Customer Feedback and
            may, in their sole discretion, remove, edit, or disable Customer
            Feedback or In-App Communications for any reason, including if
            Spectra determines that Customer Feedback violates this Agreement,
            Spectra’s Privacy Notice, or the terms of any other agreement on the
            platform. Spectra does not endorse nor approve any Customer Feedback
            available on the Spectra platform.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">7. Marketing and Promotions</Typography>
          <Typography variant="body1">
            <b>7.1.</b>
            <br />
            Spectra and its Affiliates may showcase the availability of the
            Merchant’s items via the platform through various promotional
            activities such as social media channels, websites, and
            advertisements. All Promotions and Sponsored Listings remain subject
            to any applicable Laws, including marketing and advertising Laws,
            consumer protection Laws, or Laws related to Restricted Items or
            Alcohol Items.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>7.2.</b>
            <br />
            Spectra may, at its sole discretion, provide enhanced promotional
            placement or other visual treatment for a Promotion. To the extent
            that Participants participate in any Promotions, the Merchant will
            ensure such Participants honor the terms of such Promotion. When a
            Promotion is successfully applied to an order, the Merchant
            authorizes Spectra to charge Customers for the post-Promotional
            value of an item.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">8. Indemnities</Typography>
          <Typography variant="body1">
            The Merchant will, at its own expense, indemnify, defend, and hold
            harmless Spectra and their Affiliates from and against all Claims
            brought against Spectra and their Affiliates by a third party
            arising from or in connection with the Merchant’s violation or
            alleged violation of:
            <br />
            - Food Safety Standards or other health and safety Laws;
            <br />
            - Merchant’s misuse of Customer Personal Information;
            <br />
            - Merchant’s failure to comply with age-restricting laws for goods
            and services such as alcohol;
            <br />- Merchant’s violation or alleged violation of its obligations
            with respect to goods and services under this Agreement.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">9. Limitation of Liability</Typography>
          <Typography variant="body1">
            To the fullest extent permitted by applicable law, in no event shall
            Spectra, its affiliates, or their respective officers, directors,
            employees, or agents be liable for any indirect, incidental,
            special, consequential, or punitive damages, including but not
            limited to damages for lost profits, lost revenue, lost data, or
            business interruption, arising out of or in any way related to the
            Merchant’s use of our website or the services provided therein.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">10. Changes to Terms</Typography>
          <Typography variant="body1">
            <b>10.1.</b>
            <br />
            Spectra reserves the right to modify, amend, or update these Terms
            at any time. What constitutes a material change will be determined
            at Spectra’s sole discretion.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>10.2.</b>
            <br />
            If a revision is material, Spectra may notify Merchants with a
            written document executed by both parties, which may include
            electronic signatures.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="body1">
            <b>10.3.</b>
            <br />
            The Merchant is responsible for updating contact information and
            regularly reviewing the Agreement updates and information from
            Spectra. Continued use of the Spectra Platform after any such
            modifications or updates constitutes the Merchant’s consent to such
            changes.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">11. Governing Law</Typography>
          <Typography variant="body1">
            This Agreement is governed by the law of the province of Quebec. The
            parties agree that all disputes outside of the arbitration
            provisions will be heard in provincial or federal courts of Quebec.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">12. Contact Us</Typography>
          <Typography variant="body1">
            If you have any questions about these Terms, please contact us at
            (438) 377-4880.
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default TermsAndConditionsRes;
