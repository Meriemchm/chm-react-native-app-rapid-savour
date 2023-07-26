import { create } from "twrnc";

// create the customized version...
const Tw = create(require(`./tailwind.config.js`));
// <- your path may differ

// ... and then this becomes the main function your app uses
export default Tw;
