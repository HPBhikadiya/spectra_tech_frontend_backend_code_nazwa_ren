import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigationBar from './navigationbar';

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

function TermsAndConditionsCus() {
  const classes = useStyles();

  return (
    <>
      <NavigationBar />
      <Container className={classes.root} maxWidth="md">
        <Typography variant="h4" className={classes.title}>
          Terms and Conditions for Customers - Spectra
        </Typography>

        <Box className={classes.section}>
          <Typography variant="h6">1. Account Registration:</Typography>
          <Typography variant="body1">
            <ul>
              <li>You must create an account to access certain features of Spectra. You agree to provide accurate, current, and complete information during the registration process and to update this information as necessary to keep it accurate, current, and complete.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials and for any activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</li>
              <li>Spectra discounts are reserved for people of ages 35 and under (inclusive). Restaurants may ask you for age verification and refuse service if you are older.</li>
            </ul>
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">2. Use of Services:</Typography>
          <Typography variant="body1">
            <ul>
              <li>You may use Spectra&apos;s platform and services solely for your personal, non-commercial use and in compliance with these Terms and all applicable laws and regulations.</li>
              <li>You agree not to engage in any activity that could interfere with or disrupt the operation of Spectra&apos;s platform or services, including but not limited to hacking, phishing, or transmitting malware.</li>
            </ul>
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">3. Ordering and Discounts:</Typography>
          <Typography variant="body1">
            <ul>
              <li>Spectra connects you with restaurants and service providers offering discounts on their products or services. We make reasonable efforts to ensure the accuracy and availability of discounts but do not guarantee their availability or accuracy.</li>
              <li>By placing an order through Spectra, you agree to abide by the terms and conditions of the respective restaurants and service providers, including their refund and cancellation policies.</li>
            </ul>
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">4. Payment:</Typography>
          <Typography variant="body1">
            <ul>
              <li>You agree to pay all fees and charges associated with your orders, including any applicable taxes and delivery fees. Payment must be made through the payment methods accepted by Spectra.</li>
              <li>Spectra may store your payment information for future orders, subject to our Privacy Notice.</li>
            </ul>
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">5. Intellectual Property:</Typography>
          <Typography variant="body1">
            <ul>
              <li>All content and materials available on Spectra&apos;s platform, including but not limited to text, graphics, logos, and images, are the property of Spectra or its licensors and are protected by copyright, trademark, and other intellectual property laws.</li>
              <li>You may not reproduce, distribute, modify, or create derivative works of any content or materials from Spectra&apos;s platform without our prior written consent.</li>
            </ul>
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">6. Termination:</Typography>
          <Typography variant="body1">
            <p>Spectra reserves the right to suspend or terminate your access to our platform and services at any time and for any reason, without notice or liability.</p>
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">7. Disclaimer of Warranties:</Typography>
          <Typography variant="body1">
            <p>Spectra&apos;s platform and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of any kind, either express or implied. Spectra disclaims all warranties, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">8. Limitation of Liability:</Typography>
          <Typography variant="body1">
            <p>To the fullest extent permitted by law, Spectra shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our platform or services, even if Spectra has been advised of the possibility of such damages.</p>
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">9. Governing Law and Dispute Resolution:</Typography>
          <Typography variant="body1">
            <p>These Terms and any disputes arising out of or relating to them shall be governed by the laws of [Jurisdiction], without regard to its conflict of laws principles. Any disputes shall be resolved exclusively through arbitration in accordance with the rules of the [Arbitration Association].</p>
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">10. Promotional Codes</Typography>
          <Typography variant="body1">
            <p>Spectra may, in its sole discretion, create promotional codes that may be redeemed for Account credit, or other features or benefits related to a Third Party Provider’s services, subject to any additional terms that Spectra establishes on a per promotional code basis. You agree that Promo Codes: (i) must be used for the intended audience and purpose, and in a lawful manner; (ii) may not be duplicated, sold or transferred in any manner, or made available to the general public (whether posted to a public form or otherwise), unless expressly permitted by Spectra; (iii) may, as permitted by law, be disabled by Spectra at any time without liability to Spectra; (iv) may only be used pursuant to the specific terms that Spectra establishes for such Promo Code; (v) are not valid for cash; and (vi) may expire prior to your use. Spectra reserves the right to withhold or deduct credits or other features or benefits obtained through the use of Promo Codes by you
            or any other user in the event that Spectra reasonably determines or believes that the use or redemption of the Promo Code was in error, fraudulent, illegal, or in violation of the applicable Promo Code terms or these Terms.</p>
          </Typography>
          </Box>
          <Box className={classes.section}>
      <Typography variant="h6">11. Refund Policy:</Typography>
      <Typography variant="body1">
        <ul>
          <li>Refunds and Cancellations: Refunds may be available for orders that meet the criteria specified by the respective restaurants or service providers. Each vendor may have its own refund and cancellation policy, which you agree to abide by when placing an order through Spectra.</li>
          <li>If you purchase items or items and delivery services from a Third Party Provider, you may cancel your order at any time up until the Third Party Provider has begun preparing your items. Once the preparation has begun, you will no longer be able to cancel your order without incurring a charge, which will be no more than the full price for your ordered items and services.</li>
          <li>Refund Requests: If you believe you are entitled to a refund, you must contact Spectra&apos;s customer support provide relevant details, such as your order number and the reason for the refund request. Spectra will review your request and facilitate the refund process in accordance with Spectra’s and the vendor&apos;s policies.</li>
          <li>Non-Refundable Items: Certain products or services may be non-refundable, as indicated by the vendor. Spectra is not responsible for refunding purchases that are explicitly marked as non-refundable by the vendor.</li>
          <li>Payment Disputes: If you encounter any discrepancies or unauthorized charges on your payment card related to orders placed through Spectra, please contact us immediately for assistance. We will work with you to resolve the issue and facilitate any necessary refunds in accordance with our policies and applicable laws.</li>
        </ul>
      </Typography>
    </Box>

    <Box className={classes.section}>
      <Typography variant="h6">12. Changes to Terms:</Typography>
      <Typography variant="body1">
        <p>Spectra reserves the right to update or modify these Terms at any time without prior notice. Your continued use of our platform and services after any such changes constitutes your acceptance of the revised Terms.</p>
      </Typography>
    </Box>

    <Box className={classes.section}>
      <Typography variant="h6">13. Contact Us:</Typography>
      <Typography variant="body1">
        <p>If you have any questions, concerns, or requests regarding these Terms and Conditions, please contact us at [contact@email.com].</p>
      </Typography>
    </Box>
  </Container>
</>
);
}

export default TermsAndConditionsCus;