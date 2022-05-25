import { registerContentType } from "h5p-utils";
import { H5PWrapper } from "./h5p/H5PWrapper";
import "./index.scss";

registerContentType("Bildetema", H5PWrapper);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
