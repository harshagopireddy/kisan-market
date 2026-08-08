import { useNavigate } from "react-router-dom";

function NavigationButtons() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px"
      }}
    >

      <button
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      <button
        onClick={() => window.location.reload()}
      >
        🔄 Refresh
      </button>

    </div>

  );

}

export default NavigationButtons;