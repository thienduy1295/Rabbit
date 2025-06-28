import { ClipLoader } from "react-spinners";

export default function Loader({ size = 60, color = "#16a34a" }) {
  return (
    <div
      style={{
        minHeight: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <ClipLoader size={size} color={color} />
    </div>
  );
}
