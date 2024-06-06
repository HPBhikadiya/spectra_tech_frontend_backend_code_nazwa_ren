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

function PrivacyNotice() {
  const classes = useStyles();

  return (
    <>
      <NavigationBar />
      <Container className={classes.root} maxWidth="md">
        <Typography variant="h4" className={classes.title}>
          Spectra Privacy Notice
        </Typography>

        <Box className={classes.section}>
          <Typography variant="h6">1. Information We Collect:</Typography>
          <Typography variant="body1">
            &bull; Personal Information: When you sign up for an account with
            Spectra, we may collect personal information such as your name,
            email address, phone number, and payment details.
            <br />
            &bull; Order Information: We collect information about your orders,
            including the products or services you purchase, transaction
            details, and delivery information.
            <br />
            &bull; Usage Information: We gather data about how you interact with
            our platform, such as your browsing activity, search queries, and
            preferences.
            <br />
            &bull; Device Information: We may collect information about the
            device you use to access our platform, including your IP address,
            device type, and browser information.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">2. How We Use Your Information:</Typography>
          <Typography variant="body1">
            &bull; To Provide Services: We use your personal information to
            create and manage your account, process your orders, and provide
            customer support.
            <br />
            &bull; To Improve Our Services: We analyze usage data to understand
            how our platform is used and to enhance user experience, including
            the effectiveness of our discounts and promotions.
            <br />
            &bull; To Communicate with You: We may send you important updates,
            notifications, and promotional offers via email, SMS, or other
            communication channels.
            <br />
            &bull; For Marketing Purposes: With your consent, we may use your
            information to send you marketing communications about
            Spectra&apos;s products, services, and partner offers.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">
            3. How We Share Your Information:
          </Typography>
          <Typography variant="body1">
            &bull; With Restaurants and Service Providers: We may share your
            order information with the restaurants and service providers you
            interact with through our platform to facilitate your orders and
            provide discounts.
            <br />
            &bull; With Third-Party Service Providers: We may engage third-party
            service providers to assist us in providing and improving our
            services, and we may share your information with them as necessary.
            <br />
            &bull; For Legal Purposes: We may disclose your information to
            comply with legal obligations, enforce our policies, or protect the
            rights, property, or safety of Spectra, our users, or others.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">4. Data Security:</Typography>
          <Typography variant="body1">
            We take the security of your personal information seriously and
            employ industry-standard security measures to protect it from
            unauthorized access, disclosure, alteration, or destruction.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">5. Your Choices and Rights:</Typography>
          <Typography variant="body1">
            &bull; Access and Correction: You may access and update your
            personal information through your account settings.
            <br />
            &bull; Marketing Preferences: You can choose whether to receive
            marketing communications from us and can opt out at any time by
            updating your preferences in your account settings or by contacting
            us.
            <br />
            &bull; Data Subject Rights: Depending on your location, you may have
            certain rights regarding your personal data, such as the right to
            access, rectify, or delete your information.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">
            6. Updates to this Privacy Notice:
          </Typography>
          <Typography variant="body1">
            We may update this Privacy Notice from time to time to reflect
            changes in our practices or applicable laws. We will notify you of
            any material changes by posting the updated Privacy Notice on our
            website or through other communication channels.
          </Typography>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h6">7. Contact Us:</Typography>
          <Typography variant="body1">
            If you have any questions, concerns, or requests regarding this
            Privacy Notice or our data practices, please contact us at
            [contact@email.com].
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default PrivacyNotice;
