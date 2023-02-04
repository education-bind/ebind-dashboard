import MDButton from "components/MDButton";
import { Link } from "react-router-dom";

// Declaring props types for DefaultCell
interface Props {
  value: string;
}

function ActionCell({ value }: Props): JSX.Element {
  return (
    <MDButton
      component={Link}
      to={`/sis/schools/school-details?id=${value}`}
      variant="outlined"
      color="secondary"
    >
      View
    </MDButton>
  );
}

export default ActionCell;
