// import { useRoute } from '~/components'

import styles from "./styles.module.css";

/**
 * <Layout.FixedMain> is a container component that has the fixed position and
 * width same as the middle column, used by <BottomBar>, <NavBar> and <Toast>.
 *
 */
const FixedMain: React.FC = ({ children }) => {
  return (
    <div className={`fixed-main ${styles.fixedMain}`}>
      <div className="l-container full">
        <div className="l-row">
          <div className={`l-col-three-mid  ${styles.content}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FixedMain;
