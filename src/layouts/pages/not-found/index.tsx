// react-router-dom components
import { Link } from "react-router-dom";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Material Dashboard 2 React Components

// Image
import bgImage from "assets/images/illustrations/missing.svg";

function notFound(): JSX.Element {
  return (
    <IllustrationLayout title="404" description="PAGE NOT FOUND!" illustration={bgImage}>
      <MDBox mt={3} textAlign="center">
        <MDTypography variant="button" color="text">
          <MDTypography
            component={Link}
            to="/analytics/home"
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
          >
            Go back in initial page, is better.
          </MDTypography>
        </MDTypography>
      </MDBox>
    </IllustrationLayout>
  );
}

export default notFound;
